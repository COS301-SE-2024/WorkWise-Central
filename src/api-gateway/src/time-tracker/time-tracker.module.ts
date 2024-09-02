import { forwardRef, Module } from '@nestjs/common';
import { TimeTrackerService } from './time-tracker.service';
import { TimeTrackerController } from './time-tracker.controller';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { ClientModule } from '../client/client.module';
import { EmployeeModule } from '../employee/employee.module';
import { RoleModule } from '../role/role.module';
import { TeamModule } from '../team/team.module';
import { JwtModule } from '@nestjs/jwt';
import { FileModule } from '../file/file.module';
import { InventoryModule } from '../inventory/inventory.module';
import { StockTakeModule } from '../stocktake/stocktake.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeTrackerRepository } from './time-tracker.repository';
import { TimeTracker, TimeTrackerSchema } from './entities/time-tracker.entity';
import { JobService } from '../job/job.service';
import { JobModule } from '../job/job.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TimeTracker.name, schema: TimeTrackerSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => ClientModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => RoleModule),
    forwardRef(() => TeamModule),
    forwardRef(() => JwtModule),
    forwardRef(() => FileModule),
    forwardRef(() => InventoryModule),
    forwardRef(() => StockTakeModule),
    forwardRef(() => JobModule),
  ],
  controllers: [TimeTrackerController],
  providers: [TimeTrackerService, TimeTrackerRepository, JobService],
  exports: [MongooseModule, TimeTrackerService, TimeTrackerRepository],
})
export class TimeTrackerModule {}
