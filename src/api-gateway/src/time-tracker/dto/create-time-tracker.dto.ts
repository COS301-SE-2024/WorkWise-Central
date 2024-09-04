import { IsDate, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTimeTrackerDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;
}

export class StopTimeTrackerDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;
}

export class GeneralTimeTrackerDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;
}

export class GetTimeTrackersDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsDate()
  fromDate: Date;

  @IsOptional()
  @IsDate()
  toDate?: Date;
}

export class GetCurrentTimeTrackersDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;
}
