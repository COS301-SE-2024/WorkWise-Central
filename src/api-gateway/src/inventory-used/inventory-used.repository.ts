import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FlattenMaps, Model, Types } from 'mongoose';
import { InventoryUsed } from './entities/inventory-used.entity';
import { UpdateInventoryUsedDto } from './dto/update-inventory-used.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class InventoryUsedRepository {
  constructor(
    @InjectModel(InventoryUsed.name)
    private readonly InventoryUsedModel: Model<InventoryUsed>,
  ) {}

  async findAll() {
    return this.InventoryUsedModel.find().lean().exec();
  }

  async save(company: InventoryUsed) {
    const newCompanyModel = new this.InventoryUsedModel(company);
    return await newCompanyModel.save();
  }

  async findAllInCompany(identifier: Types.ObjectId) {
    return await this.InventoryUsedModel.find({
      $and: [
        {
          companyId: identifier,
        },
        {
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        },
      ],
    }).lean();
  }

  async findAllForJob(identifier: Types.ObjectId) {
    return await this.InventoryUsedModel.find({
      $and: [
        {
          jobId: identifier,
        },
        {
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        },
      ],
    })
      .populate(['jobId', 'employeeId', 'inventoryId'])
      .lean();
  }

  async findById(identifier: Types.ObjectId) {
    return this.InventoryUsedModel.findOne({
      $and: [
        { _id: identifier },
        {
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        },
      ],
    }).lean();
  }

  async findByIds(identifiers: Types.ObjectId[]) {
    const ids = identifiers.map((id) => new Types.ObjectId(id));

    const result: (FlattenMaps<InventoryUsed> & { _id: Types.ObjectId })[] = await this.InventoryUsedModel.find({
      $and: [
        { _id: { $in: ids } },
        {
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        },
      ],
    }).lean();
    return result;
  }

  async update(id: Types.ObjectId, updateInventoryUsedDto: UpdateInventoryUsedDto) {
    id = new Types.ObjectId(id);
    const previousObject: FlattenMaps<InventoryUsed> & { _id: Types.ObjectId } =
      await this.InventoryUsedModel.findOneAndUpdate(
        {
          $and: [
            { _id: id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        },
        { $set: { ...updateInventoryUsedDto }, updatedAt: new Date() },
      ).lean();

    return previousObject;
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    const InventoryUsedToDelete = await this.findById(id);

    if (InventoryUsedToDelete == null) {
      return false;
    }

    const result: Document<unknown, NonNullable<unknown>, User> & User & { _id: Types.ObjectId } =
      await this.InventoryUsedModel.findOneAndUpdate(
        {
          $and: [
            { _id: InventoryUsedToDelete._id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        },
        { $set: { deletedAt: new Date() } },
      );

    if (result == null) {
      return false;
    }
    return true;
  }
}
