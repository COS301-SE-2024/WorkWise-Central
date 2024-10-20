import { forwardRef, Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './entities/client.entity';
import { ClientRepository } from './client.repository';
import { CompanyService } from '../company/company.service';
import { CompanyModule } from '../company/company.module';
import { EmployeeModule } from '../employee/employee.module';
import { RoleModule } from '../role/role.module';
import { UsersModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { EmailModule } from '../email/email.module';
import { FileModule } from '../file/file.module';
import { EmployeeService } from '../employee/employee.service';
import { JobModule } from '../job/job.module';
import { TeamModule } from '../team/team.module';
import { InventoryModule } from '../inventory/inventory.module';
import { InventoryService } from '../inventory/inventory.service';
import { StockTakeModule } from '../stocktake/stocktake.module';
import { StockMovementsModule } from '../stockmovements/stockmovements.module';
import { InventoryUsedModule } from '../inventory-used/inventory-used.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    forwardRef(() => CompanyModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => RoleModule),
    forwardRef(() => UsersModule),
    forwardRef(() => EmailModule),
    forwardRef(() => FileModule),
    forwardRef(() => JobModule),
    forwardRef(() => TeamModule),
    forwardRef(() => InventoryModule),
    forwardRef(() => StockTakeModule),
    forwardRef(() => StockMovementsModule),
    forwardRef(() => InventoryUsedModule),
  ],
  controllers: [ClientController],
  providers: [
    ClientService,
    ClientRepository,
    CompanyService,
    JwtService,
    UsersService,
    EmployeeService,
    InventoryService,
  ],
  exports: [ClientService, ClientRepository, MongooseModule],
})
export class ClientModule {}
