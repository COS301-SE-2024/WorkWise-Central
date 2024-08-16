import { Types } from 'mongoose';

export class DeleteCompanyDto {
  employeeId: Types.ObjectId;
  companyId: Types.ObjectId;

  constructor(employeeId: Types.ObjectId, companyId: Types.ObjectId) {
    this.employeeId = employeeId;
    this.companyId = companyId;
  }
}
