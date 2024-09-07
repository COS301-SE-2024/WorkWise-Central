import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { FuelType, VehicleAvailabilityEnum } from '../entities/vehicle.entity';
import { Type } from 'class-transformer';

export class VehicleName {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;
}

export class VehicleAvailability {
  @IsOptional()
  @IsString()
  // @IsEnum(VehicleAvailabilityEnum)
  // @Transform(({ value }) => {
  //   return VehicleAvailabilityEnum[value];
  // })
  status: VehicleAvailabilityEnum = VehicleAvailabilityEnum.AVAILABLE;

  @IsOptional()
  @IsMongoId()
  assignedTo?: Types.ObjectId = null;
}

export class ServiceDetails {
  @Prop({ type: Date, required: false })
  lastServiceDate?: Date = null;

  @Prop({ type: Date, required: false })
  nextServiceDue?: Date = null;

  @Prop({ type: Number, required: false })
  serviceInterval?: number;
}

export class VehicleStats {
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalTrips: number = 0;
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalDistance: number = 0;
  @IsOptional()
  @IsNumber()
  @Min(0)
  averageFuelConsumption: number = 0;
}

export class VehicleLocationData {
  @IsOptional()
  @IsNumber()
  @Min(0)
  latitude: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  longitude: number;
}

export class CreateVehicleDto {
  @IsMongoId()
  @IsNotEmpty()
  companyId: string;

  @IsOptional()
  @IsString()
  vin?: string;

  @ValidateNested()
  @Type(() => VehicleName)
  name: VehicleName;

  @IsNotEmpty()
  @IsNumber()
  modelYear: number;

  @IsOptional()
  @IsString()
  licensePlate?: string;

  @ValidateNested()
  @Type(() => VehicleAvailability)
  availability: VehicleAvailability = new VehicleAvailability();

  @IsNumber()
  mileage: number = 0;

  //@IsEnum(FuelType)
  fuelType: FuelType;

  @IsOptional()
  @ValidateNested()
  @Type(() => ServiceDetails)
  serviceDetails?: ServiceDetails;

  @IsOptional()
  @ValidateNested()
  @Type(() => VehicleLocationData)
  location?: VehicleLocationData;

  @ValidateNested()
  @Type(() => VehicleStats)
  statistics: VehicleStats = new VehicleStats();
}
