import { Body, Controller, Get, Headers, Post, Put, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { AddUsersToChatDto, CreateChatDto } from './dto/create-chat.dto';
import { extractUserId } from '../utils/Utils';

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
      return { data: await this.chatService.createChat(userId, createChatDto.participants) };
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
}
