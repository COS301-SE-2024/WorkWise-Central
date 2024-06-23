import { forwardRef, Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './entities/team.entity';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { EmployeeModule } from '../employee/employee.module';
import { JobModule } from '../job/job.module';
import { JobService } from '../job/job.service';
import { JobRepository } from '../job/job.repository';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => JobModule),
    forwardRef(() => ClientModule),
  ],
  controllers: [TeamController],
  providers: [TeamService, JobService, JobRepository],
  exports: [TeamService, MongooseModule],
})
export class TeamModule {}
