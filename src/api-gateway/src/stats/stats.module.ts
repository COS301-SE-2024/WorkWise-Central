import { forwardRef, Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { EmployeeModule } from '../employee/employee.module';
import { JobModule } from '../job/job.module';
import { ClientModule } from '../client/client.module';
import { FileModule } from '../file/file.module';
import { StockTakeModule } from '../stocktake/stocktake.module';
import { TeamModule } from '../team/team.module';
import { InvoiceModule } from '../invoices/invoice.module';
import { InventoryModule } from 'src/inventory/inventory.module';
import { StockMovementsModule } from 'src/stockmovements/stockmovements.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => JobModule),
    forwardRef(() => ClientModule),
    forwardRef(() => FileModule),
    forwardRef(() => StockTakeModule),
    forwardRef(() => TeamModule),
    forwardRef(() => InvoiceModule),
    forwardRef(() => InventoryModule),
    forwardRef(() => StockMovementsModule),
  ],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}
