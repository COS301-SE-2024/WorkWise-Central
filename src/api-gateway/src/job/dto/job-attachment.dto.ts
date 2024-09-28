import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class AddAttachmentDto {
  constructor(employeeId: Types.ObjectId, jobId: Types.ObjectId) {
    this.employeeId = employeeId;
    this.jobId = jobId;
  }
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;
}
export class UpdateAttachmentDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  attachments: string[];
}
//TODO: Add removeAttachmentDto at some point
