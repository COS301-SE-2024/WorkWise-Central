import { Types } from 'mongoose';
import { UserApiObject } from '../../users/entities/user.entity';
import { RoleApiObject } from '../../role/entity/role.entity';
import { currentDate } from '../../utils/Utils';

export class UserApiJoinRequestDto {
  companyId: Types.ObjectId;
  companyName?: string;
  userToJoin: Types.ObjectId;
  createdAt: Date = currentDate();
}

export class AllJoinRequestsDto {
  constructor(data: UserApiJoinRequestDto) {
    this.data = data;
  }

  data: UserApiJoinRequestDto;
}

export class UserApiDetailedJoinRequestDto {
  companyId: Types.ObjectId;
  companyName?: string;
  roleId: RoleApiObject;
  userToJoin: UserApiObject;
  createdAt: Date = currentDate();
}

export class AllJoinDetailedRequestsDto {
  constructor(data: UserApiDetailedJoinRequestDto) {
    this.data = data;
  }

  data: UserApiDetailedJoinRequestDto;
}
