import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chat } from './entities/chat.entity';
import { ChatMessage } from './entities/chat-message.entity';
import { AddMessageDto } from './dto/add-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Chat') private readonly chatModel: Model<Chat>,
    @InjectModel('ChatMessage') private readonly chatMessageModel: Model<ChatMessage>,
  ) {}

  // Create a new chat
  async createChat(participants: Types.ObjectId[]): Promise<Chat> {
    const chat = new Chat(participants);
    const newChat = new this.chatModel(chat);
    return newChat.save();
  }

  // Send a message in a chat
  async sendMessage(
    userId: Types.ObjectId,
    chatId: Types.ObjectId,
    addMessageDto: AddMessageDto,
  ): Promise<ChatMessage> {
    const chatMessage = new ChatMessage(chatId, userId, addMessageDto.body);
    const newMessage = new this.chatMessageModel(chatMessage);
    return newMessage.save();
  }

  // Get all messages in a chat
  async getMessages(chatId: Types.ObjectId): Promise<ChatMessage[]> {
    return this.chatMessageModel.find({ chatId: chatId }).populate('userId', 'username').sort({ createdAt: 1 }).exec();
  }

  // Get all chats for a user
  async getUserChats(userId: Types.ObjectId): Promise<Chat[]> {
    return this.chatModel.find({ participants: userId }).sort().exec();
  }

  // Add a user to a chat
  async addUserToChat(chatId: Types.ObjectId, userId: Types.ObjectId): Promise<Chat> {
    return this.chatModel.findByIdAndUpdate(chatId, { $addToSet: { participants: userId } }, { new: true }).exec();
  }

  // Remove a user from a chat
  async removeUserFromChat(chatId: string, userId: string): Promise<Chat> {
    return this.chatModel.findByIdAndUpdate(chatId, { $pull: { participants: userId } }, { new: true }).exec();
  }

  // Delete a chat
  async deleteChat(chatId: string): Promise<Chat> {
    await this.chatMessageModel.deleteMany({ chatId }).exec();
    return this.chatModel.findByIdAndDelete(chatId).exec();
  }

  // Mark a message as read
  async markMessageAsRead(messageId: Types.ObjectId): Promise<ChatMessage> {
    return this.chatMessageModel.findByIdAndUpdate(messageId, { $set: { isRead: true } }, { new: true }).exec();
  }

  // Get unread messages count for a user
  async getUnreadMessagesCount(userId: Types.ObjectId): Promise<number> {
    const chats = await this.getUserChats(userId);
    const chatIds = chats.map((chat) => chat._id);
    return this.chatMessageModel
      .countDocuments({
        chatId: { $in: chatIds },
        userId: { $ne: userId },
        read: false,
      })
      .exec();
  }
}
