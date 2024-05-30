import {
  ConflictException,
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
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user')
    public readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if ((await this.usernameExists(createUserDto.displayName)) == false) {
      throw new ConflictException(
        'Username already exists, please use another one',
      );
    }
    if ((await this.emailExists(createUserDto.displayName)) == false) {
      throw new ConflictException(
        'Email already in use, please use another one',
      );
    }
    createUserDto.created_at = new Date();
    createUserDto.user_UUID = uuidv4();

    const newUser = new this.userModel(createUserDto);
    const result = await newUser.save();
    return new createUserResponseDto(
      `${result.name} ${result.surname}'s account has been created`,
    );
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
            { displayName: identifier },
            { deleted_at: { $exists: false } },
          ],
        })
        .lean();

    return result == null;
  }

  async emailExists(identifier: string): Promise<boolean> {
    const result: FlattenMaps<User> & { _id: Types.ObjectId } =
      await this.userModel
        .findOne({
          $and: [{ email: identifier }, { deleted_at: { $exists: false } }],
        })
        .lean();

    return result == null;
  }

  async findUser(
    identifier: string,
  ): Promise<FlattenMaps<User> & { _id: Types.ObjectId }> {
    const result: FlattenMaps<User> & { _id: Types.ObjectId } =
      await this.userModel
        .findOne({
          $and: [
            {
              $or: [
                { user_UUID: identifier },
                { email: identifier },
                { displayName: identifier },
              ],
            },
            { deleted_at: { $exists: false } },
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
    updateUserDto.updated_at = new Date();
    //console.log(updateUserDto);
    const result: FlattenMaps<User> & { _id: Types.ObjectId } =
      await this.userModel
        .findOneAndUpdate(
          { $and: [{ user_UUID: id }, { deleted_at: { $exists: false } }] },
          { $set: { ...updateUserDto } },
        )
        .lean();
    if (result == null) {
      throw new NotFoundException('failed to update user');
    }
    return result;
  }

  async softDelete(id: string): Promise<boolean> {
    const result: Document<unknown, NonNullable<unknown>, User> &
      User & { _id: Types.ObjectId } = await this.userModel.findOneAndUpdate(
      { $and: [{ user_UUID: id }, { deleted_at: { $exists: false } }] },
      { $set: { deleted_at: new Date() } },
    );

    if (result == null) {
      throw new InternalServerErrorException('Internal server Error');
    }
    return true;
  }
}
