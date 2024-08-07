import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import { CreateAccountDto, CreateNotificationDto } from './dto/create-notification.dto';
import { Server } from 'socket.io';
import { EmailService } from '../email/email.service';
import { ConflictException } from '@nestjs/common';

@WebSocketGateway()
export class NotificationGateway {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly emailService: EmailService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createAccount')
  async createAccount(
    //Not very secure
    @MessageBody() createAccountDto: CreateAccountDto,
    // @ConnectedSocket() client: Socket,
  ) {
    await this.emailService.sendEmailConfirmation(createAccountDto, 'random');
    return 'Welcome message sent';
  }

  @SubscribeMessage('sendNotification')
  async newNoticationCreated(
    @MessageBody()
    createNotificationDto: CreateNotificationDto,
  ) {
    if (!createNotificationDto) {
      return new ConflictException('Message body is Empty');
    }
    console.log(createNotificationDto);
    const result = await this.notificationService.createNotificationsFromUser(createNotificationDto);
    this.server.emit('newNotification');
    return result;
  }

  /*  @SubscribeMessage('createNotification')
  create(@MessageBody() createNotificationDto: CreateNotificationDto) {
    console.log('Hello world');
    console.log(createNotificationDto);
    return this.notificationService.create(createNotificationDto);
  }*/
}
