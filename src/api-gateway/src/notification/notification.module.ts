import { Global, Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Notification,
  NotificationSchema,
} from './entities/notification.entity';
import { EmailModule } from '../email/email.module';
import { NotificationController } from './notification.controller';
import { NotificationRepository } from './notification.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    EmailModule,
  ],
  providers: [NotificationGateway, NotificationService, NotificationRepository],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
