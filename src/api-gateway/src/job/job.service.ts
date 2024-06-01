import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/entities/user.entity';
import { Job } from './entities/job.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectModel('job') private readonly jobModel: Model<Job>,
    @InjectModel('user') private readonly userModel: Model<User>,
  ) {}

  create(createJobDto: CreateJobDto) {
    return 'This action adds a new job';
  }

  findAll() {
    return `This action returns all job`;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
