import { Controller, Get, Post, Body } from '@nestjs/common';
import { VehicleInformationService } from './vehicle-information.service';
import { VehicleInfo, VehicleInfoSwagger } from './models/vehicle-info.model';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleInformationService: VehicleInformationService) {}

  @ApiResponse({ status: 200, description: 'Returns all vehicles', type: VehicleInfoSwagger, isArray: true })
  @Get('all')
  async getAllVehicles(): Promise<VehicleInfo[]> {
    return this.vehicleInformationService.getAllVehicles();
  }

  @ApiResponse({ status: 201, description: 'Returns all vehicles', type: VehicleInfoSwagger })
  @ApiBody({ type: VehicleInfoSwagger })
  @Post('add')
  async addVehicle(@Body() vehicle: VehicleInfo): Promise<VehicleInfo> {
    return this.vehicleInformationService.addVehicle(vehicle);
  }

  @ApiResponse({ status: 201, description: 'Returns all vehicles', type: VehicleInfoSwagger })
  @ApiBody({ type: VehicleInfoSwagger, isArray: true })
  @Post('add/bulk')
  async addMultipleVehicles(@Body() vehicles: VehicleInfo[]): Promise<VehicleInfo[]> {
    return this.vehicleInformationService.addMultipleVehicles(vehicles);
  }
}
