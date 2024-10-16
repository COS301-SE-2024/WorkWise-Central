import { forwardRef, Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory, InventorySchema } from './entities/inventory.entity';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { RoleModule } from '../role/role.module';
import { JobModule } from '../job/job.module';
import { TeamModule } from '../team/team.module';
import { JobService } from '../job/job.service';
import { ClientModule } from '../client/client.module';
import { InventoryRepository } from './inventory.repository';
import { FileModule } from '../file/file.module';
import { EmployeeModule } from '../employee/employee.module';
import { EmployeeService } from '../employee/employee.service';
import { StockTakeModule } from '../stocktake/stocktake.module';
import { StockTakeService } from '../stocktake/stocktake.service';
import { StockMovementsModule } from '../stockmovements/stockmovements.module';
import { InventoryUsedModule } from '../inventory-used/inventory-used.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Inventory.name, schema: InventorySchema }]),
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
    forwardRef(() => InventoryUsedModule),
    forwardRef(() => EmailModule),
  ],
  controllers: [InventoryController],
  providers: [InventoryService, InventoryRepository, JobService, EmployeeService, StockTakeService],
  exports: [InventoryService, InventoryRepository, MongooseModule],
})
export class InventoryModule {}
