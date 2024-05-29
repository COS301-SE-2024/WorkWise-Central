import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
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
    createUserDto.created_at = new Date();
    createUserDto.user_UUID = uuidv4();

    const newUser = new this.userModel(createUserDto);
    const result = await newUser.save();
    return `${result.name} ${result.surname}'s account has been created`;
  }

  async findAllUsers() {
    try {
      return this.userModel.find().exec();
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Users could not be retrieved');
    }
  }

  async findUser(
    identifier: string,
  ): Promise<FlattenMaps<User> & { _id: Types.ObjectId }> {
    let result: FlattenMaps<User> & { _id: Types.ObjectId };
    try {
      result = await this.userModel
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

      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('User not found');
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<FlattenMaps<User> & { _id: Types.ObjectId }> {
    let result: FlattenMaps<User> & { _id: Types.ObjectId };
    try {
      updateUserDto.updated_at = new Date();
      console.log(updateUserDto);
      result = await this.userModel
        .findOneAndUpdate(
          { $and: [{ user_UUID: id }, { deleted_at: { $exists: false } }] },
          { $set: { ...updateUserDto } },
        )
        .lean();
      if (result == null) {
        throw new Error('failed to update user');
      }
      return result;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error);
    }
  }

  async softDelete(id: string): Promise<boolean> {
    let result: Document<unknown, NonNullable<unknown>, User> &
      User & { _id: Types.ObjectId };
    try {
      result = await this.userModel.findOneAndUpdate(
        { $and: [{ user_UUID: id }, { deleted_at: { $exists: false } }] },
        { $set: { deleted_at: new Date() } },
      );

      if (result == null) {
        throw new InternalServerErrorException('internal server server');
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
