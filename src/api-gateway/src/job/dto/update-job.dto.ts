import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AssignedEmployees, ClientFeedback, Details, RecordedDetails, Comment, Task } from './create-job.dto';
import { IsArray, IsHexColor, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { AddHashtag } from '../../utils/Custom Transformers/add-hashtag.transformer';
import { UpdatePriorityTagDto, UpdateTagDto } from './edit-tag.dto';

class UpdateAssignedEmployees extends PartialType(AssignedEmployees) {}
class UpdateDetails extends PartialType(Details) {}
class UpdateRecordedDetails extends PartialType(RecordedDetails) {}
class UpdateClientFeedback extends PartialType(ClientFeedback) {}
class UpdateTask extends PartialType(Task) {}
class UpdateComment extends PartialType(Comment) {}
// Status is in a separate schema
export class UpdateJobDto {
  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  clientId?: Types.ObjectId;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateAssignedEmployees)
  @IsOptional()
  assignedEmployees?: UpdateAssignedEmployees;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  status?: Types.ObjectId;

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
  priorityTag?: Types.ObjectId;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];

  @ApiProperty()
  @IsOptional()
  coverImage?: string;
}

export class AddCommentDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  newComment: string;
}

export class AddTaskDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  jobId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  title: string;
}

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

export class RemoveTaskDto {
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

export class UpdateTaskDto {
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
  @IsString()
  title: string;
}

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  statusId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  @IsHexColor()
  @AddHashtag()
  colour: string;
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

export class UpdateStatus {
  constructor(updateStatusDto: UpdateStatusDto) {
    this.status = updateStatusDto.status;
    this.colour = updateStatusDto.colour;
  }

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  @IsHexColor()
  @AddHashtag()
  colour: string;
}

export class UpdateTag {
  constructor(u: UpdateTagDto) {
    if (u.label) {
      this.label = u.label;
    }
    if (u.colour) {
      this.colour = u.colour;
    }
  }

  label?: string;
  colour?: string;
}

export class UpdatePriorityTag {
  constructor(u: UpdatePriorityTagDto) {
    if (u.label) {
      this.label = u.label;
    }
    if (u.colour) {
      this.colour = u.colour;
    }
    if (u.priorityLevel) {
      this.priorityLevel = u.priorityLevel;
    }
  }

  label?: string;
  colour?: string;
  priorityLevel?: number;
}

export class UpdateDtoResponse {
  success: boolean;
  message?: string;
  constructor(success: boolean, message?: string) {
    this.success = success;
    if (message) this.message = message;
  }
}
