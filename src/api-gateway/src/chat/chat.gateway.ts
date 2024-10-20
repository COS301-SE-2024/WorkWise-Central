import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { forwardRef, Inject, Logger, ValidationPipe } from '@nestjs/common';
import { AddMessageDto, DeleteMessageDto, GetUserIdDto, UpdateMessageDto } from './dto/add-message.dto';
//import * as console from 'node:console';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { CompanyService } from '../company/company.service';
import { UsersService } from '../users/users.service';
import { Types } from 'mongoose';
import { DeleteChatDto } from './dto/delete-chat.dto';
import { AddChatDto, AddMeDto, MarkChatAsReadDto, TypingDto, UpdateChatDto } from './dto/create-chat.dto';
//import { AsyncApiSub } from 'nestjs-asyncapi';

//TODO: Check JWT expiration
@WebSocketGateway({ cors: '*', namespace: 'chat-space' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,

    @Inject(forwardRef(() => ChatService))
    private readonly chatService: ChatService,
  ) {}
  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');

  handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.log(`Socket connected: ${client.id}`);
    client.emit('chat', 'Welcome to WorkWise Chat');
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }

  /*  @AsyncApiSub({
    channel: 'init-chat',
    message: {
      payload: GetUserIdDto,
    },
    summary: 'Get all your ChatIds',
    description: `Used in order to retrieve all chats linked to a user after you connect to the websocket server.`,
  })*/
  @SubscribeMessage('init-chat')
  async initChat(@ConnectedSocket() client: Socket, @MessageBody() payload: GetUserIdDto) {
    const decodedJwtAccessToken = this.jwtService.decode(payload.jwt);
    const allChatsWithUser = await this.chatService.getUserChats(decodedJwtAccessToken.sub);
    //console.log('All Chats with User', allChatsWithUser);
    const chatIds = [];
    for (const chat of allChatsWithUser) {
      chatIds.push(chat._id.toString());
    }
    client.join(chatIds);
    const chats = [];
    for (const chat of allChatsWithUser) {
      chats.push(await this.chatService.getChat(chat._id));
    }
    chats.sort((a, b) => b.updatedAt - a.updatedAt);
    client.emit('init-chat', { chatIds: chatIds, chats: chats });
    return { success: true };
  }

  @SubscribeMessage('new-message')
  async handleNewMessage(@ConnectedSocket() client: Socket, @MessageBody(new ValidationPipe()) payload: AddMessageDto) {
    console.log(payload);
    const userId = this.jwtService.decode(payload.jwt).sub;
    this.logger.log(`Message received: ${userId} - ${payload.textContent}\n${payload.attachments}`);
    const chat = await this.chatService.getChat(payload.chatId);
    if (!chat) {
      client.emit('new-message', { Error: 'Chat not found' });
      console.log('Error');
      return;
    }
    const result = await this.chatService.sendMessage(userId, payload);
    this.server.to(payload.chatId.toString()).emit('new-message', result);
    return { success: true };
  }

  @SubscribeMessage('new-chat')
  async handleNewChat(@ConnectedSocket() client: Socket, @MessageBody(new ValidationPipe()) payload: AddChatDto) {
    console.log(payload);
    const userId = this.jwtService.decode(payload.jwt).sub;
    this.logger.log(`Creating new chat: ${userId} - ${payload.chatName}\n${payload.chatDescription}`);
    const chat = await this.chatService.createChat(
      userId,
      payload.chatName,
      payload.participants,
      payload.chatDescription,
      payload.chatImage,
    );
    if (!chat) {
      client.emit('new-chat', { Error: 'Chat could not be created' });
      console.log('Error');
      return;
    }
    console.log({ chat: chat });
    this.server.emit('new-chat', { chat: chat });
  }

  @SubscribeMessage('add-me')
  async handleAddToChat(@ConnectedSocket() client: Socket, @MessageBody(new ValidationPipe()) payload: AddMeDto) {
    const userId = this.jwtService.decode(payload.jwt).sub;
    if (!userId) {
      client.emit('add-me', { Error: 'User not found' });
      console.log('Error');
      return;
    }
    client.join(payload.chatId.toString());
    console.log("You're in");
    return { success: true, message: "You're in" };
  }

  /*  @AsyncApiSub({
    channel: 'delete-message',
    message: {
      payload: DeleteMessageDto,
    },
    summary: 'Listen for removed messages in chats that are related to you as a user',
    description: `Used in order to receive  real-time updates from the chat gateway`,
  })*/
  @SubscribeMessage('delete-message')
  async handleDeleteMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody(new ValidationPipe()) payload: DeleteMessageDto,
  ) {
    const userId: Types.ObjectId = this.jwtService.decode(payload.jwt).sub;
    this.logger.log(`Message received: ${userId} - Delete Message: ${payload.messageId}`);
    const chat = await this.chatService.getChat(payload.chatId);
    if (!chat) {
      client.emit('delete-message', { Error: 'Chat not found' });
      //('Error');
      return;
    }
    await this.chatService.deleteMessage(userId, payload);
    this.server
      .to(payload.chatId.toString())
      .emit('delete-message', { success: true, chatId: payload.chatId, messageId: payload.messageId });
    return { success: true, chatId: payload.chatId, messageId: payload.messageId };
  }

  /*  @AsyncApiSub({
    channel: 'delete-chat',
    message: {
      payload: DeleteChatDto,
    },
    summary: 'Listen for chats being deleted or "closed"',
    description: `Used in order to receive real-time feedback on chats that are still open`,
  })*/
  @SubscribeMessage('delete-chat')
  async handleDeleteChat(@ConnectedSocket() client: Socket, @MessageBody(new ValidationPipe()) payload: DeleteChatDto) {
    const userId: Types.ObjectId = this.jwtService.decode(payload.jwt).sub;
    this.logger.log(`Message received: ${userId} - Delete Chat: ${payload.chatId}`);
    const chat = await this.chatService.getChat(payload.chatId);
    if (!chat) {
      client.emit('delete-chat', { Error: 'Chat not found' });
      console.log('Error');
      return;
    }
    const result = await this.chatService.deleteChat(userId, payload);
    this.server.to(payload.chatId.toString()).emit('delete-chat', result);
    return { success: true, chat: result };
  }

  /*  @AsyncApiSub({
    channel: 'update-message',
    message: {
      payload: UpdateMessageDto,
    },
    summary: 'Listen for messages being edited by others in your chats',
    description: `Used in order to receive real-time feedback on chats that you are in`,
  })*/
  @SubscribeMessage('update-message')
  async handleUpdateMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody(new ValidationPipe()) payload: UpdateMessageDto,
  ) {
    const userId: Types.ObjectId = this.jwtService.decode(payload.jwt).sub;
    this.logger.log(`Message received: ${userId} - Update Message: ${payload.messageId}`);
    const chat = await this.chatService.getChat(payload.chatId);
    if (!chat) {
      client.emit('update-message', { Error: 'Chat not found' });
      console.log('Error');
      return;
    }
    const result = await this.chatService.updateMessage(userId, payload);
    this.server.to(payload.chatId.toString()).emit('update-message', result);
  }

  @SubscribeMessage('update-chat')
  async handleUpdateChat(
    @ConnectedSocket() client: Socket,
    @MessageBody(/*new ValidationPipe()*/) payload: UpdateChatDto,
  ) {
    const userId: Types.ObjectId = this.jwtService.decode(payload.jwt).sub;
    const chat = await this.chatService.getChat(payload.chatId);
    if (!chat) {
      client.emit('update-chat', { Error: 'Chat not found' });
      console.log('Error');
      return;
    }
    const result = await this.chatService.updateChat(userId, payload);
    this.server.to(payload.chatId.toString()).emit('update-chat', result);
  }

  @SubscribeMessage('reading-chat')
  async markChatAsRead(
    @ConnectedSocket() client: Socket,
    @MessageBody(new ValidationPipe()) payload: MarkChatAsReadDto,
  ) {
    const userId: Types.ObjectId = this.jwtService.decode(payload.jwt).sub;
    const chat = await this.chatService.getChat(payload.chatId);
    if (!chat) {
      client.emit('update-chat', { Error: 'Chat not found' });
      return;
    }
    this.chatService.markMessagesAsRead(userId, payload.chatId);
  }

  @SubscribeMessage('typing')
  async userTyping(@ConnectedSocket() client: Socket, @MessageBody(new ValidationPipe()) payload: TypingDto) {
    const userId: Types.ObjectId = this.jwtService.decode(payload.jwt).sub;
    const chat = await this.chatService.getChat(payload.chatId);
    const user = await this.userService.getUserById(userId);
    if (!chat || !user) {
      client.emit('update-chat', { Error: 'Chat not found' });
      return;
    }
    this.server
      .to(payload.chatId.toString())
      .emit('typing', { chatId: payload.chatId, name: user.profile.displayName, userId: userId });
  }

  @SubscribeMessage('unread-messages')
  async getUnreadMessages(
    @ConnectedSocket() client: Socket,
    @MessageBody(new ValidationPipe()) payload: MarkChatAsReadDto,
  ) {
    const userId: Types.ObjectId = this.jwtService.decode(payload.jwt).sub;
    const chat = await this.chatService.getChat(payload.chatId);
    if (!chat) {
      client.emit('update-chat', { Error: 'Quantity could not be retrieved' });
      return;
    }
    client.emit('unread-messages', { data: await this.chatService.getUnreadMessageCounts(userId) });
  }
}
