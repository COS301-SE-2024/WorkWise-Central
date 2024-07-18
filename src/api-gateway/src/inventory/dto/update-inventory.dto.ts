import { Types } from 'mongoose';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInventoryDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  name: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  description: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  costPrice: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  currentStockLevel: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  reorderLevel: number;
}

export class updateInventoryResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
