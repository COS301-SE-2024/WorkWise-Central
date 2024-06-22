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
