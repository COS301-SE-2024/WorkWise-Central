import { Body, Controller, Get, Headers, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { AddUsersToChatDto, CreateChatDto } from './dto/create-chat.dto';
import { extractUserId } from '../utils/Utils';
import { Types } from 'mongoose';
import { RemoveUserFromChatDto } from './dto/remove-user-from-chat.dto';
import { SendMessageDto } from './dto/send-message.dto';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  lookAtDocumentation() {
    return { message: 'Refer to /documentation for details on the API' };
  }

  @Post('create')
  async create(@Headers() headers: any, @Body() createChatDto: CreateChatDto) {
    try {
      console.log(headers);
      const userId = extractUserId(this.jwtService, headers);
      return { data: await this.chatService.createChat(userId, createChatDto.chatName, createChatDto.participants) };
    } catch (Error) {
      throw Error;
    }
  }

  @Put('add-users')
  async addUsersToChat(@Headers() headers: any, @Body() addUsersToChatDto: AddUsersToChatDto) {
    try {
      const userId = extractUserId(this.jwtService, headers);
      return { data: await this.chatService.addUsersToChat(userId, addUsersToChatDto) };
    } catch (Error) {
      throw Error;
    }
  }

  // An endpoint to get all chats for a user
  @UseGuards(AuthGuard)
  @Get('user-chats')
  async getUserChats(@Headers() headers: any) {
    try {
      const userId = extractUserId(this.jwtService, headers);
      return { data: await this.chatService.getUserChats(userId) };
    } catch (Error) {
      throw Error;
    }
  }

  //An endpoint get All messages in a chat
  @UseGuards(AuthGuard)
  @Get('chat-messages/:chatId')
  async getMessagesInChat(@Headers() headers: any, @Param('chatId') chatId: Types.ObjectId) {
    try {
      const userId = extractUserId(this.jwtService, headers);
      return { data: await this.chatService.getMessagesInChat(userId, chatId) };
    } catch (Error) {
      throw Error;
    }
  }

  // An endpoint to remove a user from a chat
  @UseGuards(AuthGuard)
  @Put('remove-user')
  async removeUserFromChat(@Headers() headers: any, @Body() body: RemoveUserFromChatDto) {
    try {
      const userId = extractUserId(this.jwtService, headers);
      return { data: await this.chatService.removeUserFromChatHttp(userId, body.chatId, body.userIdToRemove) };
    } catch (Error) {
      throw Error;
    }
  }

  // TODO: An endpoint to get the number of unread message in a chat

  /// Endpoint to send a message (for testing purposes)
  @UseGuards(AuthGuard)
  @Post('send-message')
  async sendMessage(@Headers() headers: any, @Body() body: SendMessageDto) {
    try {
      const userId = extractUserId(this.jwtService, headers);
      console.log(body);
      return { data: await this.chatService.sendMessageHttp(userId, body) };
    } catch (Error) {
      throw Error;
    }
  }
}
