import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FlattenMaps, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignInUserDto, User } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { EmployeeService } from '../employee/employee.service';
import { UserConfirmation } from './entities/user-confirmation.entity';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { EmailService } from '../email/email.service';
import { UsersRepository } from './users.repository';
import { ValidationResult } from '../auth/entities/validationResult.entity';
import { isPhoneNumber } from 'class-validator';
import { CompanyService } from '../company/company.service';

@Injectable()
export class UsersService {
  constructor(
    /*    @InjectModel(User.name)
    private readonly userModel: Model<User>,*/
    private readonly userRepository: UsersRepository,
    @InjectModel(UserConfirmation.name)
    private readonly userConfirmationModel: Model<UserConfirmation>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
    @Inject(forwardRef(() => CompanyService))
    private companyService: CompanyService,
    private emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const inputValidated = await this.createUserValid(createUserDto);
    if (!inputValidated.isValid) {
      throw new ConflictException(inputValidated.message);
    }

    const newUserObj = new User(createUserDto);
    console.log('newUserobj', newUserObj);
    const result = await this.userRepository.save(newUserObj);
    console.log('result', result);

    await this.createUserConfirmation(newUserObj); //sends email

    const jwt: SignInUserDto = await this.authService.signIn(
      result.systemDetails.username,
      createUserDto.password,
    );
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
    const confirmation =
      await this.userConfirmationModel.create(userConfirmation);
    await confirmation.save();
    //console.log(result);
    await this.emailService.sendUserConfirmation(userConfirmation);
  }

  async verifyUser(email: string) {
    return this.userRepository.verifyUser(email);
  }

  async getAllUsers(): Promise<
    (FlattenMaps<User> & { _id: Types.ObjectId })[]
  > {
    return this.userRepository.findAll();
  }

  async getAllUsersInCompany(
    companyId: Types.ObjectId,
  ): Promise<(FlattenMaps<User> & { _id: Types.ObjectId })[]> {
    return this.userRepository.findAllInCompany(companyId);
  }

  async usernameExists(identifier: string): Promise<boolean> {
    return this.userRepository.exists(identifier);
  }

  isValidPhoneNumber(phoneNum: string) {
    return isPhoneNumber(phoneNum, null);
  }

  async userIdExists(id: string | Types.ObjectId): Promise<boolean> {
    return this.userRepository.userIdExists(id);
  }

  async getUserById(identifier: string | Types.ObjectId) {
    const result = await this.userRepository.findById(identifier);

    if (result == null) {
      throw new NotFoundException(
        'Error: User not found, please verify your username and password',
      );
    }
    return result;
  }

  async getUserByUsername(identifier: string) {
    const result = this.userRepository.findByUsername(identifier);

    if (result == null) {
      throw new NotFoundException(
        'Error: User not found, please verify your username and password',
      );
    }

    return result;
  }

  async updateUser(
    id: Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<FlattenMaps<User> & { _id: Types.ObjectId }> {
    const inputValidated = await this.updateUserValid(id, updateUserDto);
    if (!inputValidated.isValid) {
      throw new NotFoundException(inputValidated.message);
    }

    const updatedUser: FlattenMaps<User> & { _id: Types.ObjectId } =
      await this.userRepository.update(id, updateUserDto);
    if (updatedUser == null) {
      throw new NotFoundException('failed to update user');
    }
    return updatedUser;
  }

  async softDelete(id: string): Promise<boolean> {
    const userToDelete = await this.userRepository.findById(id);
    if (!userToDelete) {
      throw new NotFoundException(
        'Error: User not found, please verify your user',
      );
    }
    const result = await this.userRepository.delete(id);
    if (result == null) {
      throw new InternalServerErrorException('Internal server Error');
    }

    /*    const deleteRelatedEmployees = await this.employeeService.remove(result.id);
    console.log(deleteRelatedEmployees);*/
    //TODO:Relinquish ownership of company to someone else
    return true;
  }

  async createUserValid(
    createUserDto: CreateUserDto,
  ): Promise<ValidationResult> {
    if ((await this.usernameExists(createUserDto.username)) == true) {
      return new ValidationResult(
        false,
        `Username "${createUserDto.username}" already exists, please use another one`,
      );

      /*      throw new ConflictException(
        'Username already exists, please use another one',
      );*/
    }

    return new ValidationResult(true);
  }

  async userIsValid(user: User): Promise<ValidationResult> {
    if (user.joinedCompanies) {
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
    }
    if (user.currentEmployee) {
      const exists = await this.employeeService.employeeExists(
        user.currentEmployee,
      );
      if (!exists)
        return new ValidationResult(
          false,
          `Invalid currentEmployee: ${user.currentEmployee}`,
        );
    }
  }

  async updateUserValid(
    id: Types.ObjectId,
    user: UpdateUserDto,
  ): Promise<ValidationResult> {
    if (!user) {
      return new ValidationResult(false, `user cannot be undefined`);
    }

    if (!(await this.userIdExists(id))) {
      return new ValidationResult(false, `User cannot be found with id ${id}`);
    }

    if (user.joinedCompanies) {
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
    }

    if (user.currentEmployee) {
      const exists = await this.employeeService.employeeExists(
        user.currentEmployee,
      );
      if (!exists)
        return new ValidationResult(
          false,
          `Invalid currentEmployee: ${user.currentEmployee}`,
        );
    }

    return new ValidationResult(true);
  }

  async userIsInSameCompanyAsEmployee(
    userId: Types.ObjectId,
    employeeId: Types.ObjectId,
  ) {
    const user = await this.getUserById(userId);
    const companyWithEmployee =
      await this.companyService.getCompanyWithEmployee(employeeId);

    if (!companyWithEmployee || !user) {
      throw new ConflictException('User or Employee is Null');
    }
    for (const joinedCompany of user.joinedCompanies) {
      if (joinedCompany.companyId.equals(companyWithEmployee._id)) return true;
    }

    return false;
  }
}
