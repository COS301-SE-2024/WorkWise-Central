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

  async saveClient(client: Client) {
    const newClient = new this.clientModel(client);
    return await newClient.save();
  }

  async findAll() {
    return this.clientModel
      .find({ $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }] })
      .lean();
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    return this.clientModel
      .find({
        $and: [
          { 'details.companyId': companyId },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean()
      .exec();
  }

  async findClientById(id: Types.ObjectId): Promise<FlattenMaps<Client>> {
    return this.clientModel
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

  async findClientByEmailOrName(companyId: Types.ObjectId, identifier: string) {
    const regex = `${identifier}`;
    return this.clientModel
      .find({
        $and: [
          { companyId: companyId },
          {
            $or: [
              { 'clientInfo.email': { $regex: regex, $options: 'i' } },
              { 'details.firstName': { $regex: regex, $options: 'i' } },
              { 'details.lastName': { $regex: regex, $options: 'i' } },
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

  async update(id: Types.ObjectId, updateClientDto: UpdateClientDto) {
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
