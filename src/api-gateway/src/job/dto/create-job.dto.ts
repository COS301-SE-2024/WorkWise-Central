import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { currentDate } from '../../utils/Utils';
import { JobApiObject } from './job-responses.dto';

export class Address {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  street?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  province?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  suburb?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  city?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  @MaxLength(20)
  postalCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  complex?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  houseNumber?: string;
}

export class ClientFeedback {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(10)
  jobRating?: number = 10;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(10)
  customerServiceRating?: number = 10;

  @ApiProperty()
  @IsString()
  @IsOptional()
  comments?: string = '';
}

export class Details {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  heading: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string = '';

  @ApiProperty({ type: () => Address })
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startDate?: Date = null;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  endDate?: Date;
}

export class InventoryUsed {
  @ApiProperty()
  @IsNotEmpty()
  inventoryItemId: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  inventoryItemName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantityUsed: number = 0;
}

export class RecordedDetails {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imagesTaken?: string[] = [];

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => InventoryUsed)
  inventoryUsed?: InventoryUsed[] = [];
}

export class AssignedEmployees {
  @ApiProperty()
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  employeeIds?: Types.ObjectId[] = [];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  teamIds?: Types.ObjectId[] = [];
}

export class TaskItem {
  @ApiHideProperty()
  @IsOptional()
  @IsMongoId()
  _id: Types.ObjectId = new Types.ObjectId();

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsArray()
  @IsMongoId({ each: true })
  assignedEmployees?: Types.ObjectId[] = [];

  @ApiProperty()
  @IsOptional()
  @IsDate()
  dueDate?: Date = null;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  done: boolean = false;

  /*  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  status?: Types.ObjectId;*/
}

export class Task {
  @ApiHideProperty()
  @IsOptional()
  @IsMongoId()
  _id: Types.ObjectId = new Types.ObjectId();

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => TaskItem)
  items?: TaskItem[] = [];
}

export class Comment {
  @ApiHideProperty()
  @IsOptional()
  @IsMongoId()
  _id: Types.ObjectId = new Types.ObjectId();

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiHideProperty()
  @IsOptional()
  @IsBoolean()
  edited: boolean = false;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  date?: Date = currentDate();
}

export class CreateJobDto {
  //TODO: Add optional columnId field, if not given 'No status'
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  companyId: Types.ObjectId;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  status?: Types.ObjectId;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  clientId?: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  assignedBy: Types.ObjectId;

  @ApiProperty()
  @ValidateNested()
  @Type(() => AssignedEmployees)
  @IsOptional()
  assignedEmployees?: AssignedEmployees;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Details)
  details: Details;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => RecordedDetails)
  recordedDetails?: RecordedDetails;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => ClientFeedback)
  clientFeedback?: ClientFeedback;

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Task)
  taskList?: Task[];

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Comment)
  comments?: Comment[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  tags?: Types.ObjectId[] = [];

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  priorityTag?: Types.ObjectId;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];

  @ApiProperty({ description: 'Must be a Base64 string' })
  @IsOptional()
  coverImage?: string;
}

export class CreateJobResponseDto {
  data: JobApiObject;
  constructor(data: JobApiObject) {
    this.data = data;
  }
}
