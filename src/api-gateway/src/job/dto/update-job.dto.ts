import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  AssignedEmployees,
  ClientFeedback,
  Details,
  RecordedDetails,
  Comment,
  Task,
} from './create-job.dto';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';

class UpdateAssignedEmployees extends PartialType(AssignedEmployees) {}
class UpdateDetails extends PartialType(Details) {}
class UpdateRecordedDetails extends PartialType(RecordedDetails) {}
class UpdateClientFeedback extends PartialType(ClientFeedback) {}
class UpdateTask extends PartialType(Task) {}
class UpdateComment extends PartialType(Comment) {}

export class UpdateJobDto {
  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  clientId?: Types.ObjectId;

  @ApiProperty()
  @IsOptional()
  @IsString()
  clientUsername?: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateAssignedEmployees)
  @IsOptional()
  assignedEmployees?: UpdateAssignedEmployees;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateDetails)
  @IsOptional()
  details?: UpdateDetails;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateRecordedDetails)
  @IsOptional()
  recordedDetails?: UpdateRecordedDetails;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateClientFeedback)
  @IsOptional()
  clientFeedback?: UpdateClientFeedback;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => UpdateTask)
  @IsOptional()
  taskList?: UpdateTask[];

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => UpdateComment)
  @IsOptional()
  comments?: UpdateComment[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  tags?: Types.ObjectId[];

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  priorityTag?: Types.ObjectId[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];
}

export class AddCommentDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Comment)
  comment: Comment;
}

export class RemoveCommentDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  commentId: Types.ObjectId;
}

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  commentId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  comment: string;
}

export class UpdateDtoResponse {
  success: boolean;
  message?: string;
  constructor(success: boolean, message?: string) {
    this.success = success;
    if (message) this.message = message;
  }
}
