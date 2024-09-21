import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoCallService } from './video-call.service';
import { VideoCall, VideoCallSchema } from './entities/video-call.entity';
import { VideoCallController } from './video-call.controller.ts';
import { WebRTCGateway } from './webrtc.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: VideoCall.name, schema: VideoCallSchema }])],
  controllers: [VideoCallController],
  providers: [VideoCallService, WebRTCGateway],
})
export class VideoCallModule {}
