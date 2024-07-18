import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FlattenMaps, Model, Types } from 'mongoose';
import { Inventory } from './entities/inventory.entity';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class InventoryRepository {
  constructor(
    @InjectModel(Inventory.name)
    private readonly InventoryModel: Model<Inventory>,
  ) {}

  async findAll() {
    return this.InventoryModel.find().lean().exec();
  }

  async save(company: Inventory) {
    const newCompanyModel = new this.InventoryModel(company);
    return await newCompanyModel.save();
  }

  async findAllInCompany(identifier: Types.ObjectId) {
    return await this.InventoryModel.find({
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

  async findById(identifier: Types.ObjectId) {
    return this.InventoryModel.findOne({
      $and: [
        { _id: identifier },
        {
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        },
      ],
    }).lean();
  }

  async findByIds(
    identifiers: Types.ObjectId[],
  ): Promise<(FlattenMaps<Inventory> & { _id: Types.ObjectId })[]> {
    const ids = identifiers.map((id) => new Types.ObjectId(id));

    const result: (FlattenMaps<Inventory> & { _id: Types.ObjectId })[] =
      await this.InventoryModel.find({
        $and: [
          { _id: { $in: ids } },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      }).lean();
    return result;
  }

  async InventoryExists(id: Types.ObjectId): Promise<boolean> {
    const result: FlattenMaps<Inventory> & { _id: Types.ObjectId } =
      await this.InventoryModel.findOne({
        $and: [
          { _id: id },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      }).lean();
    return result != null;
  }

  async InventoryExistsForCompany(
    id: Types.ObjectId,
    companyIdentification: Types.ObjectId,
  ): Promise<boolean> {
    const result: FlattenMaps<Inventory> & { _id: Types.ObjectId } =
      await this.InventoryModel.findOne({
        $and: [
          { _id: new Types.ObjectId(id) },
          { companyId: companyIdentification },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      }).lean();
    return result != null;
  }

  async getCompanyIdFromInventory(inventoryId: Types.ObjectId) {
    const result = await this.InventoryModel.findOne(
      { _id: new Types.ObjectId(inventoryId) },
      { companyId: 1, _id: 0 },
    ).lean();

    return result ? result.companyId : null;
  }

  async update(id: Types.ObjectId, updateInventoryDto: UpdateInventoryDto) {
    const previousObject: FlattenMaps<Inventory> & { _id: Types.ObjectId } =
      await this.InventoryModel.findOneAndUpdate(
        {
          $and: [
            { _id: id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        },
        { $set: { ...updateInventoryDto }, updatedAt: new Date() },
      ).lean();

    return previousObject;
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    const InventoryToDelete = await this.findById(id);

    if (InventoryToDelete == null) {
      return false;
    }

    const result: Document<unknown, NonNullable<unknown>, User> &
      User & { _id: Types.ObjectId } =
      await this.InventoryModel.findOneAndUpdate(
        {
          $and: [
            { _id: InventoryToDelete._id },
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
