import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Notification {
  @Prop({ type: Types.ObjectId, required: false })
  sourceId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  message: string;

  @Prop({ type: Boolean, required: true, default: false })
  isRead: boolean;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
