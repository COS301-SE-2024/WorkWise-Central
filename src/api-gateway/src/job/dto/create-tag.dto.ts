import {
  IsHexColor,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  defaultPriorityColour,
  defaultTagColour,
} from '../entities/job-tag.entity';
import { Types } from 'mongoose';

export class CreateTagDto {
  @IsNotEmpty()
  @IsMongoId()
  companyId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  @IsHexColor()
  colour?: string = defaultTagColour; //Will be hex value
}

export class CreatePriorityTagDto {
  @IsNotEmpty()
  @IsMongoId()
  companyId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsNumber()
  priorityLevel: number;

  @IsOptional()
  @IsString()
  @IsHexColor()
  colour?: string = defaultPriorityColour; //Will be hex value
}
