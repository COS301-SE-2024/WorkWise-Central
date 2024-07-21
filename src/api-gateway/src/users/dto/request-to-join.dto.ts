import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

export class CancelRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  companyId: Types.ObjectId;
}
