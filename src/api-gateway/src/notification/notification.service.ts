import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import * as console from 'node:console';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService implements OnModuleInit {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<Notification>,
  ) {}

  onModuleInit() {
    this.watchDatabase();
  }

  create(createNotificationDto: CreateNotificationDto) {
    console.log(createNotificationDto);
    return 'This action adds a new notification';
  }

  watchDatabase() {
    this.notificationModel.watch().on('change', (change) => {
      console.log(change);
    });
  }

  async createNotificationsFromUser(newNotification: CreateNotificationDto) {
    const listOfNotifications: Notification[] = [];
    const senderId = newNotification.senderId;
    const message = newNotification.message;
    for (const recipient of newNotification.recipientIds) {
      const singularNotification = new Notification(
        senderId,
        recipient,
        message,
      );
      listOfNotifications.push(singularNotification);
    }
    const result = await this.notificationModel.create(listOfNotifications);
    console.log(result);
    return {
      data: 'success',
    };
  }
}
