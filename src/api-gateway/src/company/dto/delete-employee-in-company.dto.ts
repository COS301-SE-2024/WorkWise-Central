import { Types } from 'mongoose';

export class DeleteEmployeeFromCompanyDto {
  constructor(adminId: Types.ObjectId, companyId: Types.ObjectId, employeeToDeleteId: Types.ObjectId) {
    this.adminId = adminId;
    this.companyId = companyId;
    this.employeeToDeleteId = employeeToDeleteId;
  }
  adminId: Types.ObjectId;
  companyId: Types.ObjectId;

  employeeToDeleteId: Types.ObjectId;
}
