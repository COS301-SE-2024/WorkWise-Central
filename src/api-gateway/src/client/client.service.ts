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
import { CompanyService } from '../company/company.service';
import { UsersService } from '../users/users.service';
import { Employee } from '../employee/entities/employee.entity';
import { EmployeeService } from '../employee/employee.service';
import { DeleteClientDto } from './dto/delete-client.dto';
import { JobService } from '../job/job.service';
import { ClientFeedbackDto } from './dto/client-feedback.dto';

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
    await this.userIdMatchesEmployeeId(userId, createClientDto.employeeId);
    console.log('pre');
    const check = await this.validateCreate(userId, createClientDto);
    console.log('post');
    if (!check.isValid) {
      throw new ConflictException(check.message);
    }
    const employee = await this.employeeService.findById(createClientDto.employeeId);
    if (!employee) throw new NotFoundException('Employee not found');
    createClientDto.companyId = employee.companyId as Types.ObjectId;
    const createdClient = new Client(createClientDto);
    createdClient.details.companyId = new Types.ObjectId(employee.companyId);
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
      throw new UnauthorizedException('User not in Same Company');
    return client;
  }

  async getClientByIdForClientPortal(clientId: Types.ObjectId): Promise<FlattenMaps<Client>> {
    const client = await this.clientRepository.findClientById(clientId);
    return client;
  }

  async getClientByIdInternal(clientId: Types.ObjectId): Promise<FlattenMaps<Client & { _id: Types.ObjectId }>> {
    return await this.clientRepository.findClientById(clientId);
  }

  async internalGetClientById(clientId: Types.ObjectId) {
    const client = await this.clientRepository.findClientById(clientId);
    if (!client) throw new NotFoundException('Client does not exist');
    return client;
  }

  async getByEmailOrName(userId: Types.ObjectId, companyId: Types.ObjectId, emailOrName: string) {
    if (!(await this.usersService.userIsInCompany(userId, companyId)))
      throw new UnauthorizedException('User not in Same Company');

    return await this.clientRepository.findClientsWithEmailOrName(companyId, emailOrName);
  }

  async clientExists(clientId: Types.ObjectId): Promise<boolean> {
    return await this.clientRepository.exists(clientId);
  }

  async updateClient(userId: Types.ObjectId, clientId: Types.ObjectId, updateClientDto: UpdateClientDto) {
    const inputValidated = await this.clientUpdateIsValid(updateClientDto);
    if (!inputValidated.isValid) {
      throw inputValidated.exception;
    }
    const client = await this.clientRepository.findClientById(clientId);

    const userIsInCompany = await this.usersService.userIsInCompany(userId, client.details.companyId);
    if (!userIsInCompany) throw new UnauthorizedException('User not in Same Company');

    const result = await this.clientRepository.update(clientId, updateClientDto);
    console.log('updatedClient', result);
    return result;
  }

  async softDelete(userId: Types.ObjectId, deleteClientDto: DeleteClientDto): Promise<boolean> {
    /*    await this.userIdMatchesEmployeeId(userId, deleteClientDto.employeeId);
    const client = await this.getClientById(userId, deleteClientDto.clientId);
    if (!(await this.usersService.userIsInCompany(userId, client.details.companyId)))
      throw new UnauthorizedException('User not in Company');*/

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

    const emp = await this.employeeService.findById(deleteClientDto.employeeId);
    const name = emp.userInfo.firstName + emp.userInfo.surname;
    this.jobService.removeClient(name, deleteClientDto.clientId);

    return true;
  }

  deleteAllInCompany(companyId: Types.ObjectId) {
    this.clientRepository.deleteAllInCompany(companyId);
    return true;
  }

  private async clientUpdateIsValid(client: UpdateClientDto): Promise<ValidationResultWithException> {
    if (!client) {
      return new ValidationResultWithException(false, new NotFoundException('Null Reference'));
    }
    /*
    if (client.details) {
      /!*      if (client.details.contactInfo) {
        if (client.details.contactInfo.email && client.details.companyId) {
          const exists = await this.clientRepository.findClientsWithEmailOrName(
            client.details.companyId,
            client.details.contactInfo.email,
          );
          if (!exists)
            return new ValidationResultWithException(
              false,
              new NotFoundException('Client not found'),
            );
        }
      }*!/

      if (client.details.companyId) {
        const exists = await this.companyService.companyIdExists(client.details.companyId);
        if (!exists)
          return new ValidationResultWithException(
            false,
            new ConflictException(`Invalid Company ID: ${client.details.companyId}`),
          );
      }
    } //TODO: Fix*/
    return new ValidationResultWithException(true);
  }

  private async validateCreate(userId: Types.ObjectId, createClientDto: CreateClientDto): Promise<ValidationResult> {
    if (!createClientDto.details || !createClientDto.details.companyId) {
      return new ValidationResult(false, `There are are no details`);
    }
    //Check user making request
    const user = await this.usersService.getUserById(userId);
    if (!user) return new ValidationResult(false, `User not found`);
    const userIsInCompany = await this.usersService.userIsInCompany(user._id, createClientDto.details.companyId);
    if (!userIsInCompany) {
      return new ValidationResult(false, `There are are no details`);
    }
    //Check companyId
    const companyIdIsValid = await this.companyService.companyIdExists(createClientDto.details.companyId);
    if (!companyIdIsValid) {
      return new ValidationResult(false, `Invalid Company ID: ${createClientDto.details.companyId}`);
    }

    return new ValidationResult(true);
  }
  private async userIdMatchesEmployeeId(userId: Types.ObjectId, employeeId: Types.ObjectId): Promise<void> {
    const userExists = await this.usersService.userIdExists(userId);
    if (!userExists) throw new NotFoundException('User not found');

    const employee: FlattenMaps<Employee> & { _id: Types.ObjectId } = await this.employeeService.findById(employeeId);
    if (!employee) throw new NotFoundException('Employee not found');
    if (employee.userId.toString() !== userId.toString()) throw new UnauthorizedException('Inconsistent userId');
  }

  async getListOfClientIdsUnderEmployee(employeeId: Types.ObjectId) {
    const listUnderMe = await this.employeeService.findIdsBelowMeInCompany(employeeId);
    const clientsList: Types.ObjectId[] = [];
    for (const employee of listUnderMe) {
      const clients = await this.getListOfClientIdsAssignedToEmployee(employee);
      clientsList.push(...clients);
    }
    return clientsList;
  }

  async getListOfClientIdsAssignedToEmployee(employeeId: Types.ObjectId) {
    const employee = await this.employeeService.findById(employeeId);
    const clientsList: Types.ObjectId[] = [];
    for (const jobId of employee.currentJobAssignments) {
      const job = await this.jobService.getJobById(jobId);
      if (job.clientId) {
        clientsList.push(job.clientId);
      }
    }
    return clientsList;
  }

  async getListOfClientObjectsUnderEmployee(employeeId: Types.ObjectId) {
    const listUnderMe = await this.employeeService.findIdsBelowMeInCompany(employeeId);
    const clientsList = [];
    for (const employee of listUnderMe) {
      const clients = await this.getListOfClientObjectsAssignedToEmployee(employee);
      clientsList.push(clients);
    }
    return clientsList;
  }

  async getListOfClientObjectsAssignedToEmployee(employeeId: Types.ObjectId) {
    const employee = await this.employeeService.findById(employeeId);
    const clientsList = [];
    for (const jobId of employee.currentJobAssignments) {
      const job = await this.jobService.getJobById(jobId);
      if (job.clientId) {
        const client = await this.getClientById(employee.userId, job.clientId);
        clientsList.push(client);
      }
    }
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

  async getAllRelatedJobs(clientId: Types.ObjectId) {
    const client = await this.internalGetClientById(clientId);
    if (!client) throw new NotFoundException('Client not found');
    return this.jobService.getAllCurrentJobsForClient(clientId);
  }

  async getAllCompletedJobs(clientId: Types.ObjectId) {
    const client = await this.internalGetClientById(clientId);
    if (!client) throw new NotFoundException('Client not found');
    const jobs = await this.jobService.getAllCompletedJobsForClient(clientId);
    console.log(jobs);
    return jobs;
  }

  async addFeedbackOnJob(feedbackDto: ClientFeedbackDto) {
    const job = await this.jobService.getJobById(feedbackDto.jobId);
    if (!job) throw new NotFoundException('Job not found');
    const client = await this.internalGetClientById(feedbackDto.clientId);
    if (!client) throw new NotFoundException('Client not found');

    /*    if (job.clientFeedback) {
      if (feedbackDto.comments) job.clientFeedback.comments = feedbackDto.comments;
      if (feedbackDto.customerServiceRating)
        job.clientFeedback.customerServiceRating = feedbackDto.customerServiceRating;
      if (feedbackDto.comments) job.clientFeedback.comments = feedbackDto.comments;
    }*/

    return this.jobService.addClientFeedback(feedbackDto.jobId, {
      // Must overwrite current feedback
      clientFeedback: {
        comments: feedbackDto.comments,
        jobRating: feedbackDto.jobRating,
        customerServiceRating: feedbackDto.customerServiceRating,
        date: new Date(),
      },
    });
  }

  async getCompanyAccountDetails(clientId: Types.ObjectId) {
    const client = await this.getClientByIdInternal(clientId);
    if (!client) throw new NotFoundException('Client not found');
    const company = await this.companyService.getCompanyById(client.details.companyId);
    if (!company) throw new NotFoundException('Company not found');
    return company.accountDetails;
  }

  async getCompanyStatusNames(clientId: Types.ObjectId) {
    const client = await this.getClientByIdInternal(clientId);
    if (!client) throw new NotFoundException('Client not found');
    return this.companyService.getCompanyStatusNames(client.details.companyId);
  }
}
