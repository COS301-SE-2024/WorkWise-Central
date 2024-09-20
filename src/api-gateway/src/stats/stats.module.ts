import { forwardRef, Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { EmployeeModule } from '../employee/employee.module';
import { JobModule } from '../job/job.module';
import { ClientModule } from '../client/client.module';
import { FileModule } from '../file/file.module';
import { StockTakeModule } from '../stocktake/stocktake.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => JobModule),
    forwardRef(() => ClientModule),
    forwardRef(() => FileModule),
    forwardRef(() => StockTakeModule),
  ],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService, MongooseModule],
})
export class statsModule {}
