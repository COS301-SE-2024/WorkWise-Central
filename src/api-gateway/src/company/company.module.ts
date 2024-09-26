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
import { InventoryModule } from '../inventory/inventory.module';
import { InventoryService } from '../inventory/inventory.service';
import { ClientService } from '../client/client.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationModule } from '../notification/notification.module';
import { EmployeeModule } from '../employee/employee.module';
import { StockTakeModule } from '../stocktake/stocktake.module';
import { StockTakeService } from '../stocktake/stocktake.service';
import { StockMovementsModule } from '../stockmovements/stockmovements.module';
import { InventoryUsedModule } from '../inventory-used/inventory-used.module';

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
    forwardRef(() => InventoryModule),
    forwardRef(() => NotificationModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => StockTakeModule),
    forwardRef(() => StockMovementsModule),
    forwardRef(() => InventoryUsedModule),
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
    InventoryService,
    ClientService,
    NotificationService,
    StockTakeService,
  ],
  exports: [CompanyService, CompanyRepository, MongooseModule],
})
export class CompanyModule {}
