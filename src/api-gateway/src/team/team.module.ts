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
import { ClientModule } from '../client/client.module';
import { TeamRepository } from './team.repository';
import { FileModule } from '../file/file.module';
import { StockTakeModule } from '../stocktake/stocktake.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => JobModule),
    forwardRef(() => ClientModule),
    forwardRef(() => FileModule),
    forwardRef(() => StockTakeModule),
  ],
  controllers: [TeamController],
  providers: [TeamService, TeamRepository, JobService],
  exports: [TeamService, TeamRepository, MongooseModule],
})
export class TeamModule {}
