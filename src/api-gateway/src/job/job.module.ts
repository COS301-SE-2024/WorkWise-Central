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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => ClientModule),
    forwardRef(() => EmployeeModule),
  ],
  controllers: [JobController],
  providers: [JobService, JobRepository],
  exports: [JobService, MongooseModule, JobRepository],
  providers: [JobService, JobRepository, EmployeeService],
})
export class JobModule {}
