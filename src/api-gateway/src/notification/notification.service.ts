import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  create(createNotificationDto: CreateNotificationDto) {
    console.log(createNotificationDto);
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }
}
