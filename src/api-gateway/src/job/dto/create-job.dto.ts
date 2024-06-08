import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import {
  IsArray,
  IsDate,
  IsNumber,
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
  inventoryUsed: [string]; //TODO: Convert to ObjectId

  @ApiProperty()
  @IsObject()
  details: details;

  @ApiProperty()
  @IsOptional()
  clientFeedback: clientFeedback;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  imagesTaken: string[];
}
