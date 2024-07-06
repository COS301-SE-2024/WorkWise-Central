import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientRepository } from './client.repository';
import {
  ValidationResult,
  ValidationResultWithException,
} from '../auth/entities/validationResult.entity';
import { CompanyService } from '../company/company.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    private readonly clientRepository: ClientRepository,
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
  ) {}

  async create(
    createClientDto: CreateClientDto,
  ): Promise<Client & { _id: Types.ObjectId }> {
    console.log('createClientDto', createClientDto);
    const createdClient = new Client(createClientDto);
    return await this.clientRepository.saveClient(createdClient);
  }

  async getAllClients() {
    try {
      return this.clientRepository.findAll();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Clients could not be retrieved');
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
    const result = await this.clientRepository.findClientByEmailOrName(
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
    const inputValidated = await this.clientUpdateIsValid(updateClientDto);
    if (!inputValidated.isValid) {
      throw inputValidated.exception;
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

  async clientUpdateIsValid(
    client: UpdateClientDto,
  ): Promise<ValidationResultWithException> {
    if (!client) {
      return new ValidationResultWithException(
        false,
        new NotFoundException('Null Reference'),
      );
    }

    if (client.details) {
      if (client.details) {
        if (client.details.contactInfo.email && client.details.companyId) {
          const exists = await this.clientRepository.findClientByEmailOrName(
            client.details.companyId,
            client.details.contactInfo.email,
          );
          if (!exists)
            return new ValidationResultWithException(
              false,
              new NotFoundException('Client not found'),
            );
        }

        if (client.details.companyId) {
          const exists = await this.companyService.companyIdExists(
            client.details.companyId,
          );
          if (!exists)
            return new ValidationResultWithException(
              false,
              new ConflictException(
                `Invalid Company ID: ${client.details.companyId}`,
              ),
            );
        }
      }
    }
    return new ValidationResultWithException(true);
  }

  async clientIsValid(
    //Will have to check this
    client: Client | CreateClientDto,
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
