import { forwardRef, Module } from '@nestjs/common';
import { InventoryService } from './stocktake.service';
import { InventoryController } from './stocktake.controller';
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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: StockTake.name, schema: StockTakeSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => RoleModule),
    forwardRef(() => JobModule),
    forwardRef(() => TeamModule),
    forwardRef(() => ClientModule),
    forwardRef(() => FileModule),
    forwardRef(() => EmployeeModule),
  ],
  controllers: [InventoryController],
  providers: [InventoryService, StockTakeRepository, JobService, EmployeeService],
  exports: [InventoryService, StockTakeRepository, MongooseModule],
})
export class InventoryModule {}
