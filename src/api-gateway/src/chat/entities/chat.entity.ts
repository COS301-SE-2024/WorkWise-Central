import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { currentDate } from '../../utils/Utils';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

@Schema()
export class Chat {
  @Prop({ type: String, required: true, default: randomStringGenerator() })
  name: string;

  @Prop({ type: String, required: false, default: '' })
  description: string = '';

  @Prop({
    type: String,
    required: true,
    default: 'https://img.icons8.com/?size=100&id=105326&format=png&color=000000',
  })
  image: string = 'https://img.icons8.com/?size=100&id=105326&format=png&color=000000';

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: false })
  admin: Types.ObjectId;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'User' }], required: true })
  participants: Types.ObjectId[];

  constructor(
    name: string,
    participants: Types.ObjectId[],
    admin?: Types.ObjectId,
    image?: string,
    description?: string,
  ) {
    this.name = name;
    this.participants = participants;
    if (admin) {
      this.admin = admin;
    }
    if (image) {
      this.image = image;
    }
    if (description) this.description = description;
    else {
      this.description = '';
    }
  }

  @Prop({ default: Date.now })
  createdAt: Date = currentDate();

  @Prop({ default: Date.now })
  updatedAt: Date = currentDate();
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
