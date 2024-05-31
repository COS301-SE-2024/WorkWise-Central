import { Types } from 'mongoose';

export class AddUserToCompanyDto {
  adminUsername: Types.ObjectId;
  currentCompany: Types.ObjectId;
  newEmployeeUsername: string;
}
