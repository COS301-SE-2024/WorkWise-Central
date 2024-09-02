import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { currentDate } from '../../utils/Utils';

@Schema()
export class Chat {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  _id: Types.ObjectId = new Types.ObjectId();

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  participants: Types.ObjectId[];

  constructor(participants: Types.ObjectId[]) {
    this.participants = participants;
  }

  @Prop({ default: Date.now })
  createdAt: Date = currentDate();

  @Prop({ default: Date.now })
  updatedAt: Date = currentDate();
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
