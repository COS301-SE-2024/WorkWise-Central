import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

export class LeaveCompanyDto {
  @IsNotEmpty()
  @IsMongoId()
  currentEmployee: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  companyToLeaveId: Types.ObjectId;

  @IsOptional()
  @IsString()
  reason?: string;
}
