import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { currentDate } from '../../utils/Utils';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

@Schema()
export class Chat {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  _id: Types.ObjectId = new Types.ObjectId();

  @Prop({ type: String, required: true, default: randomStringGenerator() })
  name: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: false })
  admin: Types.ObjectId;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'User' }], required: true })
  participants: Types.ObjectId[];

  constructor(name: string, participants: Types.ObjectId[], admin?: Types.ObjectId) {
    this.name = name;
    this.participants = participants;
    this.admin = admin;
  }

  @Prop({ default: Date.now })
  createdAt: Date = currentDate();

  @Prop({ default: Date.now })
  updatedAt: Date = currentDate();
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
