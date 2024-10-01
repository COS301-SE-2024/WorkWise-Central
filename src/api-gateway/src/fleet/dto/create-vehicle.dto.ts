import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { VehicleAvailabilityEnum } from '../entities/vehicle.entity';
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
  assignedTo: Types.ObjectId = null;
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
  latitude: number;

  @IsOptional()
  @IsNumber()
  longitude: number;
}

export class CreateVehicleDto {
  @IsMongoId()
  @IsNotEmpty()
  employeeId: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  companyId: Types.ObjectId;

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
  @IsArray()
  @IsString({ each: true })
  images?: string[] = [];

  @IsOptional()
  @IsString()
  licensePlate?: string;

  @ValidateNested()
  @Type(() => VehicleAvailability)
  availability: VehicleAvailability = new VehicleAvailability();

  @IsNumber()
  mileage: number = 0;

  //@IsEnum(FuelType)
  //fuelType: FuelType;
  @IsString()
  @IsNotEmpty()
  fuelType: string;

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
