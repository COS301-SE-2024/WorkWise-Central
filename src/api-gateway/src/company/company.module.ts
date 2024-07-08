import { forwardRef, Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './entities/company.entity';
import { UsersModule } from '../users/users.module';
import { CompanyRepository } from './company.repository';
import { RoleService } from '../role/role.service';
import { Role, RoleSchema } from '../role/entity/role.entity';
import { EmployeeService } from '../employee/employee.service';
import { Employee, EmployeeSchema } from '../employee/entities/employee.entity';
import { User, UserSchema } from '../users/entities/user.entity';
import { JobService } from '../job/job.service';
import { JobModule } from '../job/job.module';
import { TeamModule } from '../team/team.module';
import { TeamService } from '../team/team.service';
import { ClientModule } from '../client/client.module';
import { RoleModule } from '../role/role.module';
import { UsersService } from '../users/users.service';
import { EmailModule } from '../email/email.module';
import { RoleRepository } from 'src/role/role.repository';
import { EmployeeRepository } from 'src/employee/employee.repository';
import { TeamRepository } from 'src/team/team.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
    forwardRef(() => UsersModule),
    forwardRef(() => JobModule),
    forwardRef(() => TeamModule),
    forwardRef(() => ClientModule),
    forwardRef(() => RoleModule),
    forwardRef(() => EmailModule),
  ],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    CompanyRepository,
    RoleService,
    RoleRepository,
    EmployeeService,
    EmployeeRepository,
    JobService,
    TeamService,
    TeamRepository,
    UsersService,
  ],
  exports: [CompanyService, CompanyRepository, MongooseModule],
})
export class CompanyModule {}
