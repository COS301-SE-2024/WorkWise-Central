import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';
import { Client } from './entities/client.entity';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectModel('Client') private readonly clientModel: Model<Client>,
  ) {}

  async findAll() {
    return this.clientModel.find().lean().exec();
  }

  async findClientById(identifier: string): Promise<FlattenMaps<Client>> {
    return this.clientModel
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

  async findByEmailOrName(companyId: Types.ObjectId, identifier: string) {
    const regex = `*${identifier}*`;
    const searchTerm = new RegExp(regex, 'i');
    return this.clientModel
      .find({
        $and: [
          { companyId: companyId },
          {
            $or: [
              { 'clientInfo.email': { $regex: searchTerm } },
              { 'details.name': { $regex: searchTerm } },
              // { 'details.surname': { $regex: searchTerm } },
            ],
          },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
  }

  async exists(id: string | Types.ObjectId) {
    const result = await this.clientModel
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

  async update(id: string | Types.ObjectId, updateClientDto: UpdateClientDto) {
    return this.clientModel
      .findOneAndUpdate(
        {
          $and: [
            { _id: id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        },
        { $set: { ...updateClientDto }, updatedAt: new Date() },
        { new: true },
      )
      .lean();
  }

  async delete(id: string | Types.ObjectId) {
    return this.clientModel.findOneAndUpdate(
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
  }
}
