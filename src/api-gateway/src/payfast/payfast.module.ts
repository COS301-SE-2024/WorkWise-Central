import { forwardRef, Module } from '@nestjs/common';
import { PayfastService } from './payfast.service';
import { PayfastController } from './payfast.controller';
import { CompanyService } from '../company/company.service';
import { InvoiceService } from '../invoices/invoice.service';
import { CompanyModule } from '../company/company.module';
import { InventoryModule } from '../inventory/inventory.module';
import { EmployeeModule } from '../employee/employee.module';
import { UsersModule } from '../users/users.module';
import { RoleModule } from '../role/role.module';
import { JobModule } from '../job/job.module';
import { TeamModule } from '../team/team.module';
import { ClientModule } from '../client/client.module';
import { FileModule } from '../file/file.module';
import { StockTakeModule } from '../stocktake/stocktake.module';
import { TimeTrackerModule } from '../time-tracker/time-tracker.module';
import { StockMovementsModule } from '../stockmovements/stockmovements.module';
import { InvoiceModule } from '../invoices/invoice.module';
import { InventoryUsedModule } from '../inventory-used/inventory-used.module';
@Module({
  imports: [
    forwardRef(() => InvoiceModule),
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
  controllers: [PayfastController],
  providers: [PayfastService, CompanyService, InvoiceService],
  exports: [PayfastService],
})
export class PayfastModule {}
