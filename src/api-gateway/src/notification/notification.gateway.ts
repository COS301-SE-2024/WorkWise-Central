import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Server } from 'socket.io';
@WebSocketGateway()
export class NotificationGateway {
  constructor(private readonly notificationService: NotificationService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createAccount')
  createAccount(@MessageBody() createNotificationDto: CreateNotificationDto) {
    console.log('Hello world');
    console.log(createNotificationDto);
    return this.notificationService.create(createNotificationDto);
  }

  @SubscribeMessage('createNotification')
  create(@MessageBody() createNotificationDto: CreateNotificationDto) {
    console.log('Hello world');
    console.log(createNotificationDto);
    return this.notificationService.create(createNotificationDto);
  }

  @SubscribeMessage('findAllNotification')
  findAll() {
    return this.notificationService.findAll();
  }

  @SubscribeMessage('findOneNotification')
  findOne(@MessageBody() id: number) {
    return this.notificationService.findOne(id);
  }

  @SubscribeMessage('updateNotification')
  update(@MessageBody() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.update(
      updateNotificationDto.id,
      updateNotificationDto,
    );
  }

  @SubscribeMessage('removeNotification')
  remove(@MessageBody() id: number) {
    return this.notificationService.remove(id);
  }
}
