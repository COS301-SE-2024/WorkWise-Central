import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FuelType } from '../entities/vehicle.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AddVehicleInformationDto {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  @IsNumber()
  modelYear: number;

  @IsNumber()
  mileage: number = 0;

  //@IsEnum(FuelType)
  @ApiProperty({ enum: FuelType })
  fuelType: FuelType;

  @IsNumber()
  serviceInterval: number = 0;

  @IsNumber()
  avgFuelConsumption: number;
}
