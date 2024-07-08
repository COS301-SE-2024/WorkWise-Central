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
import { EmployeeRepository } from 'src/employee/employee.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => ClientModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => RoleModule),
    forwardRef(() => TeamModule),
  ],
  providers: [JobService, JobRepository, EmployeeService, EmployeeRepository],
  controllers: [JobController],
  exports: [JobService, MongooseModule, JobRepository],
})
export class JobModule {}
