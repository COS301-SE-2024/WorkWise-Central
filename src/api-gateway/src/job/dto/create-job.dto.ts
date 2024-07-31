import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import {
  IsArray,
  IsBoolean,
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
import { JobApiDetailedObject, JobApiObject } from '../entities/job.entity';

export class Address {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  province: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  suburb: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(20)
  postalCode: string;

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
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: () => Address })
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

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
  employeeIds?: Types.ObjectId[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  teamIds?: Types.ObjectId[];
}

export class Task {
  @ApiHideProperty()
  @IsOptional()
  @IsMongoId()
  _id: Types.ObjectId = new Types.ObjectId();

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string = 'To do';

  @ApiProperty()
  @IsArray()
  @IsMongoId({ each: true })
  assignedEmployees?: Types.ObjectId[] = [];
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
  date?: Date = new Date();
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
  statusId?: Types.ObjectId;

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
  @IsOptional()
  @IsString()
  status?: string = 'To do';

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

  /*  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  history?: History[];*/
}

export class CreateJobResponseDto {
  data: JobApiObject;
  constructor(data: JobApiObject) {
    this.data = data;
  }
}

export class JobAllResponseDto {
  constructor(data: JobApiObject[]) {
    this.data = data;
  }
  data: JobApiObject[];
}

export class JobAllResponseDetailedDto {
  constructor(data: JobApiDetailedObject[]) {
    this.data = data;
  }
  data: JobApiDetailedObject[];
}
