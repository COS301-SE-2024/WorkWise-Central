import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FuelType } from '../entities/vehicle.entity';
import { ApiProperty } from '@nestjs/swagger';

export class VehicleName {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;
}

export class AddVehicleInformationDto {
  @ValidateNested()
  @Type(() => VehicleName)
  name: VehicleName;

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
