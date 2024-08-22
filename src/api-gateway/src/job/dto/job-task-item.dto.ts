import { IsBoolean, IsDateString, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AddTaskItemDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  taskId: Types.ObjectId;
}

export class RemoveTaskItemDto {
  constructor(employeeId: Types.ObjectId, jobId: Types.ObjectId, taskId: Types.ObjectId, itemId: Types.ObjectId) {
    this.employeeId = employeeId;
    this.jobId = jobId;
    this.taskId = taskId;
    this.itemId = itemId;
  }
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  taskId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  itemId: Types.ObjectId;
}

export class UpdateTaskItemDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  taskId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  itemId: Types.ObjectId;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
