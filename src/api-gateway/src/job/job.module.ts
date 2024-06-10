import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema } from './entities/job.entity';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'job', schema: JobSchema }]),
    UsersModule,
    CompanyModule,
    ClientModule,
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
