import { Types } from 'mongoose';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserJoinRequestDto {
  /*  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  requestingUserId: Types.ObjectId;*/

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  companyId: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  roleId?: Types.ObjectId; //Should I rather put roleName?🤔

  @IsOptional()
  @IsString()
  roleName?: string = 'Worker';

  @IsOptional()
  @IsString()
  companyName?: string;
}

export class UserInviteRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  emailToInvite: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  roleId: Types.ObjectId;
}

export class CancelRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  companyId: Types.ObjectId;
}
