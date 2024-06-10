import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FlattenMaps, Model, Types } from 'mongoose';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel('client') private readonly clientModel: Model<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    console.log('createClientDto', createClientDto);
    const createdClient = new Client(createClientDto);
    const newClient = new this.clientModel(createdClient);
    const result = await newClient.save();

    return `Client: "${result.details.firstName} ${result.details.surname}" has been created`;
  }

  async findAllClients() {
    try {
      return this.clientModel.find().lean().exec();
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Clients could not be retrieved');
    }
  }

  async findClientById(
    //TODO:Add role enforcement later
    identifier: string,
  ): Promise<FlattenMaps<Client> & { _id: Types.ObjectId }> {
    const result: FlattenMaps<Client> & { _id: Types.ObjectId } =
      await this.clientModel
        .findOne({
          $and: [
            { _id: identifier },
            {
              $or: [{ deleted_at: null }, { deleted_at: { $exists: false } }],
            },
          ],
        })
        .lean();

    if (result == null) {
      throw new NotFoundException('Client not found');
    }

    return result;
  }

  async findByEmailOrName(companyId: Types.ObjectId, identifier: string) {
    const regex = `*${identifier}*`;
    const searchTerm = new RegExp(regex, 'i');

    const result = await this.clientModel
      .find({
        $and: [
          { companyId: companyId },
          {
            $or: [
              { 'clientInfo.email': { $regex: searchTerm } },
              { 'details.firstName': { $regex: searchTerm } },
              { 'details.surname': { $regex: searchTerm } },
            ],
          },
          {
            $or: [{ deleted_at: null }, { deleted_at: { $exists: false } }],
          },
        ],
      })
      .lean();

    if (result == null) {
      throw new NotFoundException('Client not found');
    }
    console.log(result);
    return result;
  }

  async clientExists(id: string): Promise<boolean> {
    const result: FlattenMaps<Client> & { _id: Types.ObjectId } =
      await this.clientModel
        .findOne({
          $and: [
            { _id: id },
            {
              $or: [{ deleted_at: null }, { deleted_at: { $exists: false } }],
            },
          ],
        })
        .lean();

    console.log('clientExists -> ', result);
    return result == null;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    console.log(updateClientDto);
    return `This action updates a #${id} client`;
  }

  async softDelete(id: string): Promise<boolean> {
    const result: Document<unknown, NonNullable<unknown>, Client> &
      Client & { _id: Types.ObjectId } =
      await this.clientModel.findOneAndUpdate(
        {
          $and: [
            { _id: id },
            {
              $or: [{ deleted_at: null }, { deleted_at: { $exists: false } }],
            },
          ],
        },
        { $set: { deleted_at: new Date() } },
      );

    if (result == null) {
      throw new InternalServerErrorException('Internal server Error');
    }
    return true;
  }
}
