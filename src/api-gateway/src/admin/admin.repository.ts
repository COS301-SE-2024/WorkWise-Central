import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserJoinRequest } from './entities/request-to-join.entity';
import { FlattenMaps, Model, Types } from 'mongoose';
import { InviteToJoin } from './entities/invite-to-join.entity';

@Injectable()
export class AdminRepository {
  constructor(
    //More repositories will be added
    @InjectModel(UserJoinRequest.name)
    private readonly userJoinRequestModel: Model<UserJoinRequest>,

    @InjectModel(InviteToJoin.name)
    private readonly inviteToJoinModel: Model<InviteToJoin>,
  ) {}

  async saveRequest(userJoinRequest: UserJoinRequest) {
    const createdRequest = new this.userJoinRequestModel(userJoinRequest);
    const result = await createdRequest.save();
    console.log('Save new Request:', result);
    return result;
  }

  async acceptRequest(userId: Types.ObjectId, companyId: Types.ObjectId) {
    const result = await this.userJoinRequestModel
      .deleteOne({
        $and: [{ userToJoin: userId }, { companyId: companyId }],
      })
      .exec();
    console.log('Accept', result);
    return result;
  }

  async rejectRequest(userId: Types.ObjectId, companyId: Types.ObjectId) {
    const result = await this.userJoinRequestModel.deleteOne({
      $and: [{ userToJoin: userId }, { companyId: companyId }],
    });
    console.log('Reject', result);
    return result;
  }

  async cancelRequest(userId: Types.ObjectId, companyId: Types.ObjectId) {
    const result = await this.userJoinRequestModel.deleteOne({
      $and: [{ userToJoin: userId }, { companyId: companyId }],
    });
    console.log('cancelRequest', result);
    return result;
  }

  async findAllRequests() {
    console.log('FindAll');
    const result = await this.userJoinRequestModel.find().lean();
    console.log('result', result);
    return result;
  }

  async findRequestsFromUserForCompany(userId: Types.ObjectId, companyId: Types.ObjectId) {
    return this.userJoinRequestModel
      .find({
        $and: [{ userToJoin: userId }, { companyId: companyId }],
      })
      .lean();
  }

  async findAllRequestsFromUser(
    userId: Types.ObjectId,
  ): Promise<(FlattenMaps<UserJoinRequest> & { _id: Types.ObjectId })[]> {
    console.log('findAllRequestsFromUser');
    const result = await this.userJoinRequestModel
      .find({
        $and: [{ userToJoin: userId }],
      })
      .lean();
    console.log(result);
    return result;
  }

  async findAllRequestsForCompany(
    companyId: Types.ObjectId,
  ): Promise<(FlattenMaps<UserJoinRequest> & { _id: Types.ObjectId })[]> {
    console.log('findAllRequestsForCompany');
    const result = await this.userJoinRequestModel
      .find({
        companyId: companyId,
      })
      .lean();
    console.log(result);
    return result;
  }

  async findAllDetailedRequestsForCompany(
    companyId: Types.ObjectId,
  ): Promise<(FlattenMaps<UserJoinRequest> & { _id: Types.ObjectId })[]> {
    console.log('findAllRequestsForCompanyDetailed');
    const result = await this.userJoinRequestModel
      .find({
        companyId: companyId,
      })
      .populate(['userToJoin', 'roleId'])
      .sort({ createdAt: -1 })
      .lean();
    console.log(result);
    return result;
  }

  async saveInvite(inviteToJoin: InviteToJoin) {
    const createdInvite = new this.inviteToJoinModel(inviteToJoin);
    const result = await createdInvite.save();
    console.log('Save new Invite:', result);
    return result;
  }

  async acceptInvite(email: string, companyId: Types.ObjectId) {
    const result = await this.inviteToJoinModel
      .deleteOne({
        $and: [{ emailBeingInvited: email }, { companyId: companyId }],
      })
      .exec();
    console.log('Accept', result);
    return result;
  }

  async rejectInvite(email: string, companyId: Types.ObjectId) {
    const result = await this.inviteToJoinModel.deleteOne({
      $and: [{ emailBeingInvited: email }, { companyId: companyId }],
    });
    console.log('Reject', result);
    return result;
  }

  async cancelInvite(email: string, companyId: Types.ObjectId) {
    const result = await this.inviteToJoinModel
      .deleteOne({
        $and: [{ emailBeingInvited: email }, { companyId: companyId }],
      })
      .exec();
    console.log('cancelRequest', result);
    return result;
  }

  async findAllInvites() {
    console.log('FindAll');
    const result = await this.inviteToJoinModel.find().lean();
    console.log('result', result);
    return result;
  }

  async findInvitesForUser(email: string) {
    return this.inviteToJoinModel
      .find({
        emailBeingInvited: email,
      })
      .lean();
  }

  async findInviteById(inviteId: Types.ObjectId) {
    return this.inviteToJoinModel
      .findOne({
        _id: inviteId,
      })
      .lean()
      .exec();
  }

  async findAllInvitesFromCompany(
    companyId: Types.ObjectId,
  ): Promise<(FlattenMaps<InviteToJoin> & { _id: Types.ObjectId })[]> {
    console.log('findAllInvitesFromCompany');
    const result = await this.inviteToJoinModel.find({ companyId: companyId }).lean();
    console.log(result);
    return result;
  }

  /*  async findAllDetailedRequestsForCompany(
    companyId: Types.ObjectId,
  ): Promise<(FlattenMaps<UserJoinRequest> & { _id: Types.ObjectId })[]> {
    console.log('findAllRequestsForCompanyDetailed');
    const result = await this.userJoinRequestModel
      .find({
        companyId: companyId,
      })
      .populate(['userToJoin', 'roleId'])
      .sort({ createdAt: -1 })
      .lean();
    console.log(result);
    return result;
  }*/
}
