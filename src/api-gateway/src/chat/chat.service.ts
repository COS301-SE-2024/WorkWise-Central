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
import { AddUsersToChatDto, UpdateChatDto } from './dto/create-chat.dto';
import { DeleteChatDto } from './dto/delete-chat.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { SendMessageDto } from './dto/send-message.dto';

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
  async createChat(userId: Types.ObjectId, chatName: string, participants: Types.ObjectId[], chatImage?: string) {
    const creator: Types.ObjectId = userId;
    participants = [...new Set(participants)];
    if (chatName.length == 0) chatName = randomStringGenerator();
    const imgUrl = chatImage ? chatImage : 'https://img.icons8.com/?size=100&id=105326&format=png&color=000000';
    const chat = new Chat(chatName, participants, creator, imgUrl);
    const newChat = new this.chatModel(chat);
    return (await (await newChat.save()).populate('participants')).toObject();
  }

  // Send a message in a chat
  async sendMessage(userId: Types.ObjectId, addMessageDto: AddMessageDto) {
    const chatMessage = new ChatMessage(
      addMessageDto.chatId,
      userId,
      addMessageDto.textContent,
      addMessageDto.attachments,
    );
    const newMessage = new this.chatMessageModel(chatMessage);
    const result = await newMessage.save();
    this.updateChatB(await result.populate('userId'));
    return result;
  }

  async sendMessageHttp(userId: Types.ObjectId, body: SendMessageDto) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new NotFoundException();

    const message = new this.chatMessageModel({
      chatId: body.chatId,
      userId: userId,
      textContent: body.textContent,
      attachments: body.attachments,
      isRead: false,
    });

    return (await message.save()).toObject();
  }

  private updateChatB(newMessage: ChatMessage & Required<{ _id: Types.ObjectId }>) {
    this.chatModel.updateOne(
      { _id: newMessage.chatId },
      {
        updatedAt: currentDate(),
      },
    );
  }

  // Get all messages in a chat
  async getMessagesInChat(userId: Types.ObjectId, chatId: Types.ObjectId) {
    return this.chatMessageModel
      .find({ chatId: chatId })
      .populate('userId', 'userId')
      .sort({ createdAt: 1 })
      .lean()
      .exec();
  }

  // Get all chats for a user
  async getUserChats(userId: Types.ObjectId) {
    return this.chatModel.find({ participants: userId }).sort({ updatedAt: -1 }).populate('participants').lean().exec();
  }

  // Add a user to a chat
  async addUserToChat(chatId: Types.ObjectId, userId: Types.ObjectId) {
    return this.chatModel
      .findByIdAndUpdate(chatId, { $addToSet: { participants: userId } }, { new: true })
      .lean()
      .populate('participants')
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
    //TODO: Check if user is the creator of the chat`
    return this.chatModel
      .findByIdAndUpdate(chatId, { $pull: { participants: userId } }, { new: true })
      .lean()
      .exec();
  }

  async removeUserFromChatHttp(userId: Types.ObjectId, chatId: Types.ObjectId, userIdToRemove: Types.ObjectId) {
    return this.chatModel
      .findByIdAndUpdate(chatId, { $pull: { participants: userIdToRemove } }, { new: true })
      .lean()
      .populate('participants')
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
    return this.chatModel.findOne({ _id: chatId }).populate('participants').lean().exec();
  }

  // Update a chat
  async updateChat(userId: Types.ObjectId, payload: UpdateChatDto) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new NotFoundException();

    const chat = await this.chatModel.findById(payload.chatId).exec();
    if (!chat) throw new NotFoundException('Chat not found');

    if (payload.name) {
      chat.name = payload.name;
      chat.markModified('name');
    }

    if (payload.description) {
      chat.description = payload.description;
      chat.markModified('description');
    }
    if (payload.admin) {
      chat.admin = payload.admin;
      chat.markModified('admin');
    }
    if (payload.participants) {
      payload.participants = [...new Set(payload.participants)];
      chat.participants = payload.participants;
      chat.markModified('participants');
    }

    if (payload.image) {
      chat.image = payload.image;
      chat.markModified('image');
    }
    chat.updatedAt = currentDate();
    chat.markModified('updatedAt');

    return (await chat.save()).toObject();
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

  // Get unread messages count for a chatId TODO
  /*  async getUnreadMessagesCountForChat(userId: Types.ObjectId, chatId: Types.ObjectId): Promise<number> {
    return this.chatMessageModel
      .countDocuments({
        $and: [{ chatId: chatId }, { userId: { $ne: userId } }, { isRead: false }],
      })
      .exec();
  }*/

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
    return (await (await message.save()).populate('userId')).toObject();
  }

  async markMessagesAsRead(userId: Types.ObjectId, chatId: Types.ObjectId): Promise<void> {
    const currentTime = new Date();

    await this.chatMessageModel.updateMany(
      {
        chatId: chatId,
        createdAt: { $lte: currentTime },
        usersWhoHaveReadMessage: { $ne: userId },
      },
      {
        $addToSet: { usersWhoHaveReadMessage: userId },
      },
      {
        sort: { createdAt: -1 },
        multi: true,
      },
    );
  }

  async getUnreadMessageCounts(
    userId: Types.ObjectId,
  ): Promise<Array<{ chatId: Types.ObjectId; unreadCount: number }>> {
    const userChats = await this.chatModel.find({ participants: userId }, '_id').lean();

    const unreadCounts = await this.chatMessageModel.aggregate([
      {
        $match: {
          chatId: { $in: userChats.map((chat) => chat._id) },
          usersWhoHaveReadMessage: { $ne: userId },
        },
      },
      {
        $group: {
          _id: '$chatId',
          unreadCount: { $sum: 1 },
        },
      },
    ]);

    return unreadCounts.map((count) => ({
      chatId: count._id,
      unreadCount: count.unreadCount,
    }));
  }
}
