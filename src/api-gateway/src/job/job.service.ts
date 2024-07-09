import {
  Injectable,
  ServiceUnavailableException,
  forwardRef,
  Inject,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateJobDto, CreateJobResponseDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FlattenMaps, Types } from 'mongoose';
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
    private readonly jobRepository: JobRepository,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private readonly companyService: CompanyService,
    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,
    private readonly clientService: ClientService,
  ) {}

  async create(createJobDto: CreateJobDto) {
    const inputValidated = await this.jobCreateIsValid(createJobDto);
    if (!inputValidated.isValid) {
      throw new ConflictException(inputValidated.message);
    }
    const createdJob = new Job(createJobDto);
    console.log('createdJob', createdJob);
    const result = await this.jobRepository.save(createdJob);
    return new CreateJobResponseDto(result);
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
      return await this.jobRepository.findAll();
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException(error);
    }
  }

  async jobExists(id: string): Promise<boolean> {
    const result: FlattenMaps<Job> & { _id: Types.ObjectId } =
      await this.jobRepository.exists(id);
    //console.log('jobExists -> ', result);
    return result != null;
  }

  async jobExistsInCompany(id: string, companyId: string): Promise<boolean> {
    const result: FlattenMaps<Job> & { _id: Types.ObjectId } =
      await this.jobRepository.existsInCompany(id, companyId);

    console.log('jobExists -> ', result);
    return result != null;
  }

  /*  async GetJobWithEmployees(jobId: Types.ObjectId) {
    const job: Job = await this.findJobById(jobId);
    const employees = [];
    for (const assignedEmployee of job.assignedEmployees) {
      employees.push(this.employeeService.findOne(assignedEmployee));
    }
    //Strip everything except profile details
    //Create some Dto specifically showing Job+ Employee details array?
    //return that dto
  }*/

  async update(
    userId: Types.ObjectId,
    id: Types.ObjectId,
    updateJobDto: UpdateJobDto,
  ) {
    const inputValidated = await this.jobUpdateIsValid(
      userId,
      id,
      updateJobDto,
    );
    if (!inputValidated.isValid) {
      console.log(inputValidated.message);
      throw new ConflictException(inputValidated.message);
    }

    try {
      const updated = await this.jobRepository.update(id, updateJobDto);
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

  async jobIsValid(job: Job): Promise<ValidationResult> {
    if (!job) {
      return new ValidationResult(false, 'Job is null');
    }

    if (!job.companyId || !job.assignedBy) {
      return new ValidationResult(false, 'CompanyId or assignedBy is invalid');
    }

    if (!job.companyId || !job.assignedBy) {
      return new ValidationResult(false, 'CompanyId or assignedBy is invalid');
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

  async jobCreateIsValid(job: CreateJobDto): Promise<ValidationResult> {
    if (!job) {
      return new ValidationResult(false, 'Job is null');
    }

    if (!job.companyId || !job.assignedBy) {
      return new ValidationResult(false, 'CompanyId or assignedBy is invalid');
    }

    const exists = await this.employeeService.employeeExists(job.assignedBy);
    const isInCompany = await this.companyService.employeeIsInCompany(
      job.companyId,
      job.assignedBy,
    );
    if (!isInCompany) {
      return new ValidationResult(false, 'AssignedBy is not in company');
    }

    if (!exists) {
      return new ValidationResult(false, 'Employee is not in company');
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

  async jobUpdateIsValid(
    userId: Types.ObjectId,
    jobId: Types.ObjectId,
    job: UpdateJobDto,
  ): Promise<ValidationResult> {
    const jobInDb = await this.jobRepository.findOne(jobId);
    console.log(job);
    if (!jobInDb) {
      return new ValidationResult(false, 'Job is null');
    }

    const user = await this.usersService.getUserById(userId);
    if (!user) return new ValidationResult(false, 'User not found');

    let userCanAccessJob = false;
    for (const joinedCompany of user.joinedCompanies) {
      if (joinedCompany.companyId.toString() === jobInDb.companyId.toString()) {
        userCanAccessJob = true;
        break;
      }
    }

    if (!userCanAccessJob) {
      return new ValidationResult(
        false,
        'Assigned By is invalid or Employee is not in company',
      );
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

    return new ValidationResult(true);
  }

  async GetAllJobsInCompany(userId: Types.ObjectId, companyId: Types.ObjectId) {
    //Basic Authentication
    //TODO: Add role-related rules if necessary
    if (!(await this.companyService.userIsInCompany(userId, companyId))) {
      throw new UnauthorizedException('User not in company');
    }
    return await this.jobRepository.findAllInCompany(companyId);
  }

  async GetAllJobsForUser(
    userId: Types.ObjectId,
  ): Promise<(FlattenMaps<Job> & { _id: Types.ObjectId })[]> {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    const arrOfJobs: (FlattenMaps<Job> & { _id: Types.ObjectId })[] = [];
    for (const joinedCompany of user.joinedCompanies) {
      const jobsForEmployee = await this.GetAllJobsForEmployee(
        userId,
        joinedCompany.employeeId,
      );
      arrOfJobs.push.apply(jobsForEmployee);
    }
    return arrOfJobs; //TODO: Test
  }

  async GetAllJobsForEmployee(
    userId: Types.ObjectId,
    employeeId: Types.ObjectId,
  ): Promise<(FlattenMaps<Job> & { _id: Types.ObjectId })[]> {
    if (!(await this.usersService.userIdExists(userId))) {
      throw new NotFoundException('User not found');
    }
    if (
      !(await this.usersService.userIsInSameCompanyAsEmployee(
        userId,
        employeeId,
      ))
    ) {
      throw new UnauthorizedException('User not in Same Company');
    }

    return this.jobRepository.findAllForEmployee(employeeId);
  }
}
