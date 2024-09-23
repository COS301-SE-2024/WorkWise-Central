import { forwardRef, Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './entities/employee.entity';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { RoleModule } from '../role/role.module';
import { JobModule } from '../job/job.module';
import { TeamModule } from '../team/team.module';
import { JobService } from '../job/job.service';
import { ClientModule } from '../client/client.module';
import { EmployeeRepository } from './employee.repository';
import { FileModule } from '../file/file.module';
import { InventoryModule } from '../inventory/inventory.module';
import { InventoryService } from '../inventory/inventory.service';
import { StockTakeModule } from '../stocktake/stocktake.module';
import { StockMovementsModule } from '../stockmovements/stockmovements.module';
import { InventoryUsedModule } from '../inventory-used/inventory-used.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => RoleModule),
    forwardRef(() => JobModule),
    forwardRef(() => TeamModule),
    forwardRef(() => ClientModule),
    forwardRef(() => FileModule),
    forwardRef(() => InventoryModule),
    forwardRef(() => StockTakeModule),
    forwardRef(() => StockMovementsModule),
    forwardRef(() => InventoryUsedModule),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository, JobService, InventoryService],
  exports: [EmployeeService, EmployeeRepository, MongooseModule],
})
export class EmployeeModule {}
