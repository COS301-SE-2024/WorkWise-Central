import { forwardRef, Inject, Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message, Notification } from './entities/notification.entity';
import { NotificationRepository } from './notification.repository';
import { EmployeeService } from '../employee/employee.service';
import { CompanyService } from '../company/company.service';
import { UsersService } from '../users/users.service';
import { FcmNotificationService } from './fcm-notification.service';

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
      const singularNotification = new Notification(senderId, recipient, message);
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
    this.notificationModel.watch().on('change', (change) => {
      console.log(change);
      const document: Notification = change.fullDocument;
      console.log(document);
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
}
