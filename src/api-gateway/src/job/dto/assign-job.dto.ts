import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class JobAssignDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;
  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;
}

export class JobAssignGroupDto {
  @IsNotEmpty()
  @IsMongoId({ each: true })
  employeeIds: Types.ObjectId[];
  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;
}

export class JobAssignTeamDto {
  @IsNotEmpty()
  @IsMongoId({ each: true })
  teamIds: Types.ObjectId[];
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
