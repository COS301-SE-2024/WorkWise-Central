import { IsDateString, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
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
  @IsDateString()
  fromDate: Date;

  @IsOptional()
  @IsDateString()
  toDate?: Date;
}

export class GetCurrentTimeTrackersDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;
}

export class GetCompletedTimeTrackersDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;
}
