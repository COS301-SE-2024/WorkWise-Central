import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserConfirmation {
  @Prop({ required: true, type: String })
  name: string;
  @Prop({ required: true, type: String })
  surname: string;
  @Prop({ required: true, type: String })
  email: string;
  @Prop({ required: true, type: Date, default: new Date() })
  createdAt?: Date = new Date();
  @Prop({ required: true, type: String })
  key: string;
}

export const UserConfirmationSchema =
  SchemaFactory.createForClass(UserConfirmation);
