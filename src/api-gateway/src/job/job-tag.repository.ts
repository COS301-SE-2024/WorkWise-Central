import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JobPriorityTag, JobTag } from './entities/job-tag.entity';
import { Model, Types } from 'mongoose';
import { JobStatus } from './entities/job-status.entity';
import { UpdatePriorityTag, UpdateStatus, UpdateTag } from './dto/update-job.dto';
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
    return this.jobPriorityTagModel.find({ companyId: companyId }).lean().exec();
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
    const deleteResult = await this.jobTagModel.deleteOne({ _id: tagId }).exec();
    console.log(deleteResult);
    return deleteResult;
  }

  async deletePriorityTag(tagId: Types.ObjectId) {
    const deleteResult = await this.jobPriorityTagModel.deleteOne({ _id: tagId }).exec();
    console.log(deleteResult);
    return deleteResult;
  }

  ///STATUS
  async createStatus(status: JobStatus) {
    const newStatus = await this.jobStatusModel.create(status);
    return (await newStatus.save()).toObject();
  }

  async findStatusById(id: Types.ObjectId) {
    return this.jobStatusModel
      .findOne({
        $and: [{ _id: id }, isNotDeleted],
      })
      .lean()
      .exec();
  }

  async findStatusByLabel(companyId: Types.ObjectId, label: string) {
    return this.jobStatusModel
      .findOne({
        $and: [{ companyId: companyId }, { status: label }, isNotDeleted],
      })
      .lean()
      .exec();
  }

  async findAllStatusesInCompany(companyId: Types.ObjectId) {
    return this.jobStatusModel
      .find({
        $and: [{ companyId: companyId }, isNotDeleted],
      })
      .lean()
      .exec();
  }

  /*  async statusNameExists(status: string) {
    const regex = `${status}`;
    const stat = await this.jobStatusModel
      .findOne({
        $and: [{ status: { $regex: regex, $options: 'i' } }, isNotDeleted],
        //$and: [{ status: { $regex: regex, $options: 'i' } }, isNotDeleted],
      })
      .lean()
      .exec();
    return stat != null;
  }*/

  async createDefaultStatusesInCompany(statusArr: JobStatus[]) {
    //'No status' and 'Archive'
    const result: any[] = [];
    for (const jobStatus of statusArr) {
      const newStatus = await this.jobStatusModel.create(jobStatus);
      result.push(await newStatus.save());
    }
    return result;
  }

  async updateTag(tagId: Types.ObjectId, updates: UpdateTag) {
    return await this.jobTagModel
      .findOneAndUpdate(
        { _id: tagId },
        {
          ...updates,
        },
        { new: true },
      )
      .lean()
      .exec();
  }

  async updatePriorityTag(tagId: Types.ObjectId, updates: UpdatePriorityTag) {
    return await this.jobPriorityTagModel
      .findOneAndUpdate(
        { _id: tagId },
        {
          ...updates,
        },
        { new: true },
      )
      .lean()
      .exec();
  }

  async updateStatus(statusId: Types.ObjectId, updateStatus: UpdateStatus) {
    return await this.jobStatusModel
      .findOneAndUpdate(
        { _id: statusId },
        {
          ...updateStatus,
        },
        { new: true },
      )
      .lean()
      .exec();
  }

  async deleteStatus(statusId: Types.ObjectId, companyId: Types.ObjectId) {
    const deleteResult = await this.jobStatusModel.deleteOne({
      $and: [{ _id: statusId }, { companyId: companyId }],
    });
    return deleteResult.acknowledged;
  }
}
