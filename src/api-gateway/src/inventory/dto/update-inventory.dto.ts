import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInventoryDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  name?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  description?: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  costPrice?: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  salePrice?: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  currentStockLevel?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  reorderLevel?: number;

  @IsOptional()
  @ApiProperty()
  @IsString()
  reason?: string;
}

export class ExternalInventoryUpdateDto {
  @ApiProperty()
  @IsMongoId()
  currentEmployeeId: Types.ObjectId;

  @ApiProperty()
  @IsObject()
  updateInventoryDto: UpdateInventoryDto;
}

export class updateInventoryResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
