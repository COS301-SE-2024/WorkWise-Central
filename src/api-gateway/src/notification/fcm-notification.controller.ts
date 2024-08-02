import { Body, Controller, Post } from '@nestjs/common';
import { FcmNotificationService } from './fcm-notification.service';

@Controller('firebase')
export class FcmNotificationController {
  constructor(
    private readonly sendingNotificationService: FcmNotificationService,
  ) {}

  @Post('send-notification/')
  async sendNotification(@Body() body: { token: string }) {
    const { token } = body;
    return await this.sendingNotificationService.sendingNotificationOneUser(
      token,
    );
  }
}
