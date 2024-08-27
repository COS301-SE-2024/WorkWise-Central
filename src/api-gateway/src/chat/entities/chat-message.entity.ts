import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Chat } from './chat.entity';
import { currentDate } from '../../utils/Utils';

@Schema()
export class ChatMessage extends Document {
  constructor(chatId: Types.ObjectId, userId: Types.ObjectId, textContent: string, attachments?: string[]) {
    super();
    this.chatId = chatId;
    this.userId = userId;
    this.textContent = textContent;
    if (attachments) this.attachments = attachments;
  }
  @Prop({ type: Types.ObjectId, ref: Chat.name, required: true })
  chatId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  textContent: string;

  @Prop({ type: Boolean, required: true, default: false })
  isRead: boolean = false;

  @Prop({ type: String, required: false, default: [] })
  attachments?: string[] = [];

  @Prop({ default: Date.now })
  createdAt: Date = currentDate();
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
