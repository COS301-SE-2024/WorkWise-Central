import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import {
  IsArray,
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

class Address {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  street: string;

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
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  complex: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(255)
  houseNumber: string;
}

class ClientFeedback {
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

class Details {
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
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  endDate: Date;
}

class InventoryUsed {
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

class RecordedDetails {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imagesTaken?: string[] = [];

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InventoryUsed)
  @IsOptional()
  inventoryUsed?: InventoryUsed[] = [];
}

class AssignedEmployees {
  @ApiProperty()
  @IsArray()
  @IsOptional()
  employeeIds?: Types.ObjectId[];

  @ApiProperty()
  @IsOptional()
  teamId?: Types.ObjectId;
}

class Task {
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

class Comment {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  date?: Date = new Date();
}

export class CreateJobDto {
  /*  @ApiProperty()
  @IsObjectId()
  clientId: string;*/

  @ApiProperty()
  @IsString()
  @IsOptional()
  clientUsername?: string;

  @ApiProperty()
  @IsObjectId()
  companyId: Types.ObjectId;

  @ApiProperty()
  @IsString()
  assignedBy: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  scheduledDateTime: Date;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsArray()
  @IsMongoId({ each: true })
  inventoryUsed: [string];

  @ApiProperty()
  @IsObject()
  details: details;

  @ApiProperty()
  @IsOptional()
  clientFeedback: clientFeedback;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imagesTaken: string[];
}
