import { forwardRef, Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './entities/company.entity';
import { UsersModule } from '../users/users.module';
import { CompanyRepository } from './company.repository';
import { RoleService } from '../role/role.service';
import { EmployeeService } from '../employee/employee.service';
import { JobService } from '../job/job.service';
import { JobModule } from '../job/job.module';
import { TeamModule } from '../team/team.module';
import { TeamService } from '../team/team.service';
import { ClientModule } from '../client/client.module';
import { RoleModule } from '../role/role.module';
import { UsersService } from '../users/users.service';
import { EmailModule } from '../email/email.module';
import { JwtService } from '@nestjs/jwt';
import { FileModule } from '../file/file.module';
import { FileService } from '../file/file.service';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => JobModule),
    forwardRef(() => TeamModule),
    forwardRef(() => ClientModule),
    forwardRef(() => RoleModule),
    forwardRef(() => EmailModule),
    forwardRef(() => FileModule),
    forwardRef(() => EmployeeModule),
  ],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    CompanyRepository,
    RoleService,
    EmployeeService,
    JobService,
    TeamService,
    UsersService,
    JwtService,
    FileService,
  ],
  exports: [CompanyService, CompanyRepository, MongooseModule],
})
export class CompanyModule {}
