import { forwardRef, Module } from '@nestjs/common';
import { InventoryService } from '../inventory/inventory.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StockTake, StockTakeSchema } from './entities/stocktake.entity';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { RoleModule } from '../role/role.module';
import { JobModule } from '../job/job.module';
import { TeamModule } from '../team/team.module';
import { JobService } from '../job/job.service';
import { ClientModule } from '../client/client.module';
import { StockTakeRepository } from './stocktake.repository';
import { FileModule } from '../file/file.module';
import { EmployeeModule } from '../employee/employee.module';
import { EmployeeService } from '../employee/employee.service';
import { StockTakeController } from './stocktake.controller';
import { StockTakeService } from './stocktake.service';
import { InventoryModule } from 'src/inventory/inventory.module';
import { StockMovementsModule } from '../stockmovements/stockmovements.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: StockTake.name, schema: StockTakeSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => InventoryModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => RoleModule),
    forwardRef(() => JobModule),
    forwardRef(() => TeamModule),
    forwardRef(() => ClientModule),
    forwardRef(() => FileModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => StockMovementsModule),
  ],
  controllers: [StockTakeController],
  providers: [StockTakeService, StockTakeRepository, JobService, EmployeeService, InventoryService],
  exports: [StockTakeService, StockTakeRepository, MongooseModule],
})
export class StockTakeModule {}
