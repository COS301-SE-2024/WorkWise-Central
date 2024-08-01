import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './entity/role.entity';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { Employee, EmployeeSchema } from '../employee/entities/employee.entity';
import { CompanyService } from '../company/company.service';
import { Company, CompanySchema } from '../company/entities/company.entity';
import { CompanyRepository } from '../company/company.repository';
import { EmployeeService } from '../employee/employee.service';
import { JobService } from '../job/job.service';
import { TeamService } from '../team/team.service';
import { Job, JobSchema } from '../job/entities/job.entity';
import { EmployeeModule } from '../employee/employee.module';
import { JobRepository } from '../job/job.repository';
import { JobModule } from '../job/job.module';
import { ClientModule } from '../client/client.module';
import { Team, TeamSchema } from '../team/entities/team.entity';
import { RoleRepository } from './role.repository';
import { FileModule } from '../file/file.module';
import { InventoryModule } from '../inventory/inventory.module';
import { EmployeeRepository } from '../employee/employee.repository';
import { TeamRepository } from '../team/team.repository';
import { InventoryService } from '../inventory/inventory.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Employee.name, schema: EmployeeSchema },
      { name: Company.name, schema: CompanySchema },
      { name: Job.name, schema: JobSchema },
      { name: Team.name, schema: TeamSchema },
    ]),
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => JobModule),
    forwardRef(() => ClientModule),
    forwardRef(() => FileModule),
    forwardRef(() => InventoryModule),
  ],
  controllers: [RoleController],
  providers: [
    RoleService,
    CompanyService,
    CompanyRepository,
    EmployeeService,
    EmployeeRepository,
    JobService,
    JobRepository,
    TeamService,
    TeamRepository,
    RoleRepository,
    InventoryService,
  ],
  exports: [RoleService, RoleRepository, MongooseModule],
})
export class RoleModule {}
