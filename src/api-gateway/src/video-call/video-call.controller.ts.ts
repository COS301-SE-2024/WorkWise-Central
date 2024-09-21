import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { VideoCallService } from './video-call.service';

@Controller('video-calls')
export class VideoCallController {
  constructor(private videoCallService: VideoCallService) {}

  @Post('schedule')
  @UseGuards(AuthGuard)
  async scheduleCall(@Body() callData: { title: string; scheduledTime: Date }) {
    return this.videoCallService.scheduleCall(callData);
  }
}
