import { forwardRef, Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './entities/employee.entity';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { RoleModule } from '../role/role.module';
import { JobModule } from '../job/job.module';
import { TeamModule } from '../team/team.module';
import { JobService } from '../job/job.service';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => RoleModule),
    forwardRef(() => JobModule),
    forwardRef(() => TeamModule),
    forwardRef(() => ClientModule),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, JobService],
  exports: [EmployeeService, MongooseModule],
})
export class EmployeeModule {}
