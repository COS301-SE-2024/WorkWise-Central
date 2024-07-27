import {
  Injectable,
  ServiceUnavailableException,
  forwardRef,
  Inject,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateJobDto, CreateJobResponseDto } from './dto/create-job.dto';
import {
  AddCommentDto,
  RemoveCommentDto,
  UpdateCommentDto,
  UpdateJobDto,
} from './dto/update-job.dto';
import { FlattenMaps, Types } from 'mongoose';
import { Job } from './entities/job.entity';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { ClientService } from '../client/client.service';
import { JobRepository } from './job.repository';
import { EmployeeService } from '../employee/employee.service';
import { ValidationResult } from '../auth/entities/validationResult.entity';
import { FileService } from '../file/file.service';
import {
  JobAssignDto,
  JobAssignGroupDto,
  jobAssignResultDto,
} from './dto/assign-job.dto';
import { JobTagRepository } from './job-tag.repository';
import { CreatePriorityTagDto, CreateTagDto } from './dto/create-tag.dto';
import { JobPriorityTag, JobTag } from './entities/job-tag.entity';
import { DeleteTagDto } from './dto/edit-tag.dto';

@Injectable()
export class JobService {
  constructor(
    private readonly jobRepository: JobRepository,
    private readonly jobTagRepository: JobTagRepository,

    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,

    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,

    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,

    @Inject(forwardRef(() => ClientService))
    private readonly clientService: ClientService,

    @Inject(forwardRef(() => FileService))
    private readonly fileService: FileService,
  ) {}

  async create(createJobDto: CreateJobDto) {
    const inputValidated = await this.jobCreateIsValid(createJobDto);
    if (!inputValidated.isValid) {
      throw new ConflictException(inputValidated.message);
    }

    //Save files In Bucket, and store URLs (if provided)
    //

    const createdJob = new Job(createJobDto);
    console.log('createdJob', createdJob);
    const result = await this.jobRepository.save(createdJob);
    return new CreateJobResponseDto(result);
  }
  async getJobById(
    identifier: Types.ObjectId,
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

  async jobExists(id: Types.ObjectId): Promise<boolean> {
    const result: FlattenMaps<Job> & { _id: Types.ObjectId } =
      await this.jobRepository.exists(id);
    //console.log('jobExists -> ', result);
    return result != null;
  }

  async jobExistsInCompany(
    id: Types.ObjectId,
    companyId: Types.ObjectId,
  ): Promise<boolean> {
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

  async softDelete(id: Types.ObjectId): Promise<boolean> {
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
      if (joinedCompany.companyId.equals(jobInDb.companyId)) {
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

  async getAllJobsInCompany(userId: Types.ObjectId, companyId: Types.ObjectId) {
    //Basic Authentication
    //TODO: Add role-related rules if necessary
    if (!(await this.usersService.userIsInCompany(userId, companyId))) {
      throw new UnauthorizedException('User not in company');
    }
    return await this.jobRepository.findAllInCompany(companyId);
  }

  async getAllDetailedJobsInCompany(
    userId: Types.ObjectId,
    companyId: Types.ObjectId,
  ) {
    //Basic Authentication
    //TODO: Add role-related rules if necessary
    if (!(await this.usersService.userIsInCompany(userId, companyId))) {
      throw new UnauthorizedException('User not in company');
    }

    return await this.jobRepository.findAllInCompanyDetailed(companyId);
  }

  async getAllJobsForUser(
    userId: Types.ObjectId,
  ): Promise<(FlattenMaps<Job> & { _id: Types.ObjectId })[]> {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    const arrOfJobs: (FlattenMaps<Job> & { _id: Types.ObjectId })[] = [];
    for (const joinedCompany of user.joinedCompanies) {
      const jobsForEmployee = await this.getAllJobsForEmployee(
        userId,
        joinedCompany.employeeId,
      );
      arrOfJobs.push.apply(jobsForEmployee);
    }
    return arrOfJobs; //TODO: Test
  }

  async getAllJobsForEmployee(
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

  async getAllDetailedJobsForEmployee(
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

  async getAllForEmployeeDetailed(
    userId: Types.ObjectId,
    jobId: Types.ObjectId,
  ) {
    ///Validation
    const user = await this.usersService.getUserById(userId);
    const job = await this.getJobById(jobId);

    if (user == null) throw new NotFoundException('User not found');
    if (job == null) throw new NotFoundException('Job not found');
    const relatedCompany = user.joinedCompanies
      .filter((x) => x.companyId.toString() === job.companyId.toString())
      .pop(); //sus, but users must only have one employee per company
    /*    let valid = false;
    for (const joinedCompany of user.joinedCompanies) {
      if (
        job.assignedBy.toString() == joinedCompany.employeeId.toString() ||
        job.assignedEmployees.employeeIds.includes(joinedCompany.employeeId)
      ) {
        valid = true;
        break;
      }
    }
    if (!valid) throw new NotAcceptableException('user not related to job');*/
    ///

    //
    return this.jobRepository.findAllForEmployeeDetailed(
      relatedCompany.employeeId,
    );
  }

  async assignEmployee(
    userId: Types.ObjectId,
    employeeId: Types.ObjectId,
    jobId: Types.ObjectId,
  ) {
    ///Validation
    const userExists = await this.usersService.userIdExists(userId);
    if (!userExists) throw new NotFoundException('User not found');

    ///
    //TODO: Implement later
    console.log(employeeId);
    console.log(jobId);
  }

  async assignEmployees(
    userId: Types.ObjectId, //TODO
    jobAssignGroupDto: JobAssignGroupDto,
  ) {
    ///Validation

    //// User validation
    const job = await this.getJobById(jobAssignGroupDto.jobId);
    for (const employeeId of jobAssignGroupDto.employeeIds) {
      const exists = await this.employeeService.employeeExists(employeeId);
      if (!exists) {
        throw new NotFoundException('Employee not found');
      }
    }
    ///
    const total = jobAssignGroupDto.employeeIds.length;

    //remove duplicates
    jobAssignGroupDto.employeeIds = [...new Set(jobAssignGroupDto.employeeIds)];
    let pass: number = 0;

    //const result = [];
    for (const employeeId of jobAssignGroupDto.employeeIds) {
      const isInJob = job.assignedEmployees.employeeIds.some((e) =>
        e.equals(employeeId),
      );

      if (!isInJob) {
        await this.jobRepository.assignEmployee(
          employeeId,
          jobAssignGroupDto.jobId,
        );
        pass++;
      }
    }
    return new jobAssignResultDto({
      passed: pass,
      failed: total - pass,
    });
  }

  async unassignEmployee(userId: Types.ObjectId, jobAssignDto: JobAssignDto) {
    ///Validation
    ///
    return this.jobRepository.unassignEmployee(
      jobAssignDto.employeeId,
      jobAssignDto.jobId,
    );
  }
  async unassignEmployees(
    userId: Types.ObjectId,
    jobAssignGroupDto: JobAssignGroupDto,
  ) {
    ///Validation

    //// User validation //TODO
    const job = await this.getJobById(jobAssignGroupDto.jobId);
    for (const employeeId of jobAssignGroupDto.employeeIds) {
      const exists = await this.employeeService.employeeExists(employeeId);
      if (!exists) {
        throw new NotFoundException('Employee not found');
      }
    }
    ///

    for (const employeeId of jobAssignGroupDto.employeeIds) {
      const isInJob = job.assignedEmployees.employeeIds.some((e) =>
        e.equals(employeeId),
      );

      if (isInJob) {
        const result = await this.jobRepository.unassignEmployee(
          employeeId,
          jobAssignGroupDto.jobId,
        );
        console.log(result);
      }
    }
    return true;
  }

  async getAllTagsInCompany(userId: Types.ObjectId, companyId: Types.ObjectId) {
    const company = await this.companyService.companyIdExists(companyId);
    if (!company) throw new NotFoundException('Company not found');
    return this.jobTagRepository.findAllTagsInCompany(companyId);
  }

  async getAllPriorityTagsInCompany(
    userId: Types.ObjectId,
    companyId: Types.ObjectId,
  ) {
    return this.jobTagRepository.findAllPriorityTagsInCompany(companyId);
  }

  async addJobTagToCompany(
    userId: Types.ObjectId,
    createTagDto: CreateTagDto,
  ): Promise<boolean> {
    const newTag = new JobTag(
      createTagDto.label,
      createTagDto.colour,
      createTagDto.companyId,
    );
    const savedDoc = this.jobTagRepository.addJobTagToCompany(newTag);
    console.log(savedDoc);
    return savedDoc != null;
  }

  async addJobPriorityTagToCompany(
    userId: Types.ObjectId,
    createPriorityTagDto: CreatePriorityTagDto,
  ): Promise<boolean> {
    const newTag = new JobPriorityTag(
      createPriorityTagDto.label,
      createPriorityTagDto.priorityLevel,
      createPriorityTagDto.colour,
      createPriorityTagDto.companyId,
    );
    const savedDoc = this.jobTagRepository.addJobPriorityTagToCompany(newTag);
    console.log(savedDoc);
    return savedDoc != null;
  }

  async removeJobTagFromCompany(
    userId: Types.ObjectId,
    deleteTagDto: DeleteTagDto,
  ) {
    const deleteResult = await this.jobTagRepository.deleteJobTag(
      deleteTagDto.tagId,
    );
    return deleteResult.acknowledged;
  }

  async removeJobPriorityTagFromCompany(
    userId: Types.ObjectId,
    deleteTagDto: DeleteTagDto,
  ) {
    const deleteResult = await this.jobTagRepository.deletePriorityTag(
      deleteTagDto.tagId,
    );
    return deleteResult.acknowledged;
  }

  async addCommentToJob(userId: Types.ObjectId, addCommentDto: AddCommentDto) {
    const userExists = await this.usersService.userIdExists(userId);
    if (!userExists) throw new NotFoundException('User not found');

    const jobExists = await this.jobRepository.exists(addCommentDto.jobId);
    if (!jobExists) throw new NotFoundException('Job not found');

    return this.jobRepository.addComment(
      addCommentDto.comment,
      addCommentDto.jobId,
    );
  }

  async removeCommentFromJob(
    userId: Types.ObjectId,
    removeCommentDto: RemoveCommentDto,
  ) {
    const userExists = await this.usersService.userIdExists(userId);
    if (!userExists) throw new NotFoundException('User not found');

    const jobExists = await this.jobRepository.exists(removeCommentDto.jobId);
    if (!jobExists) throw new NotFoundException('Job not found');

    return this.jobRepository.removeComment(
      removeCommentDto.jobId,
      removeCommentDto.commentId,
    );
  }

  async editCommentInJob(
    userId: Types.ObjectId,
    updateCommentDto: UpdateCommentDto,
  ) {
    const user = this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const job = await this.getJobById(updateCommentDto.jobId);
    if (!job) throw new InternalServerErrorException('JobId not found');

    const commentExists = job.comments.some((c) =>
      c._id.equals(updateCommentDto.commentId),
    );
    if (!commentExists)
      throw new InternalServerErrorException('CommentId not found');

    const updateResult = await this.jobRepository.editComment(
      updateCommentDto.jobId,
      updateCommentDto.commentId,
      updateCommentDto.comment,
    );
    console.log(updateResult);
    return true;
  }
}
