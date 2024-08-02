import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Notification } from './entities/notification.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
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
    return this.notificationModel.find({ id: id }).exec();
  }
}
