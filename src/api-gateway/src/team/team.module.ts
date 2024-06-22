import { forwardRef, Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './entities/team.entity';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Team.name, schema: TeamSchema },
    ]),
    forwardRef(() => UsersModule),
    CompanyModule,
    forwardRef(() => EmployeeModule), 
  ],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService, MongooseModule],
})
export class TeamModule {}
