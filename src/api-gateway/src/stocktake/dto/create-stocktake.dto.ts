import { Types } from 'mongoose';
import { IsArray, IsDate, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StockTakeItem {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  currentStockLevel: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  recordedStockLevel: number;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  inventoryItem: Types.ObjectId;
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
}

export class CreateStocktakeResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
