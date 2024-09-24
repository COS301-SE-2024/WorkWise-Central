import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './entity/role.entity';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { Employee, EmployeeSchema } from '../employee/entities/employee.entity';
import { CompanyService } from '../company/company.service';
import { EmployeeService } from '../employee/employee.service';
import { JobService } from '../job/job.service';
import { TeamService } from '../team/team.service';
import { EmployeeModule } from '../employee/employee.module';
import { JobModule } from '../job/job.module';
import { ClientModule } from '../client/client.module';
import { Team, TeamSchema } from '../team/entities/team.entity';
import { RoleRepository } from './role.repository';
import { FileModule } from '../file/file.module';
import { InventoryService } from '../inventory/inventory.service';
import { InventoryModule } from '../inventory/inventory.module';
import { StockTakeModule } from '../stocktake/stocktake.module';
import { StockMovementsModule } from '../stockmovements/stockmovements.module';
import { InventoryUsedModule } from '../inventory-used/inventory-used.module';
import { EmailModule } from '../email/email.module';
import { TeamModule } from '../team/team.module';

@Module({
  // Heehee🕺
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Employee.name, schema: EmployeeSchema },
      { name: Team.name, schema: TeamSchema },
    ]),
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => JobModule),
    forwardRef(() => ClientModule),
    forwardRef(() => FileModule),
    forwardRef(() => InventoryModule),
    forwardRef(() => StockTakeModule),
    forwardRef(() => StockMovementsModule),
    forwardRef(() => InventoryUsedModule),
    forwardRef(() => EmailModule),
    forwardRef(() => TeamModule),
  ],
  controllers: [RoleController],
  providers: [RoleService, CompanyService, EmployeeService, JobService, TeamService, RoleRepository, InventoryService],
  exports: [RoleService, RoleRepository, MongooseModule],
})
export class RoleModule {}
