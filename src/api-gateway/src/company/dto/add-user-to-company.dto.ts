import { Types } from 'mongoose';

export class AddUserToCompanyDto {
  adminId: Types.ObjectId;
  currentCompany: Types.ObjectId;
  newEmployeeUsername: string;
}
