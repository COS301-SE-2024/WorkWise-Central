import { forwardRef, Module } from '@nestjs/common';
import { StockMovementsService } from './stockmovements.service';
import { StockMovementsController } from './stockmovements.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StockMovements, StockMovementsSchema } from './entities/stockmovements.entity';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { RoleModule } from '../role/role.module';
import { JobModule } from '../job/job.module';
import { TeamModule } from '../team/team.module';
import { JobService } from '../job/job.service';
import { ClientModule } from '../client/client.module';
import { StockMovementsRepository } from './stockmovements.repository';
import { FileModule } from '../file/file.module';
import { EmployeeModule } from '../employee/employee.module';
import { EmployeeService } from '../employee/employee.service';
import { StockTakeModule } from '../stocktake/stocktake.module';
import { StockTakeService } from '../stocktake/stocktake.service';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: StockMovements.name, schema: StockMovementsSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => RoleModule),
    forwardRef(() => JobModule),
    forwardRef(() => TeamModule),
    forwardRef(() => ClientModule),
    forwardRef(() => FileModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => StockTakeModule),
    forwardRef(() => InventoryModule),
  ],
  controllers: [StockMovementsController],
  providers: [StockMovementsService, StockMovementsRepository, JobService, EmployeeService, StockTakeService],
  exports: [StockMovementsService, StockMovementsRepository, MongooseModule],
})
export class StockMovementsModule {}
