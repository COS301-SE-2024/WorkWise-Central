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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    forwardRef(() => CompanyModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => RoleModule),
  ],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository, CompanyService],
  exports: [ClientService, MongooseModule],
})
export class ClientModule {}
