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

  /*  @IsOptional()
  @IsString()
  @IsMongoId()
  companyId: string;*/
}
