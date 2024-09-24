import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleInformationService } from './vehicle-information.service';

@Module({
  controllers: [VehicleController],
  providers: [VehicleInformationService],
})
export class VehicleModule {}
