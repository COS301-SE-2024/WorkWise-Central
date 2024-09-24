import { ApiProperty } from '@nestjs/swagger';

export interface VehicleInfo {
  make: string;
  model: string;
  modelYear: number;
  fuelType: string;
  serviceInterval: number;
  avgFuelConsumption: number;
}

export class VehicleInfoSwagger {
  @ApiProperty()
  make: string;
  @ApiProperty()
  model: string;
  @ApiProperty()
  modelYear: number;
  @ApiProperty()
  fuelType: string;
  @ApiProperty()
  serviceInterval: number;
  @ApiProperty()
  avgFuelConsumption: number;
}
