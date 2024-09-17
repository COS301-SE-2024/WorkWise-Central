import { Types } from 'mongoose';
import { IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStockMovementsDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsDate()
  movementDate: Date;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  reason: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  movement: number;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  companyId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  employeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  inventoryId: Types.ObjectId;
}

export class CreateStockMovementsResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
