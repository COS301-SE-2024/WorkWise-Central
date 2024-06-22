import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, createUserResponseDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FlattenMaps, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { EmployeeService } from '../employee/employee.service';
import { UserConfirmation } from './entities/user-confirmation.entity';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { EmailService } from '../email/email.service';
import { UsersRepository } from './users.repository';
import { ValidationResult } from '../auth/entities/validationResult.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly userRepository: UsersRepository,
    @InjectModel(UserConfirmation.name)
    private readonly userConfirmationModel: Model<UserConfirmation>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
    private emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.usernameExists(createUserDto.username)) {
      throw new ConflictException(
        'Username already exists, please use another one',
      );
    }

    const newUserObj = new User(createUserDto);
    const newUser = new this.userModel(newUserObj);
    const result = await newUser.save();
    await this.createUserConfirmation(newUserObj); //sends email

    const jwt: { access_token: string; id: Types.ObjectId } =
      await this.authService.signIn(
        result.systemDetails.username,
        createUserDto.password,
      );
    return new createUserResponseDto(jwt);
  }

  async createUserConfirmation(newUser: User) {
    console.log('createUserConfirmation', newUser);
    const userConfirmation: UserConfirmation = {
      name: newUser.personalInfo.firstName,
      surname: newUser.personalInfo.surname,
      email: newUser.personalInfo.contactInfo.email,
      key: randomStringGenerator(),
    };
    await this.userConfirmationModel.create(userConfirmation);
    //console.log(result);
    await this.emailService.sendUserConfirmation(userConfirmation);
  }

  async verifyUser(email: string) {
    return this.userRepository.verifyUser(email);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async usernameExists(identifier: string): Promise<boolean> {
    return this.userRepository.exists(identifier);
  }

  async userIdExists(id: string | Types.ObjectId): Promise<boolean> {
    return this.userRepository.userIdExists(id);
  }

  async getUserById(identifier: string | Types.ObjectId): Promise<User> {
    const result: User = await this.userRepository.findById(identifier);

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
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<FlattenMaps<User> & { _id: Types.ObjectId }> {
    const inputValidated = await this.userIsValid(updateUserDto);
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

  async userIsValid(user: User | UpdateUserDto): Promise<ValidationResult> {
    if (user.employeeIds) {
      for (const employee of user.employeeIds) {
        const exists = await this.employeeService.employeeExists(employee);
        if (!exists)
          return new ValidationResult(
            false,
            `Invalid Employee ID: ${employee}`,
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
}
