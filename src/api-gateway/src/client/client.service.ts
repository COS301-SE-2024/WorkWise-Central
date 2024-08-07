import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateClientDto } from './dto/update-client.dto';
import { FlattenMaps, Types } from 'mongoose';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientRepository } from './client.repository';
import { ValidationResult, ValidationResultWithException } from '../auth/entities/validationResult.entity';
import { ValidationResult, ValidationResultWithException } from '../auth/entities/validationResult.entity';
import { CompanyService } from '../company/company.service';
import { UsersService } from '../users/users.service';
import { Employee } from '../employee/entities/employee.entity';
import { EmployeeService } from '../employee/employee.service';
import { DeleteClientDto } from './dto/delete-client.dto';
import { JobService } from '../job/job.service';

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,

    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,

    @Inject(forwardRef(() => JobService))
    private readonly jobService: JobService,
  ) {}

  async create(userId: Types.ObjectId, createClientDto: CreateClientDto): Promise<Client & { _id: Types.ObjectId }> {
  async create(userId: Types.ObjectId, createClientDto: CreateClientDto): Promise<Client & { _id: Types.ObjectId }> {
    await this.userIdMatchesEmployeeId(userId, createClientDto.employeeId);
    const check = await this.validateCreate(userId, createClientDto);
    if (!check.isValid) {
      throw new ConflictException(check.message);
    }
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

  async getAllClientsInCompany(userId: Types.ObjectId, companyId: Types.ObjectId) {
    const userIsInCompany = await this.usersService.userIsInCompany(userId, companyId);
  async getAllClientsInCompany(userId: Types.ObjectId, companyId: Types.ObjectId) {
    const userIsInCompany = await this.usersService.userIsInCompany(userId, companyId);
    if (!userIsInCompany) {
      throw new UnauthorizedException('User or Employee is Null');
    }
    return this.clientRepository.findAllInCompany(companyId);
  }

  async getClientById(
    //TODO:Add role enforcement later
    userId: Types.ObjectId,
    clientId: Types.ObjectId,
  ): Promise<FlattenMaps<Client>> {
    const client = await this.clientRepository.findClientById(clientId);
    if (!client) throw new NotFoundException('Client does not exist');

    if (!(await this.usersService.userIsInCompany(userId, client.details.companyId)))
    if (!(await this.usersService.userIsInCompany(userId, client.details.companyId)))
      throw new UnauthorizedException('User not in Same Company');

    const result = await this.clientRepository.findClientById(clientId);

    if (result == null) {
      throw new NotFoundException('Client not found');
    }
    return result;
  }

  async getByEmailOrName(userId: Types.ObjectId, companyId: Types.ObjectId, emailOrName: string) {
    const clients = await this.clientRepository.findClientByEmailOrName(companyId, emailOrName);
  async getByEmailOrName(userId: Types.ObjectId, companyId: Types.ObjectId, emailOrName: string) {
    const clients = await this.clientRepository.findClientByEmailOrName(companyId, emailOrName);
    if (!clients) throw new NotFoundException('Client does not exist');

    const company = await this.companyService.getCompanyById(companyId);
    if (!company) throw new NotFoundException('Company');

    if (!(await this.usersService.userIsInCompany(userId, companyId)))
      throw new UnauthorizedException('User not in Same Company');

    return clients;
  }

  async clientExists(id: Types.ObjectId): Promise<boolean> {
    return await this.clientRepository.exists(id);
  }

  async updateClient(userId: Types.ObjectId, clientId: Types.ObjectId, updateClientDto: UpdateClientDto) {
  async updateClient(userId: Types.ObjectId, clientId: Types.ObjectId, updateClientDto: UpdateClientDto) {
    const inputValidated = await this.clientUpdateIsValid(updateClientDto);
    if (!inputValidated.isValid) {
      throw inputValidated.exception;
    }

    const client = await this.getClientById(userId, clientId);

    if (!(await this.usersService.userIsInCompany(userId, client.details.companyId)))
    if (!(await this.usersService.userIsInCompany(userId, client.details.companyId)))
      throw new UnauthorizedException('User not in Same Company');

    const result = await this.clientRepository.update(clientId, updateClientDto);
    const result = await this.clientRepository.update(clientId, updateClientDto);
    console.log('updatedClient', result);
    return result;
  }

  async softDelete(userId: Types.ObjectId, deleteClientDto: DeleteClientDto): Promise<boolean> {
  async softDelete(userId: Types.ObjectId, deleteClientDto: DeleteClientDto): Promise<boolean> {
    await this.userIdMatchesEmployeeId(userId, deleteClientDto.employeeId);
    const client = await this.getClientById(userId, deleteClientDto.clientId);
    if (!(await this.usersService.userIsInCompany(userId, client.details.companyId)))
    if (!(await this.usersService.userIsInCompany(userId, client.details.companyId)))
      throw new UnauthorizedException('User not in Company');

    const employee: Employee = await this.employeeService.findById(deleteClientDto.employeeId);
    const allJobs = await this.jobService.getAllJobsInCompanyWithoutValidation(employee.companyId);
    const employee: Employee = await this.employeeService.findById(deleteClientDto.employeeId);
    const allJobs = await this.jobService.getAllJobsInCompanyWithoutValidation(employee.companyId);

    for (const job of allJobs) {
      if (job.clientId.equals(deleteClientDto.clientId)) {
        await this.jobService.updateWithoutValidation(job._id, {
          clientId: null, //Remove reference to client
        });
      }
    }

    const result = await this.clientRepository.delete(deleteClientDto.clientId);
    if (result == null) {
      throw new InternalServerErrorException('Internal server Error');
    }
    return true;
  }

  private async clientUpdateIsValid(client: UpdateClientDto): Promise<ValidationResultWithException> {
  private async clientUpdateIsValid(client: UpdateClientDto): Promise<ValidationResultWithException> {
    if (!client) {
      return new ValidationResultWithException(false, new NotFoundException('Null Reference'));
      return new ValidationResultWithException(false, new NotFoundException('Null Reference'));
    }

    if (client.details) {
      /*      if (client.details.contactInfo) {
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
      }*/

      if (client.details.companyId) {
        const exists = await this.companyService.companyIdExists(client.details.companyId);
        const exists = await this.companyService.companyIdExists(client.details.companyId);
        if (!exists)
          return new ValidationResultWithException(
            false,
            new ConflictException(`Invalid Company ID: ${client.details.companyId}`),
            new ConflictException(`Invalid Company ID: ${client.details.companyId}`),
          );
      }
    }
    return new ValidationResultWithException(true);
  }

  private async clientIsValid(
    //Will have to check this
    client: Client | CreateClientDto,
  ): Promise<ValidationResult> {
    if (client.details) {
      if (client.details.companyId) {
        const exists = await this.companyService.companyIdExists(client.details.companyId);
        if (!exists) return new ValidationResult(false, `Invalid Company ID: ${client.details.companyId}`);
        const exists = await this.companyService.companyIdExists(client.details.companyId);
        if (!exists) return new ValidationResult(false, `Invalid Company ID: ${client.details.companyId}`);
      }
    }

    return new ValidationResult(true);
  }

  private async validateCreate(userId: Types.ObjectId, createClientDto: CreateClientDto): Promise<ValidationResult> {
  private async validateCreate(userId: Types.ObjectId, createClientDto: CreateClientDto): Promise<ValidationResult> {
    if (!createClientDto.details || !createClientDto.details.companyId) {
      return new ValidationResult(false, `There are are no details`);
    }
    //Check user making request
    const user = await this.usersService.getUserById(userId);
    let userIsInCompany = false;
    for (const joinedCompany of user.joinedCompanies) {
      if (joinedCompany.companyId.toString() === createClientDto.details.companyId.toString()) {
      if (joinedCompany.companyId.toString() === createClientDto.details.companyId.toString()) {
        userIsInCompany = true;
      }
    }
    if (!userIsInCompany) {
      return new ValidationResult(false, `There are are no details`);
    }
    //Check companyId
    const companyIdIsValid = await this.companyService.companyIdExists(createClientDto.details.companyId);
    const companyIdIsValid = await this.companyService.companyIdExists(createClientDto.details.companyId);
    if (!companyIdIsValid) {
      return new ValidationResult(false, `Invalid Company ID: ${createClientDto.details.companyId}`);
      return new ValidationResult(false, `Invalid Company ID: ${createClientDto.details.companyId}`);
    }

    return new ValidationResult(true);
  }
  private async userIdMatchesEmployeeId(userId: Types.ObjectId, employeeId: Types.ObjectId) {
  private async userIdMatchesEmployeeId(userId: Types.ObjectId, employeeId: Types.ObjectId) {
    const userExists = await this.usersService.userIdExists(userId);
    if (!userExists) throw new NotFoundException('User not found');

    const employee: FlattenMaps<Employee> & { _id: Types.ObjectId } = await this.employeeService.findById(employeeId);
    const employee: FlattenMaps<Employee> & { _id: Types.ObjectId } = await this.employeeService.findById(employeeId);
    if (!employee) throw new NotFoundException('Employee not found');
    if (!employee.userId.equals(userId)) throw new UnauthorizedException('Inconsistent userId');
  }

  async getListOfClientIdsUnderEmployee(employeeId: Types.ObjectId) {
    const listUnderMe = await this.employeeService.findIdsBelowMeInCompany(employeeId);
    const clientsList: Types.ObjectId[] = [];
    listUnderMe.forEach(async (employee) => {
      const clients = await this.getListOfClientIdsAssignedToEmployee(employee);
      clientsList.push(...clients);
    });
    return clientsList;
  }

  async getListOfClientIdsAssignedToEmployee(employeeId: Types.ObjectId) {
    const employee = await this.employeeService.findById(employeeId);
    const clientsList: Types.ObjectId[] = [];
    employee.currentJobAssignments.forEach(async (jobId) => {
      const job = await this.jobService.getJobById(jobId);
      if (job.clientId) {
        clientsList.push(job.clientId);
      }
    });
    return clientsList;
  }

  async getListOfClientObjectsUnderEmployee(employeeId: Types.ObjectId) {
    const listUnderMe = await this.employeeService.findIdsBelowMeInCompany(employeeId);
    const clientsList = [];
    listUnderMe.forEach(async (employee) => {
      const clients = await this.getListOfClientObjectsAssignedToEmployee(employee);
      clientsList.push(clients);
    });
    return clientsList;
  }

  async getListOfClientObjectsAssignedToEmployee(employeeId: Types.ObjectId) {
    const employee = await this.employeeService.findById(employeeId);
    const clientsList = [];
    employee.currentJobAssignments.forEach(async (jobId) => {
      const job = await this.jobService.getJobById(jobId);
      if (job.clientId) {
        const client = await this.getClientById(employee.userId, job.clientId);
        clientsList.push(client);
      }
    });
    return clientsList;
  }

  async clientIsBelowCurrentEmployee(currentEmployee: Types.ObjectId, clientId: Types.ObjectId) {
    const list = await this.getListOfClientIdsUnderEmployee(currentEmployee);
    return list.includes(clientId);
  }

  async clientIsAssignedToCurrentEmployee(currentEmployee: Types.ObjectId, clientId: Types.ObjectId) {
    const list = await this.getListOfClientIdsAssignedToEmployee(currentEmployee);
    return list.includes(clientId);
  }
}
