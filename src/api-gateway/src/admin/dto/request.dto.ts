import { Types } from 'mongoose';

export class UserApiJoinRequestDto {
  companyId: Types.ObjectId;
  companyName?: string;
  userToJoin: Types.ObjectId;
  createdAt: Date = new Date();
}

export class AllJoinRequestsDto {
  constructor(data: UserApiJoinRequestDto) {
    this.data = data;
  }

  data: UserApiJoinRequestDto;
}
