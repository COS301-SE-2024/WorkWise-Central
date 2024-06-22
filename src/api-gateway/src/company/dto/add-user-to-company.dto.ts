import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class AddUserToCompanyDto {
  @IsNotEmpty()
  @IsMongoId()
  adminId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  currentCompany: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  newEmployeeUsername?: string;
}
