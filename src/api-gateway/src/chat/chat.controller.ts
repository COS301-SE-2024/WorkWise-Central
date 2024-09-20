import {
  Body,
  Controller,
  forwardRef,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { AddUsersToChatDto, CreateChatDto } from './dto/create-chat.dto';
import { extractUserId } from '../utils/Utils';
import { Types } from 'mongoose';
import { RemoveUserFromChatDto } from './dto/remove-user-from-chat.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileAttachmentsDto } from '../shared/dtos/file-attachments.dto';
import { FileService } from '../file/file.service';

const className = 'Chat';
@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => FileService))
    private readonly fileService: FileService,
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
      return {
        data: await this.chatService.createChat(
          userId,
          createChatDto.chatName,
          createChatDto.participants,
          createChatDto.chatImage,
        ),
      };
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

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Add an attachment to a ${className}, (the key needed in in your form-data is "files")`,
    description: 'Max of 20 files at a time',
  })
  @ApiOkResponse({
    type: FileAttachmentsDto,
    description: `An array of links to the files you uploaded`,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 20 }]))
  @Put('/add/attachments/')
  async addAttachments(@Headers() headers: any, @UploadedFiles() files: { files?: Express.Multer.File[] }) {
    console.log(files);
    try {
      const userId = extractUserId(this.jwtService, headers);
      //console.log(userId);
      return {
        data: await this.fileService.saveAttachments(files.files),
      };
    } catch (e) {
      throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
