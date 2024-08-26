import { forwardRef, Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './entities/job.entity';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { ClientModule } from '../client/client.module';
import { JobRepository } from './job.repository';
import { EmployeeModule } from '../employee/employee.module';
import { EmployeeService } from '../employee/employee.service';
import { TeamModule } from '../team/team.module';
import { RoleModule } from '../role/role.module';
import { EmployeeRepository } from '../employee/employee.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { FileService } from '../file/file.service';
import { FileModule } from '../file/file.module';
import { JobPriorityTag, JobPriorityTagSchema, JobTag, JobTagSchema } from './entities/job-tag.entity';
import { JobTagRepository } from './job-tag.repository';
import { JobStatus, JobStatusSchema } from './entities/job-status.entity';
import { InventoryModule } from '../inventory/inventory.module';
import { InventoryService } from '../inventory/inventory.service';
import { StockTakeModule } from '../stocktake/stocktake.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Job.name, schema: JobSchema },
      { name: JobTag.name, schema: JobTagSchema },
      { name: JobPriorityTag.name, schema: JobPriorityTagSchema },
      { name: JobStatus.name, schema: JobStatusSchema },
    ]),
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
  ],
  providers: [
    JobService,
    JobRepository,
    JobTagRepository,
    EmployeeService,
    EmployeeRepository,
    JwtService,
    FileService,
    InventoryService,
  ],
  controllers: [JobController],
  exports: [JobService, MongooseModule, JobRepository, JobTagRepository],
})
export class JobModule {}
