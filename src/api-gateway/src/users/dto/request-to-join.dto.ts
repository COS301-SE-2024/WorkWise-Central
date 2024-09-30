import { Types } from 'mongoose';
import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserJoinRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  companyId: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  roleId?: Types.ObjectId; //Should I rather put roleName?🤔
}

export class UserInviteRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  emailToInvite: string;

  @IsOptional()
  @IsMongoId()
  roleId?: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  superiorId?: Types.ObjectId;
}

export class CancelRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  companyId: Types.ObjectId;
}

export class CancelInviteDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  companyId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  inviteId: Types.ObjectId;
}

export class RejectInviteDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  inviteId: Types.ObjectId;
}
