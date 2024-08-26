import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FlattenMaps, Model, Types } from 'mongoose';
import { StockTake } from './entities/stocktake.entity';
import { User } from '../users/entities/user.entity';
import { isNotDeleted } from '../shared/soft-delete';
import { UpdateStockTakeDto } from './dto/update-stocktake.dto';

@Injectable()
export class StockTakeRepository {
  constructor(
    @InjectModel(StockTake.name)
    private readonly stocktakeModel: Model<StockTake>,
  ) {}

  async findAll() {
    return this.stocktakeModel.find().lean().exec();
  }

  async save(company: StockTake) {
    const newCompanyModel = new this.stocktakeModel(company);
    return await newCompanyModel.save();
  }

  async findAllInCompany(identifier: Types.ObjectId) {
    return await this.stocktakeModel
      .find({
        $and: [
          {
            companyId: identifier,
          },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
  }

  async findById(identifier: Types.ObjectId) {
    return this.stocktakeModel
      .findOne({
        $and: [
          { _id: identifier },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
  }

  async findByIds(identifiers: Types.ObjectId[]) {
    const ids = identifiers.map((id) => new Types.ObjectId(id));

    const result: (FlattenMaps<StockTake> & { _id: Types.ObjectId })[] = await this.stocktakeModel
      .find({
        $and: [
          { _id: { $in: ids } },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
    return result;
  }

  async StockTakeExists(id: Types.ObjectId): Promise<boolean> {
    const result: FlattenMaps<StockTake> & { _id: Types.ObjectId } = await this.stocktakeModel
      .findOne({
        $and: [
          { _id: id },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
    return result != null;
  }

  async StockTakeExistsForCompany(id: Types.ObjectId, companyIdentification: Types.ObjectId): Promise<boolean> {
    const result: FlattenMaps<StockTake> & { _id: Types.ObjectId } = await this.stocktakeModel
      .findOne({
        $and: [
          { _id: new Types.ObjectId(id) },
          { companyId: companyIdentification },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
    return result != null;
  }

  async update(id: Types.ObjectId, updateStockTakeDto: UpdateStockTakeDto) {
    id = new Types.ObjectId(id);
    const previousObject: FlattenMaps<StockTake> & { _id: Types.ObjectId } = await this.stocktakeModel
      .findOneAndUpdate(
        {
          $and: [
            { _id: id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        },
        { $set: { ...updateStockTakeDto }, updatedAt: new Date() },
      )
      .lean();

    return previousObject;
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    const StockTakeToDelete = await this.findById(id);

    if (StockTakeToDelete == null) {
      return false;
    }

    const result: Document<unknown, NonNullable<unknown>, User> & User & { _id: Types.ObjectId } =
      await this.stocktakeModel.findOneAndUpdate(
        {
          $and: [
            { _id: StockTakeToDelete._id },
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

  async addAttachments(id: Types.ObjectId, newUrls: string[]) {
    return await this.stocktakeModel
      .findOneAndUpdate(
        {
          $and: [
            { _id: id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        },
        { $push: { images: { $each: newUrls } }, updatedAt: Date.now() },
        { new: true },
      )
      .lean()
      .exec();
  }

  deleteAllInCompany(companyId: Types.ObjectId) {
    this.stocktakeModel.updateMany(
      {
        $and: [{ companyId: companyId }, isNotDeleted],
      },
      {
        $set: { deletedAt: new Date() },
      },
    );
  }
}
