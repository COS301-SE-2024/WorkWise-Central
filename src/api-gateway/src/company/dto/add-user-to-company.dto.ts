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
  superiorId?: Types.ObjectId; //TODO: Add check

  @IsNotEmpty()
  @IsString()
  newUserUsername: string;
}
