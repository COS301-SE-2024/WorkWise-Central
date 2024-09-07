import { FuelType, VehicleAvailability, VehicleName } from '../entities/vehicle.entity';

export class VehicleWithId {
  _id: string;
  companyId: string;
  vin: string;
  name: VehicleName;
  modelYear: number;
  licensePlate: string;
  availability: VehicleAvailability;
  mileage: number;
  fuelType: FuelType;
}

export class FleetVehicleResponseDto {
  data: VehicleWithId;
}

export class FleetVehiclesResponseDto {
  data: VehicleWithId[];
}
