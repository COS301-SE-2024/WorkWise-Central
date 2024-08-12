import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { currentDate } from '../../utils/Utils';

@Schema()
export class UserConfirmation {
  @Prop({ required: true, type: String })
  name: string;
  @Prop({ required: true, type: String })
  surname: string;
  @Prop({ required: true, type: String })
  email: string;
  @Prop({ required: true, type: Date, default: currentDate() })
  createdAt?: Date = currentDate();
  @Prop({ required: true, type: String })
  key: string;
}

export const UserConfirmationSchema = SchemaFactory.createForClass(UserConfirmation);
