import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';
import { Address, JoinedCompany, Profile, User } from './entities/user.entity';
import { JoinUserDto, UpdateUserDto } from './dto/update-user.dto';
import { currentDate } from '../utils/Utils';
import { isNotDeleted } from '../shared/soft-delete';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async save(newUserObj: User) {
    const newUser = new this.userModel(newUserObj);
    const salt = await bcrypt.genSalt(10);
    newUser.systemDetails.password = await bcrypt.hash(newUser.systemDetails.password, salt);
    const result = await newUser.save();
    console.log('Save new user:', result);
    return result;
  }

  async findAll(fieldsToPopulate?: string[]): Promise<(FlattenMaps<User> & { _id: Types.ObjectId })[]> {
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

  async findAllInCompany(companyId: Types.ObjectId): Promise<(FlattenMaps<User> & { _id: Types.ObjectId })[]> {
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
    const result: FlattenMaps<User> & { _id: Types.ObjectId } = await this.userModel
      .findOne({
        $and: [
          { _id: userId },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
    //console.log('userIdExists -> ', result);
    return result !== null;
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

  async findByEmail(email: string) {
    return this.userModel
      .findOne({
        $and: [{ 'personalInfo.contactInfo.email': email }, isNotDeleted],
      })
      .lean();
  }

  async update(id: Types.ObjectId, updateUserDto: UpdateUserDto) {
    const user = await this.userModel
      .findOne({
        $and: [{ _id: id }, isNotDeleted],
      })
      .exec();
    if (updateUserDto.profile) {
      user.profile = { ...user.profile, ...updateUserDto.profile };
    }
    if (updateUserDto.personalInfo) {
      const updatedAddress: Address = { ...user.personalInfo.address, ...updateUserDto.personalInfo.address };
      const updatedContactInfo = { ...user.personalInfo.contactInfo, ...updateUserDto.personalInfo.contactInfo };
      user.personalInfo = { ...user.personalInfo, ...updateUserDto.personalInfo };
      user.personalInfo.address = updatedAddress;
      user.personalInfo.contactInfo = updatedContactInfo;
    }
    if (updateUserDto.skills) {
      user.skills = updateUserDto.skills;
    }
    if (updateUserDto.currentEmployee) {
      user.currentEmployee = updateUserDto.currentEmployee;
    }
    if (updateUserDto.systemDetails) {
      user.systemDetails = { ...user.systemDetails, ...updateUserDto.systemDetails };
    }
    user.updatedAt = currentDate();

    return (await user.save()).toObject();
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
        { $set: { profile: profile }, updatedAt: currentDate() },
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
        { $set: { ...joinUserDto }, updatedAt: currentDate() },
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
          updatedAt: currentDate(),
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
          updatedAt: currentDate(),
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
      { $set: { deletedAt: currentDate() } },
    );
  }

  async updateJoinedCompanyName(companyId: Types.ObjectId, newCompanyName: string) {
    return this.userModel
      .updateMany(
        {
          $and: [
            { 'joinedCompanies.companyId': companyId },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        },
        {
          $set: { 'joinedCompanies.$.companyName': newCompanyName },
          updatedAt: currentDate(),
        },
        { new: true },
      )
      .lean();
  }

  async userIsInCompanyWithEmail(companyId: Types.ObjectId, email: string) {
    const regex = `${email}`;

    const user = await this.userModel
      .findOne({
        $and: [{ 'systemDetails.email': { $regex: regex, $options: 'i' } }, isNotDeleted],
      })
      .lean();
    console.log(user);

    if (!user) return false;

    for (const joinedCompany of user.joinedCompanies) {
      if (joinedCompany.companyId.toString() === companyId.toString()) {
        return true;
      }
    }

    return false;
  }

  async updatePassword(userId: Types.ObjectId, newPassword: string) {
    const user = await this.userModel.findOne({ $and: [{ _id: userId }, isNotDeleted] }).exec();
    const salt = await bcrypt.genSalt(10);
    user.systemDetails.password = await bcrypt.hash(newPassword, salt);
    user.markModified('systemDetails');
    await user.save();
  }
}
