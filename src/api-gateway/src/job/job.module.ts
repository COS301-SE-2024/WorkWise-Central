import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema } from './entities/job.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'job', schema: JobSchema }]),
    UsersModule,
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
