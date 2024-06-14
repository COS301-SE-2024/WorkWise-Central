import { PartialType } from '@nestjs/swagger';
import { Job } from '../entities/job.entity';

export class UpdateJobDto extends PartialType(Job) {}
