import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsMongoId,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import { Transform, Type } from 'class-transformer';

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
  jobRating?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(10)
  customerServiceRating?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  comments?: string;
}
export class Details {
  @ApiProperty()
  @IsOptional()
  @IsString()
  heading?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: () => Address })
  @IsOptional()
  address?: Address;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
///
export class InventoryUsed {
  //TODO: Actually integrate with inventory, speak to Kumbi and Jess
  @ApiProperty()
  @IsOptional()
  inventoryItemId?: Types.ObjectId;

  @ApiProperty()
  @IsOptional()
  @IsString()
  inventoryItemName?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantityUsed?: number;
}
export class RecordedDetails {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imagesTaken?: string[];

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => InventoryUsed)
  inventoryUsed?: InventoryUsed[];
}
///
export class TaskItem {
  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  done?: boolean;

  /*  @ApiProperty()  //TODO: Maybe add status to Items
  @IsOptional()
  @IsMongoId()
  status?: Types.ObjectId;*/
}

export class Task {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => TaskItem)
  items?: TaskItem[];
}

// Status is in a separate schema
export class UpdateJobDto {
  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  clientId?: Types.ObjectId;

  // @ApiProperty()
  // @ValidateNested()
  // @Type(() => UpdateAssignedEmployees)
  // @IsOptional()
  // assignedEmployees?: UpdateAssignedEmployees;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  status?: Types.ObjectId;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Details)
  @IsOptional()
  details?: Details;

  @ApiProperty()
  @ValidateNested()
  @Type(() => RecordedDetails)
  @IsOptional()
  recordedDetails?: RecordedDetails;

  @ApiProperty()
  @ValidateNested()
  @Type(() => ClientFeedback)
  @IsOptional()
  clientFeedback?: ClientFeedback;

  // @ApiProperty()
  // @ValidateNested({ each: true })
  // @Type(() => Task)
  // @IsOptional()
  // taskList?: Task[];

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

  @ApiProperty({ description: 'Must be a Base64 string' })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  coverImage?: string;
}

/*
export class UpdateDtoResponse {
  success: boolean;
  message?: string;
  constructor(success: boolean, message?: string) {
    this.success = success;
    if (message) this.message = message;
  }
}
*/
