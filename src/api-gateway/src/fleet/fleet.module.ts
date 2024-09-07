import { forwardRef, Module } from '@nestjs/common';
import { FleetService } from './fleet.service';
import { FleetController } from './fleet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { JobModule } from '../job/job.module';
import { TeamModule } from '../team/team.module';
import { ClientModule } from '../client/client.module';
import { RoleModule } from '../role/role.module';
import { EmailModule } from '../email/email.module';
import { FileModule } from '../file/file.module';
import { InventoryModule } from '../inventory/inventory.module';
import { NotificationModule } from '../notification/notification.module';
import { EmployeeModule } from '../employee/employee.module';
import { StockTakeModule } from '../stocktake/stocktake.module';
import { StockMovementsModule } from '../stockmovements/stockmovements.module';
import { Vehicle, VehicleSchema } from './entities/vehicle.entity';
import { FleetRepository } from './fleet.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => JobModule),
    forwardRef(() => TeamModule),
    forwardRef(() => ClientModule),
    forwardRef(() => RoleModule),
    forwardRef(() => EmailModule),
    forwardRef(() => FileModule),
    forwardRef(() => InventoryModule),
    forwardRef(() => NotificationModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => StockTakeModule),
    forwardRef(() => StockMovementsModule),
  ],
  controllers: [FleetController],
  providers: [FleetService, FleetRepository],
  exports: [FleetService, FleetRepository, MongooseModule],
})
export class FleetModule {}
