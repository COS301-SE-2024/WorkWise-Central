import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoCallService } from './video-call.service';
import { VideoCall, VideoCallSchema } from './entities/video-call.entity';
import { VideoCallController } from './video-call.controller.ts';
import { WebRTCGateway } from './webrtc.gateway';
import { CompanyModule } from 'src/company/company.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { UsersModule } from 'src/users/users.module';
import { VideoCallRepository } from './video-call.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VideoCall.name, schema: VideoCallSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => EmployeeModule),
  ],
  controllers: [VideoCallController],
  providers: [VideoCallService, WebRTCGateway, VideoCallService, VideoCallRepository],
  exports: [VideoCallService, WebRTCGateway, VideoCallService, VideoCallRepository],
})
export class VideoCallModule {}
