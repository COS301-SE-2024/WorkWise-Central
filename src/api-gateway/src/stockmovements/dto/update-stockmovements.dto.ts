import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStockMovementsDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsDate()
  movementDate?: Date;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  reason?: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  movement?: number;
}

export class UpdateEmployeeInfoDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  username?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  firstName?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  surname?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  displayName?: string;
}
