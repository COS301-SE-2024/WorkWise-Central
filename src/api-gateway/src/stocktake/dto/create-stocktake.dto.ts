import { Types } from 'mongoose';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StockTakeItem {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  @ValidateNested()
  currentStockLevel: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  recordedStockLevel: number;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  inventoryId: Types.ObjectId;
}

export class CreateStocktakeDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  items: StockTakeItem[];

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  companyId: Types.ObjectId;
}

export class OuterStockTakeItem {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  recordedStockLevel: number;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  inventoryId: Types.ObjectId;
}

export class OuterCreateStocktakeDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  currentEmployeeId;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  updateInventory: boolean;

  @IsOptional()
  @ApiProperty()
  @IsDate()
  date?: Date;

  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  items: OuterStockTakeItem[];

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  companyId: Types.ObjectId;
}

export class CreateStocktakeResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
