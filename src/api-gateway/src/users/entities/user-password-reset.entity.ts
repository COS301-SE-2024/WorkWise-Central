import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { currentDate } from '../../utils/Utils';

@Schema()
export class UserPasswordReset {
  @Prop({ required: true, type: String })
  email: string;
  @Prop({ required: true, type: String })
  token: string;
  @Prop({ required: true, type: Date, default: currentDate() })
  createdAt?: Date = currentDate();
}
export const UserPasswordResetSchema = SchemaFactory.createForClass(UserPasswordReset);
