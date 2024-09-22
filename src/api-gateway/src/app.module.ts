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
import { AdminModule } from './admin/admin.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StockTakeModule } from './stocktake/stocktake.module';
import { ChatModule } from './chat/chat.module';
import { TimeTrackerModule } from './time-tracker/time-tracker.module';
import { StockMovementsModule } from './stockmovements/stockmovements.module';
import { InvoiceModule } from './invoices/invoice.module';
import { PayfastModule } from 'src/payfast/payfast.module';
import { FleetModule } from './fleet/fleet.module';

const rootPath = join(__dirname, '..', '../../uploads');

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ envFilePath: [`../.env`, `.env`], isGlobal: true }),
    MongooseModule.forRoot(`${process.env.SERVER_LOGIN}`),
    UsersModule,
    AuthModule,
    CompanyModule,
    ClientModule,
    JobModule,
    EmployeeModule,
    StockTakeModule,
    NotificationModule,
    EmailModule,
    FileModule,
    InventoryModule,
    InvoiceModule,
    AdminModule,
    ServeStaticModule.forRoot({
      rootPath: rootPath,
    }),
    ChatModule,
    TimeTrackerModule,
    StockMovementsModule,
    PayfastModule,
    FleetModule,
  ],
})
export class AppModule {}
