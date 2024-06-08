import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
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
  @Prop({ type: String, required: true })
  street: string;

  @ApiProperty()
  @IsString()
  @Prop({ type: String, required: true })
  suburb: string;

  @ApiProperty()
  @IsString()
  @Prop({ type: String, required: true })
  city: string;

  @ApiProperty()
  @IsString()
  @Prop({ type: String, required: true })
  postalCode: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Prop({ type: String, required: true })
  complex: string;

  @IsString()
  @ApiProperty()
  @Prop({ type: String, required: true })
  houseNumber: string;
}

class details {
  @ApiProperty()
  @IsString()
  @Prop({ required: true })
  heading: string;

  @ApiProperty()
  @IsString()
  @Prop({ required: true })
  description: string;

  @ApiProperty()
  @IsString()
  @Prop({ required: false })
  notes: string;

  @ApiProperty()
  @IsObject()
  @Prop({ required: true })
  address: address;
}

class clientFeedback {
  @ApiProperty()
  @IsNumber()
  @Prop({ required: false, default: 10 })
  jobRating: number;

  @ApiProperty()
  @IsNumber()
  @Prop({ required: false, default: 10 })
  customerServiceRating: number;

  @ApiProperty()
  @IsString()
  @Prop({ required: false, default: 10 })
  comments: string;
}

export class CreateJobDto {
  @IsObjectId()
  @ApiProperty()
  @Prop({ required: true })
  clientId: string;

  @ApiProperty()
  @IsObjectId()
  @Prop({ required: true })
  companyId: Types.ObjectId;

  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  assignedBy: string;

  @ApiProperty()
  @IsDate()
  @Prop({ required: true })
  scheduledDateTime: Date;

  @ApiProperty()
  @IsString()
  @Prop({ required: false, default: 'Not Started' })
  status: string;

  @ApiProperty()
  @IsArray({ each: true })
  @Prop({ required: false })
  inventoryUsed: [string]; //TODO: Convert to ObjectId

  @ApiProperty()
  @IsObject()
  @Prop({ required: true })
  details: details;

  @ApiProperty()
  @Prop({ required: false })
  @IsOptional()
  clientFeedback: clientFeedback;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Prop({ type: [String], required: true, default: [] })
  imagesTaken: string[];
}
