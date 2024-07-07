import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class AddUserToCompanyDto {
  //TODO: Add roleId to this Dto later
  @IsNotEmpty()
  @IsMongoId()
  adminId: Types.ObjectId; //This must be an employeeId

  @IsNotEmpty()
  @IsMongoId()
  currentCompany: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  newUserUsername: string;
}
