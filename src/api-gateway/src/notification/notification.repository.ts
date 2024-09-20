import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Notification } from './entities/notification.entity';
import { Model, Types } from 'mongoose';
import { NotificationToken } from './entities/notificationToken.entity';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,

    @InjectModel(NotificationToken.name)
    private notificationTokenModel: Model<NotificationToken>,
  ) {}

  async save(notification: Notification) {
    const notificationModel = new this.notificationModel(notification);
    return await notificationModel.save();
  }

  async findAllWithRecipientId(id: Types.ObjectId): Promise<Notification[]> {
    return await this.notificationModel.find({ recipientId: id }).lean().exec();
  }

  /*  async findAllWithUserId(id: Types.ObjectId): Promise<Notification[]> {
    return this.notificationModel.find({ recipientId: id }).exec();
  }*/

  async findOne(id: Types.ObjectId): Promise<Notification[]> {
    return this.notificationModel.find({ _id: id }).exec();
  }

  async saveToken(token: NotificationToken) {
    const tokenModel = new this.notificationTokenModel(token);
    return await tokenModel.save();
  }

  // async acceptPushNotification(userId: Types.ObjectId, token: string) {
  //   // const token = await
  // }

  async stopPushNotificationsOnDevice(userId: Types.ObjectId, deviceType: string) {
    const result = await this.notificationTokenModel
      .findOneAndUpdate(
        { $and: [{ userId: userId }, { deviceType: deviceType }] },
        {
          $set: { status: 'INACTIVE' },
        },
        { new: true },
      )
      .exec();
    console.log(result);
    return result;
  }

  async findAllTokensForUser(userId: Types.ObjectId) {
    const result = await this.notificationTokenModel.find({ userId: userId }).lean().exec();
    console.log('User Tokens: ', result);
    return result;
  }

  markAsRead(notificationId: Types.ObjectId) {
    return this.notificationModel.updateOne({ _id: notificationId }, { isRead: true }).lean().exec();
  }

  markAsUnread(notificationId: Types.ObjectId) {
    return this.notificationModel.updateOne({ _id: notificationId }, { isRead: false }).lean().exec();
  }
}
