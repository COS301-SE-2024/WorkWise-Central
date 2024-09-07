import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Company } from '../../company/entities/company.entity';
import { SchemaTypes, Types } from 'mongoose';
import { Employee } from '../../employee/entities/employee.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { currentDate } from '../../utils/Utils';

export enum VehicleAvailabilityEnum {
  AVAILABLE = 'Available',
  IN_USE = 'In Use',
  IN_MAINTENANCE = 'In Maintenance',
  OUT_OF_SERVICE = 'Out of Service',
}

export enum FuelType {
  PETROL = 'Petrol',
  DIESEL = 'Diesel',
  ELECTRIC = 'Electric',
  HYBRID = 'Hybrid',
}

export class VehicleName {
  @Prop({ required: true })
  make: string;

  @Prop({ required: true })
  model: string;
}

export class VehicleAvailability {
  @Prop({ type: String, enum: VehicleAvailabilityEnum, required: true, default: VehicleAvailabilityEnum.AVAILABLE })
  status: VehicleAvailabilityEnum = VehicleAvailabilityEnum.AVAILABLE;

  @Prop({ type: SchemaTypes.ObjectId, required: false, ref: Employee.name, default: null })
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
  @Prop({ type: Number, required: false, default: 0 })
  totalTrips: number = 0;
  @Prop({ type: Number, required: false, default: 0 })
  totalDistance: number = 0;
  @Prop({ type: Number, required: false, default: 0 })
  averageFuelConsumption: number = 0;
}

export class VehicleLocationData {
  @Prop({ type: Number, required: false, default: 0 })
  latitude: number;
  @Prop({ type: Number, required: false, default: 0 })
  longitude: number;
}

@Schema()
export class Vehicle {
  @Prop({
    type: SchemaTypes.ObjectId,
    default: new Types.ObjectId(),
  })
  _id: Types.ObjectId = new Types.ObjectId();

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: Company.name })
  companyId: string;

  @Prop({ required: false })
  vin?: string; // Is it needed?

  @Prop({ type: VehicleName, required: true })
  name: VehicleName;

  @Prop({ type: Number, required: true })
  modelYear: number;

  @Prop({ required: true })
  licensePlate: string;

  @Prop({ required: true, type: VehicleAvailability })
  availability: VehicleAvailability = new VehicleAvailability();

  @Prop({ type: Number, required: true })
  mileage: number = 0;

  @Prop({ type: String, required: true, enum: FuelType })
  fuelType: FuelType;

  @Prop({ type: ServiceDetails, required: false })
  serviceDetails?: ServiceDetails;

  @Prop()
  location?: VehicleLocationData;

  @Prop({ type: VehicleStats, required: true, default: new VehicleStats() })
  statistics: VehicleStats = new VehicleStats();

  @ApiHideProperty()
  @Prop({ required: true, default: currentDate() })
  public createdAt: Date = currentDate();

  @ApiHideProperty()
  @Prop({ required: false })
  public updatedAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public deletedAt: Date;

  constructor(createVehicleDto: CreateVehicleDto) {
    this.companyId = createVehicleDto.companyId;
    if (createVehicleDto.vin) this.vin = createVehicleDto.vin;
    this.name = createVehicleDto.name;
    this.modelYear = createVehicleDto.modelYear;
    this.licensePlate = createVehicleDto.licensePlate;
    this.availability = createVehicleDto.availability;
    this.mileage = createVehicleDto.mileage;
    this.fuelType = createVehicleDto.fuelType;
    if (createVehicleDto.serviceDetails) this.serviceDetails = createVehicleDto.serviceDetails;
    if (createVehicleDto.location) this.location = createVehicleDto.location;
    this.statistics = createVehicleDto.statistics;
  }
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
