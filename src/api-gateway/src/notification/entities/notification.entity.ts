import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

export class Message {
  constructor(title: string, body: string, data?: any, token?: string) {
    this.title = title;
    this.body = body;
    if (data) this.data = data;
    if (token) this.token = token;
  }

  @Prop({ type: String, required: true, default: '' })
  token?: string = '';
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: String, required: true })
  body: string;
  @Prop({ type: String, required: false })
  data?: any;
}

@Schema()
export class Notification {
  constructor(senderId: Types.ObjectId, recipientId: Types.ObjectId, message: Message) {
    this.senderId = senderId;
    this.recipientId = recipientId;
    this.message = message;
  }

  @Prop({
    type: SchemaTypes.ObjectId,
    required: false /*, ref: Employee.name */,
  })
  senderId?: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, required: true /*, ref: Employee.name*/ })
  recipientId: Types.ObjectId;

  @Prop({ type: Message, required: true })
  message: Message;

  @Prop({ type: Boolean, required: true, default: false })
  isRead: boolean = false;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
