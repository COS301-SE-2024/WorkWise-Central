import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddUserToCompanyDto {
  @IsNotEmpty()
  @IsMongoId()
  adminId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  currentCompany: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  roleId?: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  superiorId?: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  newUserUsername: string;
}

export class AddUserFromInviteDto {
  constructor(
    companyId: Types.ObjectId,
    roleId: Types.ObjectId,
    superiorId: Types.ObjectId,
    newUserId: Types.ObjectId,
  ) {
    this.companyId = companyId;
    this.roleId = roleId;
    this.superiorId = superiorId;
    this.newUserId = newUserId;
  }

  @IsNotEmpty()
  @IsMongoId()
  companyId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  roleId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  superiorId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  newUserId: Types.ObjectId;
}
