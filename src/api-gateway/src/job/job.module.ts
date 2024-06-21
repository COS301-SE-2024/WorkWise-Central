import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './entities/job.entity';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    UsersModule,
    CompanyModule,
    ClientModule,
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
