import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';
import {
  JoinedCompany,
  Profile,
  User,
  /*  userEmployeeFields,
  userJoinedCompaniesField,*/
} from './entities/user.entity';
import { JoinUserDto, UpdateUserDto } from './dto/update-user.dto';

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

  async findAll(
    fieldsToPopulate?: string[],
  ): Promise<(FlattenMaps<User> & { _id: Types.ObjectId })[]> {
    if (fieldsToPopulate) {
      const result = await this.userModel
        .find({ $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }] })
        .populate(fieldsToPopulate)
        .lean()
        .exec();
      console.log(`Retrieving All users` /*, result*/);
      return result;
    }

    const result = await this.userModel
      .find({ $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }] })
      /*      .populate(userEmployeeFields)
      .populate(userJoinedCompaniesField)*/
      .lean()
      .exec();
    console.log(`Retrieving All users` /*, result*/);
    return result;
  }

  async findAllInCompany(
    companyId: Types.ObjectId,
  ): Promise<(FlattenMaps<User> & { _id: Types.ObjectId })[]> {
    const filter = {
      $and: [
        { 'joinedCompanies.companyId': companyId },
        {
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        },
      ],
    };
    const result = await this.userModel.find(filter).lean().exec();
    console.log(`Retrieving All users` /*, result*/);
    return result;
  }

  async exists(identifier: string): Promise<boolean> {
    const result = await this.userModel
      .findOne({
        $and: [
          { 'systemDetails.username': identifier },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
    return result != null;
  }

  async emailExists(email: string): Promise<boolean> {
    const result = await this.userModel
      .findOne({
        $and: [
          { 'personalInfo.contactInfo.email': email },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
    return result != null;
  }

  async phoneNumberExists(phoneNumber: string): Promise<boolean> {
    const result = await this.userModel
      .findOne({
        $and: [
          { 'personalInfo.contactInfo.phoneNumber': phoneNumber },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
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

  async userIdExists(userId: Types.ObjectId): Promise<boolean> {
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

  async findById(id: Types.ObjectId) {
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
      .lean();
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

  async updateProfilePicture(id: Types.ObjectId, profile: Profile) {
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
        { $set: { profile: profile }, updatedAt: new Date() },
        { new: true },
      )
      .lean();
  }

  async updateJoinedCompany(id: Types.ObjectId, joinUserDto: JoinUserDto) {
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
        { $set: { ...joinUserDto }, updatedAt: new Date() },
        { new: true },
      )
      .lean();
  }

  async addJoinedCompany(id: Types.ObjectId, joinedCompany: JoinedCompany) {
    console.log('addJoinedCompany', joinedCompany);
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
        {
          $push: { joinedCompanies: joinedCompany },
          updatedAt: new Date(),
        },
        { new: true },
      )
      .lean();
  }

  async removeJoinedCompany(id: Types.ObjectId, companyId: Types.ObjectId) {
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
        {
          $pull: { joinedCompanies: { companyId: companyId } },
          updatedAt: new Date(),
        },
        { new: true },
      )
      .lean();
  }

  async delete(id: Types.ObjectId) {
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
