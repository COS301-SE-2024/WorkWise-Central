import { Body, Controller, Get, Headers, HttpException, HttpStatus, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { Types } from 'mongoose';
import { validateObjectId } from '../utils/Utils';
import { ReceiveFCMTokenDto, StopPushDto } from './dto/receiveFCMTokenDto';
import { JwtService } from '@nestjs/jwt';
import { NotificationToken } from './entities/notificationToken.entity';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private readonly jwtService: JwtService,
  ) {}
  @Get()
  async test(@Query('id') id: string) {
    validateObjectId(id);
    const compId = new Types.ObjectId(id);
    try {
      return await this.notificationService.notifyAllInCompany(compId, {
        title: 'Test Again',
        body: 'Hello world ',
      });
    } catch (e) {
      throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // REST
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.CONFLICT,
  })
  @Get('/employee')
  async getAllEmployeeNotifications(@Query('empId') id: string) {
    validateObjectId(id);
    const employeeId = new Types.ObjectId(id);
    try {
      return await this.notificationService.findAllWithEmployeeId(employeeId);
    } catch (e) {
      throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/employee')
  async getAllUserNotifications(@Query('userId') id: string) {
    validateObjectId(id);
    const userId = new Types.ObjectId(id);
    try {
      return await this.notificationService.findAllWithUserId(userId);
    } catch (e) {
      throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Push Notification
  @ApiOperation({
    summary: 'After accepting Push Notifications, send your new Device token for push notifications',
    description: ' You only need to do this when its the first time using the device, or the user cleared App Data',
  })
  @ApiBody({ type: ReceiveFCMTokenDto })
  @ApiResponse({ type: NotificationToken })
  @Post('push/token')
  async sendFCMToken(@Headers() headers: any, @Body() body: ReceiveFCMTokenDto) {
    try {
      const userId = this.extractUserId(headers);
      return { data: await this.notificationService.saveNewFCMToken(userId, body.newToken) };
    } catch (e) {
      throw e;
    }
  }

  @ApiOperation({
    summary: 'If you want to turn off push notifications on your device',
    description: 'Send the current device Id',
  })
  @ApiResponse({ type: NotificationToken })
  @Patch('push/token')
  async stopNotificationsOnThisDevice(@Headers() headers: any, @Body() body: StopPushDto) {
    try {
      const userId = this.extractUserId(headers);
      return { data: await this.notificationService.stopPushNotifications(userId, body) };
    } catch (e) {}
  }

  /*  //TODO remove after testing
  @Put('push/token')
  async sendPush(@Headers() headers: any, @Body() body: ReceiveFCMTokenDto) {
    try {
      const userId = this.extractUserId(headers);
      //return { data: await this.notificationService.removeToken(userId, body.newToken) };
    } catch (e) {}
  }*/

  public extractUserId(headers: any) {
    const authHeader: string = headers.authorization;
    const decodedJwtAccessToken = this.jwtService.decode(authHeader.replace(/^Bearer\s+/i, ''));
    if (!Types.ObjectId.isValid(decodedJwtAccessToken.sub)) {
      throw new HttpException('Invalid User', HttpStatus.BAD_REQUEST);
    }
    const userId: Types.ObjectId = decodedJwtAccessToken.sub; //This attribute is retrieved in the JWT
    return userId;
  }
}
