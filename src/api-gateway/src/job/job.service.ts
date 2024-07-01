import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { CreateJobDto, CreateJobResponseDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';
import { Job } from './entities/job.entity';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { ClientService } from '../client/client.service';
import { JobRepository } from './job.repository';
import { EmployeeService } from '../employee/employee.service';
import { ValidationResult } from '../auth/entities/validationResult.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectModel(Job.name)
    private readonly jobModel: Model<Job>,
    private readonly jobRepository: JobRepository,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private readonly companyService: CompanyService,
    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,
    private readonly clientService: ClientService,
  ) {}

  async create(createJobDto: CreateJobDto) {
    const inputValidated = await this.jobIsValid(createJobDto);
    if (!inputValidated.isValid) {
      throw new NotFoundException(inputValidated.message);
    }

    const createdJob = new Job(createJobDto);
    console.log('createdJob', createdJob);
    const newJob = new this.jobModel(createdJob);
    const result = await newJob.save();

    return new CreateJobResponseDto(result);

    /*    return {
      id: result._id,
      message: `Job: "${result.details.heading}", by "${result.assignedBy} has been created`,
    };*/
  }

  async authorisedToAssign(userId: Types.ObjectId, companyId: Types.ObjectId) {
    //const user = await this.usersService.getUserById(userId);
    /*    if (!user.joinedCompanies.includes(companyId))
      throw new NotFoundException(
        'User does is not an employee of the company',
      );*/
    /*    const validRolesInCompany = user.roles.filter(
      (role) =>
        role.companyId == companyId && this.authorisedList.includes(role.role),
    );*/

    /*    if (validRolesInCompany.length == 0) {
      throw new UnauthorizedException(
        'User does not have an appropriate role in the company',
      );
    }*/

    const result = await this.companyService.getCompanyById(companyId);
    return result.employees.includes(userId);
  }

  async isMember(userId: Types.ObjectId, companyId: Types.ObjectId) {
    const result = await this.companyService.getCompanyById(companyId);
    return result.employees.includes(userId);
  }

  async findJobById(
    identifier: string,
  ): Promise<FlattenMaps<Job> & { _id: Types.ObjectId }> {
    const result: FlattenMaps<Job> & { _id: Types.ObjectId } =
      await this.jobRepository.findById(identifier);

    if (result == null) {
      throw new NotFoundException('Job not found');
    }

    return result;
  }

  async findAllJobs() {
    try {
      return this.jobRepository.findAll();
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException(error);
    }
  }

  async jobExists(id: string): Promise<boolean> {
    const result: FlattenMaps<Job> & { _id: Types.ObjectId } =
      await this.jobRepository.exists(id);

    console.log('jobExists -> ', result);
    return result != null;
  }

  async jobExistsInCompany(id: string, companyId: string): Promise<boolean> {
    const result: FlattenMaps<Job> & { _id: Types.ObjectId } =
      await this.jobRepository.existsInCompany(id, companyId);

    console.log('jobExists -> ', result);
    return result != null;
  }

  async update(id: string | Types.ObjectId, updateJobDto: UpdateJobDto) {
    const inputValidated = await this.jobIsValid(updateJobDto);
    if (!inputValidated.isValid)
      throw new NotFoundException(inputValidated.message);

    try {
      const updated = this.jobRepository.update(id, updateJobDto);
      console.log('updatedJob', updated);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  async softDelete(id: string): Promise<boolean> {
    await this.jobRepository.delete(id);
    return true;
  }

  async jobIsValid(
    job: Job | CreateJobDto | UpdateJobDto,
  ): Promise<ValidationResult> {
    if (job.assignedBy) {
      if (!job.companyId || !job.assignedBy) {
        return new ValidationResult(
          false,
          'CompanyId or assignedBy is invalid',
        );
      }

      const exists = await this.employeeService.employeeExists(job.assignedBy);
      const isInCompany = await this.companyService.employeeIsInCompany(
        job.companyId,
        job.assignedBy,
      );
      if (!exists || !isInCompany) {
        return new ValidationResult(
          false,
          'Assigned By is invalid or Employee is not in company',
        );
      }
    }
    if (job.assignedEmployees) {
      for (const employee of job.assignedEmployees.employeeIds) {
        const exists = await this.employeeService.employeeExists(employee);
        if (!exists) {
          return new ValidationResult(false, `Employee: ${employee} Not found`);
        }
      }
    }

    if (job.clientId) {
      const exists = await this.clientService.clientExists(job.clientId);
      if (!exists) {
        return new ValidationResult(false, 'Client does not exist');
      }
    }

    if (job.companyId) {
      const exists = await this.companyService.companyIdExists(job.companyId);
      if (!exists) {
        return new ValidationResult(
          false,
          `Company: ${job.companyId} Not found`,
        );
      }
    }

    return new ValidationResult(true);
  }
}
