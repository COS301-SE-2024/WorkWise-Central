import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FlattenMaps, Model, Types } from 'mongoose';
import { Job } from './entities/job.entity';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobRepository {
  constructor(
    @InjectModel(Job.name)
    private jobModel: Model<Job>,
  ) {}

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
    return this.jobModel.findOneAndUpdate(
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
    );
  }

  async existsInCompany(id: string, companyId: string) {
    const result: Document<unknown, NonNullable<unknown>, Job> &
      Job & { _id: Types.ObjectId } = await this.jobModel.findOne({
      $and: [
        { _id: id },
        { companyId: new Types.ObjectId(companyId) },
        {
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        },
      ],
    });
    if (result != null && result.companyId.toString() == companyId) {
      return result;
    } else {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    const result: Document<unknown, NonNullable<unknown>, Job> &
      Job & { _id: Types.ObjectId } = await this.jobModel.findOneAndUpdate(
      {
        $and: [
          { _id: id },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      },
      { $set: { deletedAt: new Date() } },
    );

    return result != null;
  }

  async findAllWithRecipientId(id: Types.ObjectId): Promise<Job[]> {
    return await this.jobModel.find({ recipientId: id }).lean().exec();
  }

  /*  async findAllWithUserId(id: Types.ObjectId): Promise<Notification[]> {
    return this.notificationModel.find({ recipientId: id }).exec();
  }*/

  async findOne(id: Types.ObjectId): Promise<Job[]> {
    return this.jobModel.find({ id: id }).exec();
  }
}
