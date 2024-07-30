import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JobPriorityTag, JobTag } from './entities/job-tag.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class JobTagRepository {
  constructor(
    @InjectModel(JobTag.name)
    private readonly jobTagModel: Model<JobTag>,

    @InjectModel(JobPriorityTag.name)
    private readonly jobPriorityTagModel: Model<JobPriorityTag>,
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
}
