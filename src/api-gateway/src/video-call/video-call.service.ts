import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VideoCall } from './entities/video-call.entity';

@Injectable()
export class VideoCallService {
  constructor(@InjectModel(VideoCall.name) private videoCallModel: Model<VideoCall>) {}

  async scheduleCall(callData: { title: string; scheduledTime: Date }): Promise<VideoCall> {
    const newCall = new this.videoCallModel(callData);
    return newCall.save();
  }
}
