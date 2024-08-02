import {
  IsHexColor,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class UpdateTagDto {
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
  label?: string;

  @IsOptional()
  @IsString()
  @IsHexColor()
  colour?: string; //Will be hex value
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
