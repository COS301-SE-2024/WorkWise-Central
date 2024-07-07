import { Types } from 'mongoose';

export class DeleteEmployeeFromCompanyDto {
  adminId: Types.ObjectId;
  companyId: Types.ObjectId;
  employeeToDeleteId: Types.ObjectId;
}
