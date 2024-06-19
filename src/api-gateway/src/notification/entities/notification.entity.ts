import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Employee } from '../../employee/entities/employee.entity';

@Schema()
export class Notification {
  constructor(
    senderId: Types.ObjectId,
    recipientId: Types.ObjectId,
    message: string,
  ) {
    this.senderId = senderId;
    this.recipientId = recipientId;
    this.message = message;
  }

  @Prop({ type: Types.ObjectId, required: false, ref: Employee.name })
  senderId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: Employee.name })
  recipientId: Types.ObjectId;

  @Prop({ type: String, required: true })
  message: string;

  @Prop({ type: Boolean, required: true, default: false })
  isRead: boolean = false;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
