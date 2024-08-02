import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import {
  AddCommentDto,
  RemoveCommentDto,
  UpdateCommentDto,
  UpdateJobDto,
  UpdateStatus,
} from './dto/update-job.dto';
import { FlattenMaps, Types } from 'mongoose';
import { Comment, Job } from './entities/job.entity';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { ClientService } from '../client/client.service';
import { JobRepository } from './job.repository';
import { EmployeeService } from '../employee/employee.service';
import { ValidationResult } from '../auth/entities/validationResult.entity';
import {
  JobAssignDto,
  JobAssignGroupDto,
  jobAssignResultDto,
} from './dto/assign-job.dto';
import { JobTagRepository } from './job-tag.repository';
import {
  CreatePriorityTagDto,
  CreateStatusDto,
  CreateTagDto,
} from './dto/create-tag.dto';
import { JobPriorityTag, JobTag } from './entities/job-tag.entity';
import { DeleteStatusDto, DeleteTagDto } from './dto/edit-tag.dto';
import { Employee } from '../employee/entities/employee.entity';
import { JobStatus } from './entities/job-status.entity';
import { ciEquals } from '../utils/Utils';

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

    // @Inject(forwardRef(() => FileService))
    // private readonly fileService: FileService,
  ) {}

  async create(createJobDto: CreateJobDto) {
    const inputValidated = await this.jobCreateIsValid(createJobDto);
    if (!inputValidated.isValid) {
      throw new ConflictException(inputValidated.message);
    }

    //Save files In Bucket, and store URLs (if provided)
    //

    // if (!createdJob.status)
    //   createdJob.status = this.jobRepository.find;

    const createdJob = new Job(createJobDto);
    console.log('createdJob', createdJob);
    return await this.jobRepository.save(createdJob);
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

  async updateWithoutValidation(
    jobId: Types.ObjectId,
    updateJobDto: UpdateJobDto,
  ) {
    try {
      const updated = await this.jobRepository.update(jobId, updateJobDto);
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

  async getAllJobsInCompany(userId: Types.ObjectId, companyId: Types.ObjectId) {
    //Basic Authentication
    //TODO: Add role-related rules if necessary
    if (!(await this.usersService.userIsInCompany(userId, companyId))) {
      throw new UnauthorizedException('User not in company');
    }
    return await this.jobRepository.findAllInCompany(companyId);
  }

  async getAllJobsInCompanyWithoutValidation(companyId: Types.ObjectId) {
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

    return this.jobRepository.findAllForEmployeeDetailed(employeeId);
  }

  async assignEmployee(userId: Types.ObjectId, jobAssignDto: JobAssignDto) {
    ///Validation
    await this.userIdMatchesEmployeeId(userId, jobAssignDto.employeeId);

    const job = await this.getJobById(jobAssignDto.jobId);
    if (!job) throw new NotFoundException('Job not found');
    const alreadyAssigned = job.assignedEmployees.employeeIds.some(
      (id) => id.toString() === jobAssignDto.employeeToAssignId.toString(),
    );
    if (alreadyAssigned) throw new ConflictException('Already Assigned');
    /// Role-based stuff
    //TODO: Implement later

    return await this.jobRepository.assignEmployee(
      jobAssignDto.employeeToAssignId,
      jobAssignDto.jobId,
    );
  }

  async unassignEmployee(userId: Types.ObjectId, jobAssignDto: JobAssignDto) {
    ///Validation
    await this.userIdMatchesEmployeeId(userId, jobAssignDto.employeeId);

    const job = await this.getJobById(jobAssignDto.jobId);
    if (!job) throw new NotFoundException('Job not found');
    const alreadyAssigned = job.assignedEmployees.employeeIds.some(
      (id) => id.toString() === jobAssignDto.employeeToAssignId.toString(),
    );
    if (!alreadyAssigned) throw new ConflictException('Employee Not Assigned');
    /// Role-based stuff
    //TODO: Implement later

    return await this.jobRepository.unassignEmployee(
      jobAssignDto.employeeToAssignId,
      jobAssignDto.jobId,
    );
  }

  private async userIdMatchesEmployeeId(
    userId: Types.ObjectId,
    employeeId: Types.ObjectId,
  ) {
    const userExists = await this.usersService.userIdExists(userId);
    if (!userExists) throw new NotFoundException('User not found');

    const employee: FlattenMaps<Employee> & { _id: Types.ObjectId } =
      await this.employeeService.findById(employeeId);
    if (!employee) throw new NotFoundException('Employee not found');
    if (employee.userId.toString() !== userId.toString())
      throw new UnauthorizedException('Inconsistent userId');
  }

  async assignEmployees(
    userId: Types.ObjectId, //TODO
    jobAssignGroupDto: JobAssignGroupDto,
  ) {
    ///Validation
    await this.userIdMatchesEmployeeId(userId, jobAssignGroupDto.employeeId);

    const job = await this.getJobById(jobAssignGroupDto.jobId);
    for (const employeeId of jobAssignGroupDto.employeesToAssignIds) {
      const exists = await this.employeeService.employeeExists(employeeId);
      if (!exists) {
        throw new NotFoundException('Employee not found');
      }
    }
    ///
    const total = jobAssignGroupDto.employeesToAssignIds.length;

    //remove duplicates
    jobAssignGroupDto.employeesToAssignIds = [
      ...new Set(jobAssignGroupDto.employeesToAssignIds),
    ];
    let pass: number = 0;

    //const result = [];
    for (const employeeId of jobAssignGroupDto.employeesToAssignIds) {
      const isInJob = job.assignedEmployees.employeeIds.some(
        (e) => e.toString() === employeeId.toString(),
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

  async unassignEmployees(
    userId: Types.ObjectId,
    jobAssignGroupDto: JobAssignGroupDto,
  ) {
    ///Validation
    await this.userIdMatchesEmployeeId(userId, jobAssignGroupDto.employeeId);

    const job = await this.getJobById(jobAssignGroupDto.jobId);
    for (const employeeId of jobAssignGroupDto.employeesToAssignIds) {
      const exists = await this.employeeService.employeeExists(employeeId);
      if (!exists) {
        throw new NotFoundException('Employee not found');
      }
    }
    ///

    for (const employeeId of jobAssignGroupDto.employeesToAssignIds) {
      const isInJob = job.assignedEmployees.employeeIds.some(
        (e) => e.toString() === employeeId.toString(),
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
    /// Validation
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const isInCompany = user.joinedCompanies.some(
      (x) => x.companyId.toString() === companyId.toString(),
    );
    if (!isInCompany) throw new UnauthorizedException('User not in Company');

    const companyExists = await this.companyService.companyIdExists(companyId);
    if (!companyExists) throw new NotFoundException('Company not found');
    ///
    return this.jobTagRepository.findAllTagsInCompany(companyId);
  }

  async getAllPriorityTagsInCompany(
    userId: Types.ObjectId,
    companyId: Types.ObjectId,
  ) {
    /// Validation
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const isInCompany = user.joinedCompanies.some(
      (x) => x.companyId.toString() === companyId.toString(),
    );
    if (!isInCompany) throw new UnauthorizedException('User not in Company');

    const companyExists = await this.companyService.companyIdExists(companyId);
    if (!companyExists) throw new NotFoundException('Company not found');
    ///
    return this.jobTagRepository.findAllPriorityTagsInCompany(companyId);
  }

  async addJobTagToCompany(
    userId: Types.ObjectId,
    createTagDto: CreateTagDto,
  ): Promise<boolean> {
    /// Validation
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const isInCompany = user.joinedCompanies.some(
      (x) => x.companyId.toString() === createTagDto.companyId.toString(),
    );
    if (!isInCompany) throw new UnauthorizedException('User not in Company');

    const companyExists = await this.companyService.companyIdExists(
      createTagDto.companyId,
    );
    if (!companyExists) throw new NotFoundException('Company not found');
    ///

    const allTags = await this.jobTagRepository.findAllTagsInCompany(
      createTagDto.companyId,
    );
    if (allTags.length > 0) {
      for (const tag of allTags) {
        if (ciEquals(createTagDto.label, tag.label)) {
          throw new ConflictException('Tag already exists in company');
        }
      }
    }

    const newTag = new JobTag(
      createTagDto.label,
      createTagDto.colour,
      createTagDto.companyId,
    );
    const savedDoc = await this.jobTagRepository.addJobTagToCompany(newTag);
    console.log(savedDoc);
    return savedDoc != null;
  }

  /*  async addJobStatusToCompany(
    userId: Types.ObjectId,
    createStatusDto: CreateStatusDto,
  ): Promise<boolean> {
    /// Validation
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const isInCompany = user.joinedCompanies.some(
      (x) => x.companyId.toString() === createStatusDto.companyId.toString(),
    );
    if (!isInCompany) throw new UnauthorizedException('User not in Company');

    const companyExists = await this.companyService.companyIdExists(
      createStatusDto.companyId,
    );
    if (!companyExists) throw new NotFoundException('Company not found');
    ///
    /// TODO: Check if it exists already

    const newStatus = new JobStatus(
      createStatusDto.status,
      createStatusDto.colour,
      createStatusDto.companyId,
    );
    const savedDoc =
      await this.jobTagRepository.addJobStatusToCompany(newStatus);
    console.log(savedDoc);
    return savedDoc != null;
  }*/

  async addJobPriorityTagToCompany(
    userId: Types.ObjectId,
    createPriorityTagDto: CreatePriorityTagDto,
  ): Promise<boolean> {
    /// Validation
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const isInCompany = user.joinedCompanies.some(
      (x) =>
        x.companyId.toString() === createPriorityTagDto.companyId.toString(),
    );
    if (!isInCompany) throw new UnauthorizedException('User not in Company');

    const companyExists = await this.companyService.companyIdExists(
      createPriorityTagDto.companyId,
    );
    if (!companyExists) throw new NotFoundException('Company not found');
    ///

    const allPriorityTags =
      await this.jobTagRepository.findAllPriorityTagsInCompany(
        createPriorityTagDto.companyId,
      );
    if (allPriorityTags.length > 0) {
      for (const tag of allPriorityTags) {
        if (ciEquals(createPriorityTagDto.label, tag.label)) {
          throw new ConflictException('Tag already exists in company');
        }
      }
    }

    const newTag = new JobPriorityTag(
      createPriorityTagDto.label,
      createPriorityTagDto.priorityLevel,
      createPriorityTagDto.colour,
      createPriorityTagDto.companyId,
    );
    const savedDoc =
      await this.jobTagRepository.addJobPriorityTagToCompany(newTag);
    console.log(savedDoc);
    return savedDoc != null;
  }

  async removeJobTagFromCompany(
    userId: Types.ObjectId,
    deleteTagDto: DeleteTagDto,
  ) {
    /// Validation
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const isInCompany = user.joinedCompanies.some(
      (x) => x.companyId.toString() === deleteTagDto.companyId.toString(),
    );
    if (!isInCompany) throw new UnauthorizedException('User not in Company');

    const companyExists = await this.companyService.companyIdExists(
      deleteTagDto.companyId,
    );
    if (!companyExists) throw new NotFoundException('Company not found');
    ///
    //TODO: Cascade delete
    const deleteResult = await this.jobTagRepository.deleteJobTag(
      deleteTagDto.tagId,
    );
    return deleteResult.acknowledged;
  }

  async removeJobPriorityTagFromCompany(
    userId: Types.ObjectId,
    deleteTagDto: DeleteTagDto,
  ) {
    /// Validation
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const isInCompany = user.joinedCompanies.some(
      (x) => x.companyId.toString() === deleteTagDto.companyId.toString(),
    );
    if (!isInCompany) throw new UnauthorizedException('User not in Company');

    const companyExists = await this.companyService.companyIdExists(
      deleteTagDto.companyId,
    );
    if (!companyExists) throw new NotFoundException('Company not found');
    ///
    //TODO: Cascade delete
    const deleteResult = await this.jobTagRepository.deletePriorityTag(
      deleteTagDto.tagId,
    );
    return deleteResult.acknowledged;
  }

  async addCommentToJob(userId: Types.ObjectId, addCommentDto: AddCommentDto) {
    await this.userIdMatchesEmployeeId(userId, addCommentDto.employeeId);

    const jobExists = await this.jobRepository.exists(addCommentDto.jobId);
    if (!jobExists) throw new NotFoundException('Job not found');

    const comment = new Comment(
      addCommentDto.employeeId,
      addCommentDto.newComment,
      false,
      new Date(),
    );

    return this.jobRepository.addComment(comment, addCommentDto.jobId);
  }

  async removeCommentFromJob(
    userId: Types.ObjectId,
    removeCommentDto: RemoveCommentDto,
  ) {
    await this.userIdMatchesEmployeeId(userId, removeCommentDto.employeeId);

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
    await this.userIdMatchesEmployeeId(userId, updateCommentDto.employeeId);

    const job = await this.getJobById(updateCommentDto.jobId);
    if (!job) throw new InternalServerErrorException('JobId not found');

    const commentExists = job.comments.some(
      (c) => c._id.toString() === updateCommentDto.commentId.toString(),
    );
    if (!commentExists)
      throw new InternalServerErrorException('CommentId not found');

    const updateResult = await this.jobRepository.editComment(
      updateCommentDto.jobId,
      updateCommentDto.commentId,
      updateCommentDto.comment,
    );
    console.log(updateResult);
    return updateResult;
  }

  ///STATUS
  async getStatusById(userId: Types.ObjectId, statusId: Types.ObjectId) {
    if (!(await this.usersService.userIdExists(userId)))
      throw new NotFoundException('User not found');
    return this.jobTagRepository.findStatusById(statusId);
  }

  private async getStatusByIdWithoutValidation(statusId: Types.ObjectId) {
    return this.jobTagRepository.findStatusById(statusId);
  }

  async findAllStatusesInCompany(
    userId: Types.ObjectId,
    companyId: Types.ObjectId,
  ) {
    if (!(await this.usersService.userIdExists(userId)))
      throw new NotFoundException('User not found');
    return this.jobTagRepository.findAllStatusesInCompany(companyId);
  }

  async createDefaultStatuses(companyId: Types.ObjectId) {
    ///TODO: Validation CHECK HEX VALIDATION
    /// User exists, company exists, check for duplicates
    const noStatus = new JobStatus('No Status', '#FFFFFF', companyId);
    const archive = new JobStatus('Archive', '#b3b0b0', companyId);
    const arr: JobStatus[] = [noStatus, archive];
    for (const js of arr) {
      const exists = await this.jobTagRepository.statusNameExists(js.status);
      if (exists)
        throw new InternalServerErrorException(
          `Job Status already exists: ${js.status}`,
        );
    }
    return await this.jobTagRepository.createDefaultStatusesInCompany(arr);
  }

  async createStatus(userId: Types.ObjectId, createStatusDto: CreateStatusDto) {
    ///TODO: Validation
    /// User exists, company exists, check for duplicates
    const userExists = await this.usersService.userIdExists(userId);
    if (!userExists) throw new NotFoundException('User not found');
    const companyExists = await this.companyService.companyIdExists(
      createStatusDto.companyId,
    );
    if (!companyExists) throw new NotFoundException('Company not found');
    const exists = await this.jobTagRepository.statusNameExists(
      createStatusDto.status,
    );
    if (exists)
      throw new InternalServerErrorException(
        `Job Status already exists: ${createStatusDto.status}`,
      );

    ///
    const protectedStatuses = ['No status', 'Archive'];
    for (const protectedStatus of protectedStatuses) {
      if (ciEquals(protectedStatus, createStatusDto.status)) {
        throw new ConflictException(
          'You cannot alter "No status" and "Archive"',
        );
      }
    }

    const newStatus = new JobStatus(
      createStatusDto.status,
      createStatusDto.colour,
      createStatusDto.companyId,
    );
    const result = await this.jobTagRepository.createStatus(newStatus);
    //Update the company Array for kanban
    await this.companyService.addJobStatus(
      createStatusDto.companyId,
      result._id,
    );
    return result;
  }

  async updateStatus(
    userId: Types.ObjectId,
    employeeId: Types.ObjectId,
    statusId: Types.ObjectId,
    updateStatus: UpdateStatus,
  ) {
    const userExists = await this.usersService.userIdExists(userId);
    if (!userExists) throw new NotFoundException('User not found');

    // Role stuff

    const protectedStatuses = ['No status', 'Archive'];
    const status = await this.getStatusByIdWithoutValidation(statusId);
    if (status == null) throw new NotFoundException('Status not found');
    for (const protectedStatus of protectedStatuses) {
      if (ciEquals(protectedStatus, status.status)) {
        throw new ConflictException(
          'You cannot alter "No status" and "Archive"',
        );
      }
    }
    return await this.jobTagRepository.updateStatus(statusId, updateStatus);
  }

  async deleteStatus(userId: Types.ObjectId, deleteStatusDto: DeleteStatusDto) {
    const userExists = await this.usersService.userIdExists(userId);
    if (!userExists) throw new NotFoundException('User not found');

    // Role stuff

    const protectedStatuses = ['No status', 'Archive'];
    const status = await this.getStatusByIdWithoutValidation(
      deleteStatusDto.statusId,
    );
    if (status == null) throw new NotFoundException('Status not found');
    for (const protectedStatus of protectedStatuses) {
      if (ciEquals(protectedStatus, status.status)) {
        throw new ConflictException(
          'You cannot alter "No status" and "Archive"',
        );
      }
    }

    return await this.jobTagRepository.deleteStatus(
      deleteStatusDto.statusId,
      deleteStatusDto.companyId,
    );
  }
}
