import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { JoinUserDto, UpdateUserDto } from './dto/update-user.dto';
import { FlattenMaps, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JoinedCompany, SignInUserDto, User } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { EmployeeService } from '../employee/employee.service';
import { UserConfirmation } from './entities/user-confirmation.entity';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { EmailService } from '../email/email.service';
import { UsersRepository } from './users.repository';
import { ValidationResult } from '../auth/entities/validationResult.entity';
import { isPhoneNumber } from 'class-validator';
import { CompanyService } from '../company/company.service';
import { FileService } from '../file/file.service';
import { JobService } from '../job/job.service';
import { UserResetPasswordDto } from './dto/user-reset-password.dto';
import { UserPasswordReset } from './entities/user-password-reset.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,

    @InjectModel(UserConfirmation.name)
    private readonly userConfirmationModel: Model<UserConfirmation>,

    @InjectModel(UserPasswordReset.name)
    private readonly userPasswordResetModel: Model<UserPasswordReset>,

    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,

    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,

    @Inject(forwardRef(() => CompanyService))
    private companyService: CompanyService,

    private emailService: EmailService,

    @Inject(forwardRef(() => FileService))
    private fileService: FileService,

    @Inject(forwardRef(() => JobService))
    private jobService: JobService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const inputValidated = await this.createUserValid(createUserDto);
    if (!inputValidated.isValid) throw new ConflictException(inputValidated.message);

    //Save files In Bucket, and store URLs (if provided)
    let secureUrl: string = '';
    if (createUserDto.profilePicture) {
      console.log('Uploading image');
      const picture = await this.fileService.uploadBase64Image(createUserDto.profilePicture);
      if (picture.secure_url != null) {
        secureUrl = picture.secure_url;
      } else throw new InternalServerErrorException('file upload failed');
    }
    // Create the user
    const newUserObj = new User(createUserDto);
    if (secureUrl !== '') newUserObj.profile.displayImage = secureUrl;
    const result = await this.userRepository.save(newUserObj);
    await this.createUserConfirmation(newUserObj); //sends email

    const jwt: SignInUserDto = await this.authService.signIn(result.systemDetails.username, createUserDto.password);
    return new CreateUserResponseDto(jwt);
  }

  async createUserConfirmation(newUser: User) {
    console.log('createUserConfirmation', newUser);
    const userConfirmation: UserConfirmation = {
      name: newUser.personalInfo.firstName,
      surname: newUser.personalInfo.surname,
      email: newUser.personalInfo.contactInfo.email,
      key: randomStringGenerator(),
    };
    const confirmation = await this.userConfirmationModel.create(userConfirmation);
    await confirmation.save();
    //console.log(result);
    await this.emailService.sendUserConfirmation(userConfirmation);
  }

  async verifyUser(email: string) {
    return this.userRepository.verifyUser(email);
  }

  async createUserPasswordResetRequest(email: string) {
    const user = await this.getUserByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    const passwordResetRequest: UserPasswordReset = {
      email: email,
      token: randomStringGenerator(),
    };
    const req = await this.userPasswordResetModel.create(passwordResetRequest);
    await req.save();
    await this.emailService.sendResetPasswordRequest(
      {
        userId: user._id,
        emailAddress: email,
        name: user.personalInfo.firstName,
      },
      req.token,
    );
    return true;
  }

  async getAllUsers(): Promise<(FlattenMaps<User> & { _id: Types.ObjectId })[]> {
    return this.userRepository.findAll();
  }

  async getAllUsersDetailed(): Promise<(FlattenMaps<User> & { _id: Types.ObjectId })[]> {
    const populatedFields = ['currentEmployee'];
    return this.userRepository.findAll(populatedFields);
  }

  async getAllUsersInCompany(
    userId: Types.ObjectId,
    companyId: Types.ObjectId,
  ): Promise<(FlattenMaps<User> & { _id: Types.ObjectId })[]> {
    if (!(await this.userIsInCompany(userId, companyId)))
      throw new UnauthorizedException('You must be a member of the company');
    return this.userRepository.findAllInCompany(companyId);
  }

  async getAllUsersInCompanyInternal(
    companyId: Types.ObjectId,
  ): Promise<(FlattenMaps<User> & { _id: Types.ObjectId })[]> {
    return this.userRepository.findAllInCompany(companyId);
  }

  async userWithEmailExistsInCompany(companyId: Types.ObjectId, email: string) {
    return this.userRepository.userIsInCompanyWithEmail(companyId, email);
  }

  async usernameExists(identifier: string): Promise<boolean> {
    return this.userRepository.exists(identifier);
  }

  async emailExists(email: string): Promise<boolean> {
    return this.userRepository.emailExists(email);
  }

  async phoneExists(phoneNumber: string): Promise<boolean> {
    return this.userRepository.phoneNumberExists(phoneNumber);
  }

  isValidPhoneNumber(phoneNum: string) {
    return isPhoneNumber(phoneNum, null);
  }

  async userIdExists(id: Types.ObjectId): Promise<boolean> {
    return this.userRepository.userIdExists(id);
  }

  async getUserById(identifier: Types.ObjectId) {
    return await this.userRepository.findById(identifier);
  }

  async getUserByUsername(identifier: string) {
    return this.userRepository.findByUsername(identifier);
  }

  async getUserByEmail(identifier: string) {
    return this.userRepository.findByEmail(identifier);
  }

  async updateJoinedCompanies(
    //This is a temporary function that is only used within the service
    id: Types.ObjectId,
    joinUserDto: JoinUserDto,
  ): Promise<FlattenMaps<User> & { _id: Types.ObjectId }> {
    const updatedUser = await this.userRepository.updateJoinedCompany(id, joinUserDto);
    if (updatedUser == null) {
      throw new NotFoundException('failed to update user');
    }
    return updatedUser;
  }

  async addJoinedCompany(
    //This is a temporary function that is only used within the service
    userId: Types.ObjectId,
    joinedCompany: JoinedCompany,
  ): Promise<FlattenMaps<User> & { _id: Types.ObjectId }> {
    console.log('Service_AddJoinedCompany', joinedCompany);
    const user = await this.getUserById(userId);
    if (user == null) throw new NotFoundException('User not found');

    const userAlreadyInCompany = user.joinedCompanies.some(
      (company) =>
        company.companyId.toString() === joinedCompany.companyId.toString() ||
        company.employeeId.toString() === joinedCompany.employeeId.toString(),
    );

    if (userAlreadyInCompany) {
      return user;
    }

    const updatedUser = await this.userRepository.addJoinedCompany(userId, joinedCompany);
    if (updatedUser == null) {
      throw new NotFoundException('failed to update user');
    }
    return updatedUser;
  }

  async removeJoinedCompany(
    //This is a temporary function that is only used within the service
    userId: Types.ObjectId,
    companyId: Types.ObjectId,
  ): Promise<FlattenMaps<User> & { _id: Types.ObjectId }> {
    const user = await this.getUserById(userId);
    if (user == null) throw new NotFoundException('User not found');

    const userInCompany = user.joinedCompanies.some((company) => company.companyId.equals(companyId));

    if (!userInCompany) {
      return user; //Return unchanged user
    }

    const updatedUser = await this.userRepository.removeJoinedCompany(userId, companyId);
    if (updatedUser == null) {
      throw new NotFoundException('failed to update user');
    }
    return updatedUser;
  }

  async removeJoinedCompanyWithoutValidation(
    userId: Types.ObjectId,
    companyId: Types.ObjectId,
  ): Promise<FlattenMaps<User> & { _id: Types.ObjectId }> {
    const updatedUser = await this.userRepository.removeJoinedCompany(userId, companyId);
    if (updatedUser == null) {
      throw new NotFoundException('failed to update user');
    }
    return updatedUser;
  }

  async changeCurrentEmployee(userId: Types.ObjectId, companyId: Types.ObjectId) {
    const user = await this.userRepository.findById(userId);
    const joinedCompany = user.joinedCompanies.filter(
      (company) => company.companyId.toString() === companyId.toString(),
    );

    if (joinedCompany.length > 0) {
      const employeeId = joinedCompany[0].employeeId;
      await this.updateUser(userId, { currentEmployee: employeeId });
    } else throw new ConflictException('Invalid Employee');

    return this.companyService.getCompanyById(joinedCompany[0].companyId);
  }

  async updateUser(
    userId: Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ) /*: Promise<FlattenMaps<User> & { _id: Types.ObjectId }> */ {
    const inputValidated = await this.updateUserValid(userId, updateUserDto);
    if (!inputValidated.isValid) {
      throw new NotFoundException(inputValidated.message);
    }

    const updatedUser: FlattenMaps<User> & { _id: Types.ObjectId } = await this.userRepository.update(
      userId,
      updateUserDto,
    );
    if (updatedUser == null) {
      throw new NotFoundException('failed to update user');
    }
    if (updateUserDto.systemDetails || updateUserDto.personalInfo) {
      const updatePromises = updatedUser.joinedCompanies.map((joinedCompany) =>
        this.employeeService.internalUpdate(joinedCompany.employeeId, {
          userInfo: {
            firstName: updatedUser.personalInfo.firstName,
            surname: updatedUser.personalInfo.surname,
            username: updatedUser.systemDetails.username,
            displayName: updatedUser.profile.displayName,
            displayImage: updatedUser.profile.displayImage,
          },
        }),
      );
      await Promise.all(updatePromises);
    }
    return updatedUser;
  }

  /*  async uploadProfilePic(file: Express.Multer.File): Promise<FileResponseDto> {
    //TODO: Add validation
    const uploadApiResponse = await this.fileService.uploadFile(file);
    let newUrl: string;
    if (uploadApiResponse.secure_url) {
      console.log('Upload successful');
      newUrl = uploadApiResponse.secure_url;
      console.log(newUrl);
    } else {
      console.log('Failed to upload image');
      return new FileResponseDto({ url: null });
    }
    return new FileResponseDto({ url: newUrl });
  }*/

  async updateProfilePic(userId: Types.ObjectId, file: Express.Multer.File) {
    //TODO: Add validation
    const uploadApiResponse = await this.fileService.uploadFile(file);
    let newUrl: string;
    if (uploadApiResponse.secure_url) {
      console.log('Upload successful');
      newUrl = uploadApiResponse.secure_url;
      console.log(newUrl);
    } else {
      console.log('Failed to upload image');
      return null;
    }

    const user = await this.getUserById(userId);
    user.profile.displayImage = newUrl;
    const updatedUser = await this.userRepository.updateProfilePicture(userId, user.profile);
    if (updatedUser == null) {
      throw new NotFoundException('failed to update user');
    }
    return updatedUser;
  }

  async softDelete(id: Types.ObjectId): Promise<boolean> {
    const userToDelete = await this.userRepository.findById(id);
    if (!userToDelete) {
      throw new NotFoundException('Error: User not found, please verify your user');
    }
    //Remove All joinedCompanies
    const removalPromises = userToDelete.joinedCompanies.map((joinedCompany) => {
      return Promise.all([
        this.jobService.removeAllReferencesToEmployee(joinedCompany.employeeId),
        this.employeeService.remove(joinedCompany.employeeId),
      ]);
    });

    await Promise.all(removalPromises);

    this.emailService.sendGoodbye({
      name: userToDelete.personalInfo.firstName,
      emailAddress: userToDelete.personalInfo.contactInfo.email,
    });

    const result = await this.userRepository.delete(id);
    if (result == null) {
      throw new InternalServerErrorException('Internal server Error');
    }

    /*    const deleteRelatedEmployees = await this.employeeService.remove(result.id);
    console.log(deleteRelatedEmployees);*/
    //TODO:Relinquish ownership of company to someone else
    return true;
  }

  async updateJoinedCompanyName(companyId: Types.ObjectId, newName: string) {
    await this.userRepository.updateJoinedCompanyName(companyId, newName);
  }

  async createUserValid(createUserDto: CreateUserDto): Promise<ValidationResult> {
    console.log('createValidation', createUserDto);

    const usernameTaken = await this.usernameExists(createUserDto.username);
    if (usernameTaken) return new ValidationResult(false, `Username "${createUserDto.username}" already in use`);

    /*    const phoneNumberTaken = await this.phoneExists(
      createUserDto.contactInfo.phoneNumber,
    );
    if (phoneNumberTaken)
      return new ValidationResult(false, `Phone Number already in use`);*/

    const emailTaken = await this.emailExists(createUserDto.contactInfo.email);
    if (emailTaken) return new ValidationResult(false, `Email already in use`);

    return new ValidationResult(true);
  }

  async userIsInCompany(userId: Types.ObjectId, companyId: Types.ObjectId): Promise<boolean> {
    const user = await this.getUserById(userId);
    const company = await this.companyService.getCompanyById(companyId);

    if (!user) {
      console.log('User is invalid');
      return false;
    }
    if (!company) {
      console.log('Company is invalid');
      return false;
    }

    let userJoinedCompany: JoinedCompany = null;
    for (const joinedCompany of user.joinedCompanies) {
      if (joinedCompany.companyId.toString() === companyId.toString()) {
        userJoinedCompany = joinedCompany;
      }
    }

    return userJoinedCompany != null;
  }

  async updateUserValid(id: Types.ObjectId, user: UpdateUserDto): Promise<ValidationResult> {
    if (!user) {
      return new ValidationResult(false, `user cannot be undefined`);
    }

    if (!(await this.userIdExists(id))) {
      return new ValidationResult(false, `User cannot be found with id ${id}`);
    }

    /*    if (user.joinedCompanies) {
      for (const joinedCompany of user.joinedCompanies) {
        const exists = await this.employeeService.employeeExists(
          joinedCompany.employeeId,
        );
        if (!exists)
          return new ValidationResult(
            false,
            `Invalid Employee ID: ${joinedCompany.employeeId}`,
          );
      }
    }*/

    if (user.currentEmployee) {
      const exists = await this.employeeService.employeeExists(user.currentEmployee);
      if (!exists) return new ValidationResult(false, `Invalid currentEmployee: ${user.currentEmployee}`);
    }

    return new ValidationResult(true);
  }

  async userIsInSameCompanyAsEmployee(userId: Types.ObjectId, employeeId: Types.ObjectId) {
    const user = await this.getUserById(userId);
    console.log(user);
    if (!user) {
      throw new ConflictException('User or Employee is Null');
    }
    for (const joinedCompany of user.joinedCompanies) {
      console.log(joinedCompany);
      if (joinedCompany.employeeId.toString() === employeeId.toString()) return true;
    }

    return false;
  }

  async resetPassword(userId: Types.ObjectId, userResetPasswordDto: UserResetPasswordDto) {
    const user = await this.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    await this.userRepository.updatePassword(userId, userResetPasswordDto.newPassword);
    return true;
  }
}
