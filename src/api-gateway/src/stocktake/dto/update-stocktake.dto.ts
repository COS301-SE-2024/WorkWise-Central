import { Types } from 'mongoose';
import { IsArray, IsDate, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StockTakeItem } from './create-stocktake.dto';

export class UpdateStockTakeDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  items: StockTakeItem[];
}

export class updateIStockTakeResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
