import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientRepository } from './client.repository';
import { ValidationResult } from '../auth/entities/validationResult.entity';
import { CompanyService } from '../company/company.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    private readonly clientRepository: ClientRepository,
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
  ) {}

  async create(createClientDto: CreateClientDto) {
    console.log('createClientDto', createClientDto);
    const createdClient = new Client(createClientDto);
    const newClient = new this.clientModel(createdClient);
    const result = await newClient.save();
    console.log(result);
    return `Client: "${result.details.name}" has been created`;
  }

  async getAllClients() {
    try {
      return this.clientModel.find().lean().exec();
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Clients could not be retrieved');
    }
  }

  async getClientById(
    //TODO:Add role enforcement later
    identifier: string,
  ): Promise<FlattenMaps<Client>> {
    const result: FlattenMaps<Client> =
      await this.clientRepository.findClientById(identifier);

    if (result == null) {
      throw new NotFoundException('Client not found');
    }
    return result;
  }

  async getByEmailOrName(companyId: Types.ObjectId, identifier: string) {
    const result = await this.clientRepository.findByEmailOrName(
      companyId,
      identifier,
    );

    if (result == null) {
      throw new NotFoundException('Client not found');
    }
    console.log(result);
    return result;
  }

  async clientExists(id: string | Types.ObjectId): Promise<boolean> {
    return await this.clientRepository.exists(id);
  }

  async updateClient(id: Types.ObjectId, updateClientDto: UpdateClientDto) {
    const inputValidated = await this.clientIsValid(updateClientDto);
    if (!inputValidated.isValid) {
      throw new NotFoundException(inputValidated.message);
    }

    const result = await this.clientRepository.update(id, updateClientDto);
    console.log('updatedClient', result);
    return result;
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await this.clientRepository.delete(id);

    if (result == null) {
      throw new InternalServerErrorException('Internal server Error');
    }
    return true;
  }

  async clientIsValid(
    client: Client | CreateClientDto | UpdateClientDto,
  ): Promise<ValidationResult> {
    if (client.details) {
      if (client.details.companyId) {
        const exists = await this.companyService.companyIdExists(
          client.details.companyId,
        );
        if (!exists)
          return new ValidationResult(
            false,
            `Invalid Company ID: ${client.details.companyId}`,
          );
      }
    }

    return new ValidationResult(true);
  }
}
