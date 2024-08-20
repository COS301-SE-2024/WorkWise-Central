import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';
import { Client } from './entities/client.entity';
import { UpdateClientDto } from './dto/update-client.dto';
import { currentDate } from '../utils/Utils';
import { isNotDeleted } from '../shared/soft-delete';

@Injectable()
export class ClientRepository {
  constructor(@InjectModel('Client') private readonly clientModel: Model<Client>) {}

  async saveClient(client: Client) {
    const newClient = new this.clientModel(client);
    return await newClient.save();
  }

  async findAll() {
    return this.clientModel.find(isNotDeleted).lean();
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    return this.clientModel
      .find({
        $and: [{ 'details.companyId': companyId }, isNotDeleted],
      })
      .lean()
      .exec();
  }

  async findClientById(id: Types.ObjectId): Promise<FlattenMaps<Client>> {
    return this.clientModel
      .findOne({
        $and: [{ _id: id }, isNotDeleted],
      })
      .lean();
  }

  async findClientsWithEmailOrName(companyId: Types.ObjectId, identifier: string) {
    const regex = `${identifier}`;
    return this.clientModel
      .find({
        $and: [
          { companyId: companyId },
          {
            $or: [
              { 'contactInfo.email': { $regex: regex, $options: 'i' } },
              { 'details.firstName': { $regex: regex, $options: 'i' } },
              { 'details.lastName': { $regex: regex, $options: 'i' } },
            ],
          },
          isNotDeleted,
        ],
      })
      .lean();
  }

  async exists(id: Types.ObjectId) {
    const result = await this.clientModel
      .findOne({
        $and: [{ _id: id }, isNotDeleted],
      })
      .lean();
    return result != null;
  }

  buildUpdateFields(updateDto: UpdateClientDto, prefix = '') {
    let updateFields = {};
    for (const key in updateDto) {
      if (updateDto.hasOwnProperty(key)) {
        const value = updateDto[key];
        const fieldKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          updateFields = { ...updateFields, ...this.buildUpdateFields(value, fieldKey) };
        } else {
          updateFields[fieldKey] = value;
        }
      }
    }
    return updateFields;
  }

  async update(id: Types.ObjectId, updateClientDto: UpdateClientDto) {
    // console.log(await this.clientModel.findById(id));
    const updateFields = this.buildUpdateFields(updateClientDto);
    return this.clientModel
      .findOneAndUpdate(
        { _id: id }, // Replace with the actual client ID
        { $set: updateFields },
        { new: true },
      )
      .lean();
  }

  async delete(id: Types.ObjectId) {
    return this.clientModel.findOneAndUpdate(
      {
        $and: [{ _id: id }, isNotDeleted],
      },
      { $set: { deletedAt: currentDate() } },
    );
  }

  deleteAllInCompany(companyId: Types.ObjectId) {
    const now = currentDate();
    return this.clientModel.updateMany(
      {
        $and: [{ 'details.companyId': companyId }, isNotDeleted],
      },
      { $set: { deletedAt: now } },
    );
  }
}
