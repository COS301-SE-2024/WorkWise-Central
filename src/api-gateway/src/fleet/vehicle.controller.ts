import { Controller, Get, Post, Body } from '@nestjs/common';
import { VehicleInformationService } from './vehicle-information.service';
import { VehicleInfo } from './models/vehicle-info.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleInformationService: VehicleInformationService) {}

  @Get('all')
  async getAllVehicles(): Promise<VehicleInfo[]> {
    return this.vehicleInformationService.getAllVehicles();
  }

  @Post('add')
  async addVehicle(@Body() vehicle: VehicleInfo): Promise<VehicleInfo> {
    return this.vehicleInformationService.addVehicle(vehicle);
  }

  @Post('add/bulk')
  async addMultipleVehicles(@Body() vehicles: VehicleInfo[]): Promise<VehicleInfo[]> {
    return this.vehicleInformationService.addMultipleVehicles(vehicles);
  }
}
