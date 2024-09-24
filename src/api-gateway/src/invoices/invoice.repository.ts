import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FlattenMaps, Model, Types } from 'mongoose';
import { Invoice } from './entities/invoice.entity';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class InvoiceRepository {
  constructor(
    @InjectModel(Invoice.name)
    private readonly InvoiceModel: Model<Invoice>,
  ) {}

  async findAll() {
    return this.InvoiceModel.find().lean().exec();
  }

  async save(company: Invoice) {
    const newCompanyModel = new this.InvoiceModel(company);
    return await newCompanyModel.save();
  }

  async findLastInvoiceNumber(companyIdentification: Types.ObjectId) {
    const lastInvoice = await this.InvoiceModel.findOne({
      companyId: companyIdentification,
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    })
      .sort({ invoiceNumber: -1 })
      .select('invoiceNumber')
      .lean();
    return lastInvoice ? lastInvoice.invoiceNumber : null;
  }

  async findAllInCompany(identifier: Types.ObjectId) {
    return await this.InvoiceModel.find({
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

  async detailedFindAllInCompany(identifier: Types.ObjectId) {
    const result: (FlattenMaps<Invoice> & { _id: Types.ObjectId })[] = await this.InvoiceModel.find({
      $and: [
        {
          companyId: identifier,
        },
        {
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        },
      ],
    })
      .populate(['clientId', 'jobId', 'companyId'])
      .lean();

    return result;
  }

  async findAllForClient(identifier: Types.ObjectId) {
    return await this.InvoiceModel.find({
      $and: [
        {
          clientId: identifier,
        },
        {
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        },
      ],
    }).lean();
  }

  async findById(identifier: Types.ObjectId) {
    return this.InvoiceModel.findOne({
      $and: [
        { _id: identifier },
        {
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        },
      ],
    }).lean();
  }

  async InvoiceExists(id: Types.ObjectId): Promise<boolean> {
    const result: FlattenMaps<Invoice> & { _id: Types.ObjectId } = await this.InvoiceModel.findOne({
      $and: [
        { _id: id },
        {
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        },
      ],
    }).lean();
    return result != null;
  }

  async InvoiceExistsForCompany(id: Types.ObjectId, companyIdentification: Types.ObjectId): Promise<boolean> {
    const result: FlattenMaps<Invoice> & { _id: Types.ObjectId } = await this.InvoiceModel.findOne({
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

  async update(id: Types.ObjectId, updateInvoiceDto: UpdateInvoiceDto) {
    id = new Types.ObjectId(id);
    const previousObject: FlattenMaps<Invoice> & { _id: Types.ObjectId } = await this.InvoiceModel.findOneAndUpdate(
      {
        $and: [
          { _id: id },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      },
      { $set: { ...updateInvoiceDto }, updatedAt: new Date() },
    ).lean();

    return previousObject;
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    const InvoiceToDelete = await this.findById(id);

    if (InvoiceToDelete == null) {
      return false;
    }

    const result: Document<unknown, NonNullable<unknown>, User> & User & { _id: Types.ObjectId } =
      await this.InvoiceModel.findOneAndUpdate(
        {
          $and: [
            { _id: InvoiceToDelete._id },
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
