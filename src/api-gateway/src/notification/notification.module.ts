import { forwardRef, Global, Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './entities/notification.entity';
import { EmailModule } from '../email/email.module';
import { NotificationController } from './notification.controller';
import { NotificationRepository } from './notification.repository';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { EmployeeModule } from '../employee/employee.module';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { EmployeeService } from '../employee/employee.service';
import { FileModule } from '../file/file.module';
import { RoleModule } from '../role/role.module';
import { JobModule } from '../job/job.module';
import { TeamModule } from '../team/team.module';
import { FcmNotificationService } from './fcm-notification.service';
import { ClientService } from '../client/client.service';
import { ClientModule } from '../client/client.module';
import { InventoryService } from '../inventory/inventory.service';
import { InventoryModule } from '../inventory/inventory.module';
import { ClientRepository } from '../client/client.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    EmailModule,
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => FileModule),
    forwardRef(() => RoleModule),
    forwardRef(() => JobModule),
    forwardRef(() => TeamModule),
    forwardRef(() => ClientModule),
    forwardRef(() => InventoryModule),
  ],
  providers: [
    NotificationGateway,
    NotificationService,
    NotificationRepository,
    UsersService,
    CompanyService,
    EmployeeService,
    FcmNotificationService,
    ClientService,
    InventoryService,
    ClientRepository,
  ],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
