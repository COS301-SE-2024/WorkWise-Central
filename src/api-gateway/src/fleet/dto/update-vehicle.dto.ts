import {
  IsArray,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { FuelType, VehicleAvailabilityEnum } from '../entities/vehicle.entity';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';

export class VehicleName {
  @IsOptional()
  @IsString()
  make?: string;

  @IsOptional()
  @IsString()
  model?: string;
}

export class VehicleAvailability {
  @IsOptional()
  @IsEnum(VehicleAvailabilityEnum)
  status?: VehicleAvailabilityEnum;

  @IsOptional()
  @IsMongoId()
  assignedTo?: Types.ObjectId;
}

export class ServiceDetails {
  @IsOptional()
  @IsDate()
  lastServiceDate?: Date;

  @IsOptional()
  @IsDate()
  nextServiceDue?: Date;

  @IsOptional()
  @IsNumber()
  serviceInterval?: number;
}

export class VehicleStats {
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalTrips?: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalDistance?: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(0)
  averageFuelConsumption?: number = 0;
}

export class VehicleLocationData {
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;
}

export class UpdateVehicleDto {
  @IsNotEmpty()
  @IsMongoId()
  currentEmployeeId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  vehicleId: Types.ObjectId;

  @IsOptional()
  @IsString()
  vin?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => VehicleName)
  name?: VehicleName;

  @IsOptional()
  @IsNumber()
  modelYear?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[] = [];

  @IsOptional()
  @IsString()
  licensePlate?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => VehicleAvailability)
  availability?: VehicleAvailability = new VehicleAvailability();

  @IsOptional()
  @IsNumber()
  mileage?: number;

  @IsOptional()
  @IsEnum(FuelType)
  fuelType?: FuelType;

  @IsOptional()
  @ValidateNested()
  @Type(() => ServiceDetails)
  serviceDetails?: ServiceDetails;

  @IsOptional()
  @ValidateNested()
  @Type(() => VehicleLocationData)
  location?: VehicleLocationData;

  @IsOptional()
  @ValidateNested()
  @Type(() => VehicleStats)
  statistics?: VehicleStats;
}
