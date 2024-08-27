import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { currentDate } from '../../utils/Utils';

@Schema()
export class Chat extends Document {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  participants: Types.ObjectId[];

  constructor(participants: Types.ObjectId[]) {
    super();
    this.participants = participants;
  }

  @Prop({ default: Date.now })
  createdAt: Date = currentDate();

  @Prop({ default: Date.now })
  updatedAt: Date = currentDate();
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
