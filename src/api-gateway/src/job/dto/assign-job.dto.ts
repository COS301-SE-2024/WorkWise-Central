import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateTaskItemDto {
  //TODO: DO something with this
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

export class TaskAssignDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  employeeToAssignId: Types.ObjectId;

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

export class JobAssignDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  employeeToAssignId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;
}

export class JobAssignGroupDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId({ each: true })
  employeesToAssignIds: Types.ObjectId[];

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;
}

export class JobAssignTeamDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId({ each: true })
  teamId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;
}

export class jobAssignResultDto {
  constructor(data: { passed: number; failed: number }) {
    this.data = data;
  }

  data: {
    passed: number;
    failed: number;
  };
}
