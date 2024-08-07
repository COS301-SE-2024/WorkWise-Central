import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { Types } from 'mongoose';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}
  validateObjectId(id: string | Types.ObjectId, entity: string = ''): boolean {
    let response: string;
    if (entity === '') response = `Invalid ID`;
    else response = `Invalid ${entity} ID`;

    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  @Get()
  async test(@Query('id') id: string) {
    //this.validateObjectId(id);
    const compId = new Types.ObjectId(id);
    try {
      return await this.notificationService.notifyAllInCompany(compId, {
        title: 'Test',
        body: 'Hello world',
      });
    } catch (e) {
      throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.CONFLICT,
  })
  @Get('/employee')
  async getAllEmployeeNotifications(@Query('empId') id: string) {
    this.validateObjectId(id);
    const employeeId = new Types.ObjectId(id);
    try {
      return await this.notificationService.findAllWithEmployeeId(employeeId);
    } catch (e) {
      throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/employee')
  async getAllUserNotifications(@Query('userId') id: string) {
    this.validateObjectId(id);
    const userId = new Types.ObjectId(id);
    try {
      return await this.notificationService.findAllWithUserId(userId);
    } catch (e) {
      throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
