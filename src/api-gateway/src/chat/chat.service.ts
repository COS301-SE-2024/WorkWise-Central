import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chat } from './entities/chat.entity';
import { ChatMessage } from './entities/chat-message.entity';
import { AddMessageDto, DeleteMessageDto, UpdateMessageDto } from './dto/add-message.dto';
import { currentDate } from '../utils/Utils';
import { NotificationService } from '../notification/notification.service';
import { Message } from '../notification/entities/notification.entity';
import { UsersService } from '../users/users.service';
import { AddUsersToChatDto } from './dto/create-chat.dto';
import { DeleteChatDto } from './dto/delete-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Chat') private readonly chatModel: Model<Chat>,
    @InjectModel('ChatMessage') private readonly chatMessageModel: Model<ChatMessage>,

    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationService,

    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  // Create a new chat
  async createChat(userId: Types.ObjectId, participants: Types.ObjectId[]) {
    const chat = new Chat(participants);
    const newChat = new this.chatModel(chat);
    return (await newChat.save()).toObject();
  }

  // Send a message in a chat
  async sendMessage(userId: Types.ObjectId, addMessageDto: AddMessageDto) {
    const chatMessage = new ChatMessage(addMessageDto.chatId, userId, addMessageDto.body);
    const newMessage = new this.chatMessageModel(chatMessage);
    const result = (await newMessage.save()).toObject();
    this.updateChat(result);
    return result;
  }

  private updateChat(newMessage: ChatMessage & Required<{ _id: Types.ObjectId }>) {
    this.chatModel.updateOne(
      { _id: newMessage.chatId },
      {
        updatedAt: currentDate(),
      },
    );
  }

  // Get all messages in a chat
  async getMessagesInChat(chatId: Types.ObjectId) {
    return this.chatMessageModel
      .find({ _id: chatId })
      .populate('userId', 'userId')
      .sort({ createdAt: 1 })
      .lean()
      .exec();
  }

  // Get all chats for a user
  async getUserChats(userId: Types.ObjectId) {
    return this.chatModel.find({ participants: userId }).sort({ updatedAt: 1 }).lean().exec();
  }

  // Add a user to a chat
  async addUserToChat(chatId: Types.ObjectId, userId: Types.ObjectId) {
    return this.chatModel
      .findByIdAndUpdate(chatId, { $addToSet: { participants: userId } }, { new: true })
      .lean()
      .exec();
  }

  // Add users to a chat
  async addUsersToChat(userId: Types.ObjectId, addUsersDto: AddUsersToChatDto) {
    const user = await this.userService.getUserById(userId);
    const chat = await this.chatModel.findById(addUsersDto.chatId).exec();
    for (const userId of addUsersDto.userIds) {
      const found = chat.participants.some((p) => p.toString() === userId.toString());
      if (!found) chat.participants.push(userId);
      else {
        addUsersDto.userIds = addUsersDto.userIds.filter((i) => i.toString() !== userId.toString());
      }
    }
    const message = new Message(
      'You were added to a new chat',
      `${user.personalInfo.firstName} ${user.personalInfo.surname} added you to a new chat`,
    );
    this.notificationService.create({ recipientIds: addUsersDto.userIds, message: message, isJobRelated: false });
    return chat;
  }

  // Remove a user from a chat
  async removeUserFromChat(chatId: Types.ObjectId, userId: Types.ObjectId) {
    return this.chatModel
      .findByIdAndUpdate(chatId, { $pull: { participants: userId } }, { new: true })
      .lean()
      .exec();
  }

  // Delete a chat
  async deleteChat(userId: Types.ObjectId, deleteChatDto: DeleteChatDto) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new NotFoundException();
    await this.chatMessageModel.deleteMany({ chatId: deleteChatDto.chatId }).exec(); //Delete messages within chat
    return this.chatModel.findByIdAndDelete(deleteChatDto.chatId).exec();
  }

  // Get a chat
  async getChat(chatId: Types.ObjectId) {
    return this.chatModel.findOne({ _id: chatId }).lean().exec();
  }

  // Mark a message as read
  async markMessageAsRead(messageId: Types.ObjectId) {
    return this.chatMessageModel
      .findByIdAndUpdate(messageId, { $set: { isRead: true } }, { new: true })
      .lean()
      .exec();
  }

  // Get unread messages count for a user
  async getUnreadMessagesCount(userId: Types.ObjectId): Promise<number> {
    const chats = await this.getUserChats(userId);
    const chatIds = chats.map((chat) => chat._id);
    return this.chatMessageModel
      .countDocuments({
        $and: [{ chatId: { $in: chatIds } }, { userId: { $ne: userId } }, { isRead: false }],
      })
      .exec();
  }

  async deleteMessage(userId: Types.ObjectId, payload: DeleteMessageDto) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new NotFoundException();
    this.chatMessageModel.deleteOne({ $and: [{ chatId: payload.chatId }, { _id: payload.messageId }] });
  }

  async updateMessage(userId: Types.ObjectId, payload: UpdateMessageDto) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new NotFoundException();
    const message = await this.chatMessageModel
      .findOne({ $and: [{ chatId: payload.chatId }, { _id: payload.messageId }] })
      .exec();
    if (payload.body) {
      message.textContent = payload.body;
      message.markModified('textContent');
    }
    if (payload.attachments) {
      message.attachments = payload.attachments;
      message.markModified('attachments');
    }
    return (await message.save()).toObject();
  }
}
