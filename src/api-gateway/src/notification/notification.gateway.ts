import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import {
  CreateAccountDto,
  CreateNotificationDto,
} from './dto/create-notification.dto';
import { Server, Socket } from 'socket.io';
import { EmailService } from '../email/email.service';
import { isEmail } from 'class-validator';

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
    @ConnectedSocket() client: Socket,
  ) {
    if (!isEmail(createAccountDto.email)) {
      client.emit('response');
      return 'Bruh, no email';
    }
    console.log(createAccountDto);
    client.join(createAccountDto.email);
    await this.emailService.sendEmailConfirmation(createAccountDto, 'random');
    return 'Welcome message sent';
  }

  @SubscribeMessage('createNotification')
  create(@MessageBody() createNotificationDto: CreateNotificationDto) {
    console.log('Hello world');
    console.log(createNotificationDto);
    return this.notificationService.create(createNotificationDto);
  }

  @SubscribeMessage('findAllNotification')
  findAll(@MessageBody() jwt: any) {
    console.log(jwt);

    return this.notificationService.findAll();
  }

  @SubscribeMessage('findOneNotification')
  findOne(@MessageBody() id: number) {
    return this.notificationService.findOne(id);
  }
}
