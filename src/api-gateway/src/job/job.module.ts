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
import { JwtModule, JwtService } from '@nestjs/jwt';
import { FileService } from '../file/file.service';
import { FileModule } from '../file/file.module';
import { InventoryModule } from 'src/inventory/inventory.module';
import { InventoryService } from 'src/inventory/inventory.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => ClientModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => RoleModule),
    forwardRef(() => TeamModule),
    forwardRef(() => JwtModule),
    forwardRef(() => FileModule),
    forwardRef(() => InventoryModule),
  ],
  providers: [
    JobService,
    JobRepository,
    EmployeeService,
    EmployeeRepository,
    JwtService,
    FileService,
    InventoryService,
  ],
  controllers: [JobController],
  exports: [JobService, MongooseModule, JobRepository],
})
export class JobModule {}
