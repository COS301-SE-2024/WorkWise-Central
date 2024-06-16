import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Notification,
  NotificationSchema,
} from './entities/notification.entity';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    EmailModule,
  ],
  providers: [NotificationGateway, NotificationService],
})
export class NotificationModule {}
