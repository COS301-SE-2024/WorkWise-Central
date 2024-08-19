import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateStocktakeDto } from './create-stocktake.dto';

export class BulkCreateStocktakeDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  currentEmployeeId: Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  items: CreateStocktakeDto[];
}
