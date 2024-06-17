import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateUserDto, createUserResponseDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Document, FlattenMaps, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { EmployeeService } from '../employee/employee.service';
import { UserConfirmation } from './entities/user-confirmation.entity';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { EmailService } from '../email/email.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
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
    await this.createUserConfirmation(newUserObj);

    const jwt: { access_token: string; id: Types.ObjectId } =
      await this.authService.signIn(
        result.systemDetails.username,
        result.systemDetails.password,
      );
    return new createUserResponseDto(jwt);
  }

  async createUserConfirmation(newUser: User) {
    const userConfirmation: UserConfirmation = {
      name: newUser.personalInfo.firstName,
      surname: newUser.personalInfo.surname,
      email: newUser.personalInfo.contactInfo.email,
      key: randomStringGenerator(),
    };
    const result = await this.userConfirmationModel.create(userConfirmation);
    console.log(result);
    await this.emailService.sendUserConfirmation(userConfirmation);
  }

  async verifyUser(email: string) {
    const result = await this.userModel.findOneAndUpdate(
      {
        'personalInfo.contactInfo.email': email,
      },
      { $set: { isValidated: true } },
      { new: true },
    );
    console.log(result);
    return true;
  }

  async findAllUsers() {
    try {
      return this.userModel.find().exec();
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Users could not be retrieved');
    }
  }

  async usernameExists(identifier: string): Promise<boolean> {
    const result: FlattenMaps<User> & { _id: Types.ObjectId } =
      await this.userModel
        .findOne({
          $and: [
            { 'systemDetails.username': identifier },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();

    console.log('usernameExists -> ', result);
    return result != null;
  }

  async userIdExists(id: string | Types.ObjectId): Promise<boolean> {
    const result: FlattenMaps<User> & { _id: Types.ObjectId } =
      await this.userModel
        .findOne({
          $and: [
            { _id: id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();

    console.log('userIdExists -> ', result);
    return result == null;
  }

  async findUserById(
    identifier: string | Types.ObjectId,
  ): Promise<FlattenMaps<User> & { _id: Types.ObjectId }> {
    const result: FlattenMaps<User> & { _id: Types.ObjectId } =
      await this.userModel
        .findOne({
          $and: [
            { _id: identifier },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();

    if (result == null) {
      throw new NotFoundException(
        'Error: User not found, please verify your username and password',
      );
    }

    return result;
  }

  async findUserByUsername(
    identifier: string,
  ): Promise<FlattenMaps<User> & { _id: Types.ObjectId }> {
    const result: FlattenMaps<User> & { _id: Types.ObjectId } =
      await this.userModel
        .findOne({
          $and: [
            { 'systemDetails.username': identifier },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();

    if (result == null) {
      throw new NotFoundException(
        'Error: User not found, please verify your username and password',
      );
    }

    return result;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<FlattenMaps<User> & { _id: Types.ObjectId }> {
    /*    updateUserDto.updatedAt = new Date();
    console.log('updateUserDto');
    console.log(updateUserDto);*/

    const previousObject: FlattenMaps<User> & { _id: Types.ObjectId } =
      await this.userModel
        .findOneAndUpdate(
          {
            $and: [
              { _id: id },
              {
                $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
              },
            ],
          },
          { $set: { ...updateUserDto }, updatedAt: new Date() },
        )
        .lean();
    if (previousObject == null) {
      throw new NotFoundException('failed to update user');
    }
    return previousObject;
  }

  async softDelete(id: string): Promise<boolean> {
    const result: Document<unknown, NonNullable<unknown>, User> &
      User & { _id: Types.ObjectId } = await this.userModel.findOneAndUpdate(
      {
        $and: [
          {
            $or: [{ _id: id }, { 'systemDetails.username': id }],
          },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      },
      { $set: { deletedAt: new Date() } },
    );
    if (result == null) {
      throw new InternalServerErrorException('Internal server Error');
    }

    const deleteRelatedEmployees = await this.employeeService.remove(result.id);
    console.log(deleteRelatedEmployees);
    return true;
  }
}
