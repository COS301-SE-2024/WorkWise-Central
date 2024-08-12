import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class AcceptRequestDto {
  @IsNotEmpty()
  @IsMongoId()
  companyId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  userToJoinId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  superiorId: Types.ObjectId;

  @IsOptional()
  @IsMongoId({ each: true })
  subordinates?: Types.ObjectId[] = [];

  @IsNotEmpty()
  @IsBoolean()
  accept: boolean;

  @IsOptional()
  @IsMongoId()
  assignedRoleId?: Types.ObjectId;
}

export class AcceptInviteDto {
  @IsOptional()
  @IsMongoId()
  userId?: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  inviteId: Types.ObjectId;
}
