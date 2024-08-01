import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JobPriorityTag, JobTag } from './entities/job-tag.entity';
import { Model, Types } from 'mongoose';
import { JobStatus } from './entities/job-status.entity';
import { UpdateStatusDto } from './dto/update-job.dto';
import { isNotDeleted } from '../shared/soft-delete';

@Injectable()
export class JobTagRepository {
  constructor(
    @InjectModel(JobTag.name)
    private readonly jobTagModel: Model<JobTag>,

    @InjectModel(JobPriorityTag.name)
    private readonly jobPriorityTagModel: Model<JobPriorityTag>,

    @InjectModel(JobStatus.name)
    private readonly jobStatusModel: Model<JobStatus>,
  ) {}

  async findAllTagsInCompany(companyId: Types.ObjectId) {
    return this.jobTagModel.find({ companyId: companyId }).lean().exec();
  }

  async findAllPriorityTagsInCompany(companyId: Types.ObjectId) {
    return this.jobPriorityTagModel
      .find({ companyId: companyId })
      .lean()
      .exec();
  }

  async addJobTagToCompany(jobTag: JobTag) {
    const jobTagModel = new this.jobTagModel(jobTag);
    return await jobTagModel.save();
  }

  async addJobPriorityTagToCompany(jobPriorityTag: JobPriorityTag) {
    const priorityTagModel = new this.jobPriorityTagModel(jobPriorityTag);
    return await priorityTagModel.save();
  }

  async addJobStatusToCompany(jobStatus: JobStatus) {
    const jobTagModel = new this.jobStatusModel(jobStatus);
    return await jobTagModel.save();
  }

  async deleteJobTag(tagId: Types.ObjectId) {
    const deleteResult = await this.jobTagModel
      .deleteOne({ _id: tagId })
      .exec();
    console.log(deleteResult);
    return deleteResult;
  }

  async deletePriorityTag(tagId: Types.ObjectId) {
    const deleteResult = await this.jobPriorityTagModel
      .deleteOne({ _id: tagId })
      .exec();
    console.log(deleteResult);
    return deleteResult;
  }

  async deleteJobStatus(tagId: Types.ObjectId) {
    const deleteResult = await this.jobStatusModel
      .deleteOne({ _id: tagId })
      .exec();
    console.log(deleteResult);
    return deleteResult;
  }

  ///STATUS
  async createStatus(status: JobStatus) {
    const newStatus = await this.jobStatusModel.create(status);
    return (await newStatus.save()).toObject();
  }

  //TODO: URGENT
  /*  async updateStatus(
    statusId: Types.ObjectId,
    updateStatusDto: UpdateStatusDto,
  ) {
    const updatedStatus = await this.jobStatusModel.findOneandupdate({
      _id: statusId,
      isNotDeleted,
    });
  }

  async removeStatus(status: JobStatus, jobId: Types.ObjectId) {}*/
}
