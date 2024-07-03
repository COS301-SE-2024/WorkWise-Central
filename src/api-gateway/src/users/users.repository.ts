import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';
import {
  User,
  /*  userEmployeeFields,
  userJoinedCompaniesField,*/
} from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async save(newUserObj: User) {
    const newUser = new this.userModel(newUserObj);
    const result = await newUser.save();
    console.log('Save new user:', result);
    return result;
  }

  async findAll(): Promise<(FlattenMaps<User> & { _id: Types.ObjectId })[]> {
    const result = await this.userModel
      .find()
      /*      .populate(userEmployeeFields)
      .populate(userJoinedCompaniesField)*/
      .lean()
      .exec();
    console.log(`Retrieving All users` /*, result*/);
    return result;
  }

  async exists(identifier: string): Promise<boolean> {
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
    console.log(`exists: ${result}`);
    return result != null;
  }

  async verifyUser(email: string) {
    const result = await this.userModel.findOneAndUpdate(
      {
        'personalInfo.contactInfo.email': email,
      },
      { $set: { isValidated: true } },
      { new: true },
    );
    console.log(`verified user with email: ${email}`);
    console.log(result);
    return true;
  }

  async userIdExists(userId: string | Types.ObjectId): Promise<boolean> {
    const result: FlattenMaps<User> & { _id: Types.ObjectId } =
      await this.userModel
        .findOne({
          $and: [
            { id: userId },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();
    //console.log('userIdExists -> ', result);
    return result == null;
  }

  async findById(id: string | Types.ObjectId) {
    return this.userModel
      .findOne({
        $and: [
          { _id: id },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
  }

  async findByUsername(username: string) {
    return this.userModel
      .findOne({
        $and: [
          { 'systemDetails.username': username },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean()
      .exec();
  }

  async update(id: Types.ObjectId, updateUserDto: UpdateUserDto) {
    return this.userModel
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
        { new: true },
      )
      .lean();
  }

  async delete(id: string | Types.ObjectId) {
    return this.userModel.findOneAndUpdate(
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
  }
}
