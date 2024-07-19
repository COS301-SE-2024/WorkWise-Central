import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserJoinRequest } from './entities/request-to-join.entity';
import { Model, Types } from 'mongoose';
import { isNotDeleted } from '../shared/soft-delete';

@Injectable()
export class AdminRepository {
  constructor(
    //More repositories will be added
    @InjectModel(UserJoinRequest.name)
    private readonly userJoinRequestModel: Model<UserJoinRequest>,
  ) {}

  async save(userJoinRequest: UserJoinRequest) {
    const createdRequest = new this.userJoinRequestModel(userJoinRequest);
    const result = await createdRequest.save();
    console.log('Save new Request:', result);
    return result;
  }

  async cancelRequest(userId: Types.ObjectId, companyId: Types.ObjectId) {
    const result = await this.userJoinRequestModel.deleteOne({
      $and: [{ userToJoin: userId }, { companyId: companyId }, isNotDeleted],
    });
    console.log(result);
    return result;
  }

  async findOneRequest(id: Types.ObjectId) {
    console.log('findOneJoinRequest');
    const result = await this.userJoinRequestModel
      .findOne({
        $and: [{ _id: id }, { isNotDeleted }],
      })
      .lean();
    console.log(result);
    return result;
  }

  async findAllRequests() {
    console.log('FindAll');
    const result = await this.userJoinRequestModel
      .findOne({
        isNotDeleted,
      })
      .lean();
    console.log(result);
    return result;
  }

  async findAllRequestsFromUser(userId: Types.ObjectId) {
    console.log('findAllRequestsFromUser');
    const result = await this.userJoinRequestModel
      .findOne({
        $and: [{ userToJoin: userId }, { isNotDeleted }],
      })
      .lean();
    console.log(result);
    return result;
  }

  async findAllRequestsForCompany(companyId: Types.ObjectId) {
    console.log('findAllRequestsForCompany');
    const result = await this.userJoinRequestModel
      .findOne({
        $and: [{ companyId: companyId }, { isNotDeleted }],
      })
      .lean();
    console.log(result);
    return result;
  }
}
