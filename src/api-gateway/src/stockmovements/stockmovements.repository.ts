import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FlattenMaps, Model, Types } from 'mongoose';
import { EmployeeDetails, InventoryItem, StockMovements } from './entities/stockmovements.entity';
import { User } from '../users/entities/user.entity';
import { UpdateStockMovementsDto } from './dto/update-stockmovements.dto';

@Injectable()
export class StockMovementsRepository {
  constructor(
    @InjectModel(StockMovements.name)
    private readonly StockMovementsModel: Model<StockMovements>,
  ) {}

  async findAll() {
    return this.StockMovementsModel.find().lean().exec();
  }

  async save(company: StockMovements) {
    const newCompanyModel = new this.StockMovementsModel(company);
    return await newCompanyModel.save();
  }

  async findAllInCompany(identifier: Types.ObjectId) {
    console.log('identifier', identifier);
    return await this.StockMovementsModel.find({
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
    return this.StockMovementsModel.findOne({
      $and: [
        { _id: identifier },
        {
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        },
      ],
    }).lean();
  }

  async StockMovementsExists(id: Types.ObjectId): Promise<boolean> {
    const result: FlattenMaps<StockMovements> & { _id: Types.ObjectId } = await this.StockMovementsModel.findOne({
      $and: [
        { _id: id },
        {
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        },
      ],
    }).lean();
    return result != null;
  }

  async update(id: Types.ObjectId, updateStockMovementsDto: UpdateStockMovementsDto) {
    id = new Types.ObjectId(id);
    const previousObject: FlattenMaps<StockMovements> & { _id: Types.ObjectId } =
      await this.StockMovementsModel.findOneAndUpdate(
        {
          $and: [
            { _id: id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        },
        { $set: { ...updateStockMovementsDto }, updatedAt: new Date() },
      ).lean();
    return previousObject;
  }

  async updateEmployeeInfo(id: Types.ObjectId, details: EmployeeDetails) {
    id = new Types.ObjectId(id);
    const previousObject: FlattenMaps<StockMovements> & { _id: Types.ObjectId } =
      await this.StockMovementsModel.findOneAndUpdate(
        {
          $and: [
            { _id: id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        },
        { $set: { employee: details }, updatedAt: new Date() },
      ).lean();
    return previousObject;
  }

  async updateInventoryInfo(id: Types.ObjectId, details: InventoryItem) {
    id = new Types.ObjectId(id);
    const previousObject: FlattenMaps<StockMovements> & { _id: Types.ObjectId } =
      await this.StockMovementsModel.findOneAndUpdate(
        {
          $and: [
            { _id: id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        },
        { $set: { inventoryItem: details }, updatedAt: new Date() },
      ).lean();
    return previousObject;
  }

  async removeEmployeeRef(employeeId: Types.ObjectId) {
    const previousObject: FlattenMaps<StockMovements> & { _id: Types.ObjectId } =
      await this.StockMovementsModel.findOneAndUpdate(
        {
          $and: [
            { 'employee.employeeId': employeeId },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        },
        { $set: { 'employee.employeeId': null }, updatedAt: new Date() },
      ).lean();
    return previousObject;
  }

  async removeInventoryRef(inventoryId: Types.ObjectId) {
    const previousObject: FlattenMaps<StockMovements> & { _id: Types.ObjectId } =
      await this.StockMovementsModel.findOneAndUpdate(
        {
          $and: [
            { 'inventoryItem.inventoryId': inventoryId },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        },
        { $set: { 'inventoryItem.inventoryId': null }, updatedAt: new Date() },
      ).lean();
    return previousObject;
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    const StockMovementsToDelete = await this.findById(id);

    if (StockMovementsToDelete == null) {
      return false;
    }

    const result: Document<unknown, NonNullable<unknown>, User> & User & { _id: Types.ObjectId } =
      await this.StockMovementsModel.findOneAndUpdate(
        {
          $and: [
            { _id: StockMovementsToDelete._id },
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
