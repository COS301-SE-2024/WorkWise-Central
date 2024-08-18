import { Types } from 'mongoose';
import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInventoryDto {
  @IsOptional()
  @ApiProperty()
  @IsDate()
  date?: Date;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  currentStockLevel?: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  recordedStockLevel?: number;
}

export class updateInventoryResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
