import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { ClientModule } from './client/client.module';
import { JobModule } from './job/job.module';
import { EmployeeModule } from './employee/employee.module';
import { NotificationModule } from './notification/notification.module';
import { EmailModule } from './email/email.module';
import { FileModule } from './file/file.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`../.env`, `.env`], isGlobal: true }),
    MongooseModule.forRoot(`${process.env.SERVER_LOGIN}`),
    UsersModule,
    AuthModule,
    CompanyModule,
    ClientModule,
    JobModule,
    EmployeeModule,
    NotificationModule,
    EmailModule,
    FileModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
