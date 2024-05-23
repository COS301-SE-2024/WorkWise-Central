import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.created_at = new Date();
    createUserDto.user_UUID = uuidv4();

    const newUser = new this.userModel(createUserDto);
    const result = await newUser.save();
    return `${result.name} ${result.surname}'s account has been created`;
  }

  async findAllUsers() {
    return this.userModel.find();
  }

  async findUser(id: string) {
    let result;
    try {
      result = await this.userModel.find({
        $and: [{ user_UUID: id }, { deleted_at: { $exists: false } }],
      });
      return result;
    } catch (error) {
      throw new NotFoundException('Error: User not found');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let result;
    try {
      updateUserDto.updated_at = new Date();
      console.log(updateUserDto);
      result = await this.userModel.findOneAndUpdate(
        { $and: [{ user_UUID: id }, { deleted_at: { $exists: false } }] },
        { $set: { ...updateUserDto } },
      );
      if (result == null) {
        throw new Error();
      }
      return result;
    } catch (error) {
      const response = 'Error: User not found';
      throw new NotFoundException(response);
    }
  }

  async softDelete(id: string) {
    let result;
    try {
      result = await this.userModel.findOneAndUpdate(
        { $and: [{ user_UUID: id }, { deleted_at: { $exists: false } }] },
        { $set: { deleted_at: new Date() } },
      );

      if (result == null) {
        throw new Error();
      }
      return result;
    } catch (error) {
      const response = 'Error: User not found';
      throw new NotFoundException(response);
    }
  }
}
