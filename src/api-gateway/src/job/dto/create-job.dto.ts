import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNumber,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

class address {
  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  suburb: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  postalCode: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  complex: string;

  @IsString()
  @ApiProperty()
  @IsNumberString()
  houseNumber: string;
}

class details {
  @ApiProperty()
  @IsString()
  heading: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  notes: string;

  @ApiProperty()
  @IsObject()
  address: address;

  @ApiProperty()
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @IsDate()
  endDate: Date;
}

class clientFeedback {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  jobRating: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  customerServiceRating: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  comments: string;
}

export class CreateJobDto {
  /*  @ApiProperty()
  @IsObjectId()
  clientId: string;*/

  @ApiProperty()
  @IsString()
  @IsOptional()
  clientUsername: string;

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
