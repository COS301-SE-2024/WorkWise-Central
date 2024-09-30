import { IsHexColor, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { defaultPriorityColour, defaultTagColour, JobPriorityTag } from '../entities/job-tag.entity';
import { Types } from 'mongoose';
import { AddHashtag } from '../../utils/Custom Transformers/add-hashtag.transformer';
import { CapitalizeWords } from '../../utils/Custom Transformers/capitalise-words.transformer';

export class CreateTagDto {
  @IsNotEmpty()
  @IsMongoId()
  companyId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @CapitalizeWords()
  label: string;

  @IsOptional()
  @IsString()
  @IsHexColor()
  @AddHashtag()
  colour?: string = defaultTagColour; //Will be hex value
}

export class CreatePriorityTagDto {
  @IsNotEmpty()
  @IsMongoId()
  companyId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @CapitalizeWords()
  label: string;

  @IsNotEmpty()
  @IsNumber()
  priorityLevel: number;

  @IsOptional()
  @IsString()
  @IsHexColor()
  @AddHashtag()
  colour?: string = defaultPriorityColour; //Will be hex value
}

export class CreateStatusDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  companyId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @CapitalizeWords()
  status: string;

  @IsOptional()
  @IsString()
  @IsHexColor()
  @AddHashtag()
  colour?: string = defaultTagColour; //Will be hex value
}

export class PriorityTagDto {
  data: JobPriorityTag;
}
