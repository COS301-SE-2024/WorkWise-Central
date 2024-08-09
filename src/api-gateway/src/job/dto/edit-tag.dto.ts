import { IsHexColor, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { AddHashtag } from '../../utils/Custom Transformers/add-hashtag.transformer';
import { CapitalizeWords } from '../../utils/Custom Transformers/capitalise-words.transformer';

export class UpdateTagDto {
  //TODO: Add updateTag endpoint
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  companyId: Types.ObjectId;

  @IsOptional()
  @IsString()
  @IsMongoId()
  tagId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @CapitalizeWords()
  label?: string;

  @IsOptional()
  @IsString()
  @IsHexColor()
  @AddHashtag()
  colour?: string;
}

export class UpdatePriorityTagDto {
  //TODO: Add updateTag endpoint
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  companyId: Types.ObjectId;

  @IsOptional()
  @IsString()
  @IsMongoId()
  priorityTagId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @CapitalizeWords()
  label?: string;

  @IsOptional()
  @IsString()
  @IsHexColor()
  @AddHashtag()
  colour?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  priorityLevel?: number;
}

export class DeleteTagDto {
  @IsOptional()
  @IsString()
  @IsMongoId()
  tagId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  companyId: Types.ObjectId;
}

export class DeleteStatusDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  statusId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  companyId: Types.ObjectId;
}
