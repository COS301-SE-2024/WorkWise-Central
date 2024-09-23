import { forwardRef, Module } from '@nestjs/common';
import { InventoryUsedService } from './inventory-used.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryUsed, InventoryUsedSchema } from './entities/inventory-used.entity';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { RoleModule } from '../role/role.module';
import { JobModule } from '../job/job.module';
import { TeamModule } from '../team/team.module';
import { JobService } from '../job/job.service';
import { ClientModule } from '../client/client.module';
import { InventoryUsedRepository } from './inventory-used.repository';
import { FileModule } from '../file/file.module';
import { EmployeeModule } from '../employee/employee.module';
import { EmployeeService } from '../employee/employee.service';
import { StockTakeModule } from '../stocktake/stocktake.module';
import { StockTakeService } from '../stocktake/stocktake.service';
import { StockMovementsModule } from '../stockmovements/stockmovements.module';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: InventoryUsed.name, schema: InventoryUsedSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => RoleModule),
    forwardRef(() => JobModule),
    forwardRef(() => TeamModule),
    forwardRef(() => ClientModule),
    forwardRef(() => FileModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => StockTakeModule),
    forwardRef(() => StockMovementsModule),
    forwardRef(() => InventoryModule),
  ],
  providers: [InventoryUsedService, InventoryUsedRepository, JobService, EmployeeService, StockTakeService],
  exports: [InventoryUsedService, InventoryUsedRepository, MongooseModule],
})
export class InventoryUsedModule {}
