import { Types } from 'mongoose';

export class CreateEmployeeDto {
  userId: Types.ObjectId;
  companyId: Types.ObjectId;
  role: string;
}
