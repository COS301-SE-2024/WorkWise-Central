import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreateInventoryDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  name: string;

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
  @ApiProperty()
  @IsNumber()
  reorderLevel?: number;

  @ApiProperty({ description: 'Must be an array of Base64 URI strings' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.map((item: string) => item.trim()))
  images?: string[] = [];

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  companyId: Types.ObjectId;
}

export class CreateInventoryOuterDto {
  @IsNotEmpty()
  @IsMongoId()
  currentEmployeeId: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateInventoryDto)
  createInventoryDto: CreateInventoryDto;
}

export class CreateInventoryResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
