import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';
import { Job } from './entities/job.entity';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobRepository {
  constructor(
    @InjectModel(Job.name)
    private jobModel: Model<Job>,
  ) {}

  async save(job: Job) {
    const newJob = new this.jobModel(job);
    return await newJob.save();
  }

  async findById(
    identifier: string,
  ): Promise<FlattenMaps<Job> & { _id: Types.ObjectId }> {
    const populatedFields: string[] = [
      'clientId',
      'assignedBy',
      'assignedEmployees',
      /*'inventoryUsed'*/ //TODO: When Inventory is added
    ];

    return this.jobModel
      .findOne({
        $and: [
          { _id: identifier },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .populate(populatedFields)
      .lean();
  }

  async findAll() {
    return this.jobModel
      .find({ $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }] })
      .lean();
  }

  async exists(id: string) {
    return this.jobModel
      .findOne({
        $and: [
          { _id: id },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
  }

  async update(id: string | Types.ObjectId, updateJobDto: UpdateJobDto) {
    return this.jobModel
      .findOneAndUpdate(
        {
          $and: [
            { _id: id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        },
        { $set: { ...updateJobDto }, updatedAt: new Date() },
        { new: true },
      )
      .lean();
  }

  async existsInCompany(id: string, companyId: string) {
    const result = await this.jobModel
      .findOne({
        $and: [
          { _id: id },
          { companyId: new Types.ObjectId(companyId) },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
    if (result != null && result.companyId.toString() == companyId) {
      return result;
    } else {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.jobModel
      .findOneAndUpdate(
        {
          $and: [
            { _id: id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        },
        { $set: { deletedAt: new Date() } },
      )
      .lean();

    return result != null;
  }

  async findAllWithRecipientId(id: Types.ObjectId): Promise<Job[]> {
    return await this.jobModel.find({ recipientId: id }).lean().exec();
  }

  async findOne(id: Types.ObjectId): Promise<Job[]> {
    return this.jobModel.find({ id: id }).lean().exec();
  }
}
