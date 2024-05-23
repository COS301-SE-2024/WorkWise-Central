import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
      @InjectModel('User')
      private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.created_at = Date.now();
    const newUser = new this.userModel(createUserDto);
    const result = await newUser.save();
    console.log(result);
    return `${result.name} ${result.surname}'s account has been created`;
  }

  async findAllUsers() {
    const result = await this.userModel.find();
    console.log(result);
    return result;
  }

  async findUser(id: number) {
    let result;
    try {
      result = await this.userModel.find({ user_UUID : id });
      return result;
    } catch (error) {
      throw new NotFoundException("Error: User not found");
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) { //TODO: Test
    let result;
    try {
      result = await this.userModel.findOneAndUpdate(
          {$and:
                [{user_UUID: id }]},
          {$set:{updateUserDto, update_at: Date.now()}}
      );

      if (result == null) {
        throw new Error();
      }
      return result;
    } catch (error) {
      //console.log(error);
      let response = "Error: User not found";
      throw new NotFoundException(response);
    }
    //return `This action should update a #${id} user`;
  }

  async softDelete(id: number) {
    let result;
    try {
      result = await this.userModel.findOneAndUpdate(
          {user_UUID: id}
          ,
          {$set:
                {deleted_at: Date.now()}
          });

      if (result == null) {
        throw new Error();
      }
      return result;
    } catch (error) {
      //console.log(error);
      let response = "Error: User not found";
      throw new NotFoundException(response);
    }
    return `This action removes a #${id} user`;
  }
}
