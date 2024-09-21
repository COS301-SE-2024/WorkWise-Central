import { Module } from '@nestjs/common';
import { VideoConferencingController } from './video-conferencing.controller';

@Module({
  providers: [VideoConferencingController], // Moved to providers
})
export class VideoConferencingModule {}
