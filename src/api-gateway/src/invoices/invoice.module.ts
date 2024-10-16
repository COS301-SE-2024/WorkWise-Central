import { forwardRef, Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, InvoiceSchema } from './entities/invoice.entity';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { RoleModule } from '../role/role.module';
import { JobModule } from '../job/job.module';
import { TeamModule } from '../team/team.module';
import { JobService } from '../job/job.service';
import { ClientModule } from '../client/client.module';
import { InvoiceRepository } from './invoice.repository';
import { FileModule } from '../file/file.module';
import { EmployeeModule } from '../employee/employee.module';
import { EmployeeService } from '../employee/employee.service';
import { StockTakeModule } from '../stocktake/stocktake.module';
import { StockTakeService } from '../stocktake/stocktake.service';
import { InventoryModule } from '../inventory/inventory.module';
import { TimeTrackerModule } from '../time-tracker/time-tracker.module';
import { StockMovementsModule } from '../stockmovements/stockmovements.module';
import { InventoryUsedModule } from '../inventory-used/inventory-used.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }]),
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
    forwardRef(() => TimeTrackerModule),
    forwardRef(() => StockMovementsModule),
    forwardRef(() => InventoryUsedModule),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceRepository, JobService, EmployeeService, StockTakeService],
  exports: [InvoiceService, InvoiceRepository, MongooseModule],
})
export class InvoiceModule {}
