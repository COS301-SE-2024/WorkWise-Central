import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message, Notification } from './entities/notification.entity';
import { NotificationRepository } from './notification.repository';
import { EmployeeService } from '../employee/employee.service';
import { CompanyService } from '../company/company.service';
import { UsersService } from '../users/users.service';
import { FcmNotificationService } from './fcm-notification.service';
import { NotificationToken } from './entities/notificationToken.entity';
import { StopPushDto } from './dto/receiveFCMTokenDto';

@Injectable()
export class NotificationService implements OnModuleInit {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<Notification>,
    private readonly notificationRepository: NotificationRepository,
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,

    @Inject(forwardRef(() => CompanyService))
    private companyService: CompanyService,

    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,

    @Inject(forwardRef(() => FcmNotificationService))
    private fcmNotificationService: FcmNotificationService,
  ) {}

  onModuleInit() {
    this.watchDatabase();
  }

  async create(newNotification: CreateNotificationDto) {
    const senderId = newNotification.senderId;
    const message = newNotification.message;
    for (const recipient of newNotification.recipientIds) {
      const singularNotification = new Notification(
        senderId,
        recipient,
        message,
        newNotification.companyName,
        newNotification.isJobRelated,
      );
      // listOfNotifications.push(singularNotification);
      const result = new this.notificationModel(singularNotification);
      await result.save();
      console.log(result);
    }
    return {
      data: 'success',
    };
  }

  watchDatabase() {
    this.notificationModel.watch().on('change', async (change) => {
      //console.log(change);
      const document: Notification = change.fullDocument;
      console.log(document);
      try {
        const tokens = await this.notificationRepository.findAllTokensForUser(document.recipientId);
        if (tokens.length == 0) {
          return;
        }
        for (const token of tokens) {
          await this.fcmNotificationService.sendNotificationToUser({
            title: document.message.title,
            body: document.message.body,
            token: token.tokenString,
          });
        }
      } catch (e) {
        console.error(e);
      }
      this.fcmNotificationService.sendingNotificationOneUser('rand').then((r) => {
        console.log('message sent', r);
      });
    });
  }

  async createNotificationsFromUser(newNotification: CreateNotificationDto) {
    const listOfNotifications: Notification[] = [];
    const senderId = newNotification.senderId;
    const message = newNotification.message;
    for (const recipient of newNotification.recipientIds) {
      const singularNotification = new Notification(senderId, recipient, message);
      listOfNotifications.push(singularNotification);
    }
    const result = await this.notificationModel.create(listOfNotifications);
    console.log(result);
    return {
      data: 'success',
    };
  }

  async findAllWithEmployeeId(id: Types.ObjectId) {
    try {
      const result = await this.notificationRepository.findAllWithRecipientId(id);
      console.log(result);
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAllWithUserId(id: Types.ObjectId) {
    //logic will change later
    try {
      const result = await this.notificationRepository.findAllWithRecipientId(id);
      console.log(result);
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async notifyAllInCompany(companyId: Types.ObjectId, message: Message) {
    const company = await this.companyService.getCompanyById(companyId);
    if (company == null) throw new InternalServerErrorException('Invalid CompanyId');
    const employeesInCompany = await this.employeeService.findAllInCompany(companyId);
    for (const employee of employeesInCompany) {
      const user = employee.userId;
      const notification = new Notification(new Types.ObjectId(), user, message);
      this.notificationRepository.save(notification);
    }
  }

  async saveNewFCMToken(userId: Types.ObjectId, newToken: string) {
    const token = new NotificationToken(userId, newToken);
    return this.notificationRepository.saveToken(token);
  }

  async getAllTokensForUser(userId: Types.ObjectId) {
    return this.notificationRepository.findAllTokensForUser(userId);
  }

  //async removeToken(userId: Types.ObjectId, newToken: string) {}

  async stopPushNotifications(userId: Types.ObjectId, body: StopPushDto) {
    return this.notificationRepository.stopPushNotificationsOnDevice(userId, body.deviceType);
  }

  async markAsRead(userId: Types.ObjectId, notificationId: Types.ObjectId) {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('Invalid UserId');
    return this.notificationRepository.markAsRead(notificationId);
  }

  async markAsUnread(userId: Types.ObjectId, notificationId: Types.ObjectId) {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('Invalid UserId');
    return this.notificationRepository.markAsUnread(notificationId);
  }

  async haveNewNotifications(userId: Types.ObjectId) {
    return this.notificationRepository.haveNewNotifications(userId);
  }
}
