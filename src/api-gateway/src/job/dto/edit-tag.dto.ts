import { IsHexColor, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { AddHashtag } from '../../utils/Custom Transformers/add-hashtag.transformer';
import { CapitalizeWords } from '../../utils/Custom Transformers/capitalise-words.transformer';

export class UpdateTagDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  companyId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  tagId: Types.ObjectId;

  @IsOptional()
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
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  companyId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  priorityTagId: Types.ObjectId;

  @IsOptional()
  @IsString()
  @CapitalizeWords()
  label?: string;

  @IsOptional()
  @IsString()
  @IsHexColor()
  @AddHashtag()
  colour?: string;

  @IsOptional()
  @IsNumber()
  priorityLevel?: number;
}

export class DeleteTagDto {
  @IsNotEmpty()
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
