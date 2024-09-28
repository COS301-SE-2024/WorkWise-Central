import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { currentDate } from '../../utils/Utils';

@Schema()
export class NotificationToken {
  constructor(userId: Types.ObjectId, tokenString: string, deviceType?: string) {
    this.userId = userId;
    this.tokenString = tokenString;
    if (deviceType) this.deviceType = deviceType;
  }

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: User.name,
  })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  tokenString: string;

  @Prop({ type: String, required: true, default: 'unknown' })
  deviceType: string = 'unknown';

  @Prop({ type: String, required: true, default: 'ACTIVE' })
  status: string = 'ACTIVE';

  @Prop({ type: Date, default: currentDate() })
  createdAt: Date = currentDate();
}

export const NotificationTokenSchema = SchemaFactory.createForClass(NotificationToken);
