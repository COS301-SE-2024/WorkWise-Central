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
import { AssignedEmployees, CreateJobDto } from './dto/create-job.dto';
import { AddFeedbackDto, UpdateJobDto } from './dto/update-job.dto';
import { FlattenMaps, Types } from 'mongoose';
import { Comment, History, Job, Task } from './entities/job.entity';
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
  JobAssignTeamDto,
  TaskAssignDto,
} from './dto/assign-job.dto';
import { JobTagRepository } from './job-tag.repository';
import { CreatePriorityTagDto, CreateStatusDto, CreateTagDto } from './dto/create-tag.dto';
import { JobPriorityTag, JobTag } from './entities/job-tag.entity';
import { DeleteStatusDto, DeleteTagDto, UpdatePriorityTagDto, UpdateTagDto } from './dto/edit-tag.dto';
import { JobStatus } from './entities/job-status.entity';
import { ciEquals } from '../utils/Utils';
import { FileService } from '../file/file.service';
import { AddCommentDto, RemoveCommentDto, UpdateCommentDto } from './dto/job-comments.dto';
import { AddTaskDto, RemoveTaskDto, UpdateTaskDto } from './dto/job-tasks.dto';
import { UpdateStatus } from './dto/job-status.dto';
import { UpdatePriorityTag, UpdateTag } from './dto/job-tag.dto';
import { AddAttachmentDto, UpdateAttachmentDto } from './dto/job-attachment.dto';
import { AddTaskItemDto, RemoveTaskItemDto, UpdateTaskItemDto } from './dto/job-task-item.dto';
import { ConvertItemToJobDto } from './dto/convert-item-to-job.dto';
import { NotificationService } from '../notification/notification.service';
import { Message } from '../notification/entities/notification.entity';
import { EmailService } from '../email/email.service';
import { TeamService } from '../team/team.service';

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

    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationService,

    @Inject(forwardRef(() => EmailService))
    private readonly emailService: EmailService,

    @Inject(forwardRef(() => TeamService))
    private readonly teamService: TeamService,
  ) {}

  async create(userId: Types.ObjectId, createJobDto: CreateJobDto) {
    const inputValidated = await this.jobCreateIsValid(createJobDto);
    if (!inputValidated.isValid) {
      throw new ConflictException(inputValidated.message);
    }

    /*    if (createJobDto.coverImage) {
      const uploadApiResponse = await this.fileService.uploadBase64Image(createJobDto.coverImage);
      if (uploadApiResponse.secure_url) {
        console.log('Upload successful');
        createJobDto.coverImage = uploadApiResponse.secure_url;
      } else {
        console.log('Failed to upload image.', 'Keep it pushing');
        //return null;
      }
    }*/
    if (createJobDto.coverImage) {
      const result = await this.fileService.saveBase64File(createJobDto.coverImage);
      console.log(result);
      if (result.success == true) createJobDto.coverImage = result.url;
      else throw new InternalServerErrorException('Failed to save CoverImage file upload');
    }

    const user = await this.usersService.getUserById(userId);

    //Save files In Bucket, and store URLs (if provided)
    //
    if (createJobDto.status == null) {
      //console.log(await this.jobTagRepository.findAllStatusesInCompany(createJobDto.companyId));
      createJobDto.status = (await this.jobTagRepository.findStatusByLabel(createJobDto.companyId, 'No Status'))._id;
    }

    const createdJob = new Job(createJobDto);

    const event = `${user.personalInfo.firstName} ${user.personalInfo.surname} created this job: ${createdJob.details.heading}`;
    createdJob.history.push(new History(event));

    //console.log('createdJob', createdJob);
    const result = await this.jobRepository.save(createdJob);
    this.assignEmployeesWithoutValidation(result._id, createJobDto.assignedEmployees.employeeIds);
    if (result.clientId) {
      const client = await this.clientService.getClientByIdInternal(result.clientId);
      const companyName = await this.companyService.getCompanyNameById(client.details.companyId);
      if (client.details.contactInfo.email != null) {
        this.emailService.sendClientPortalLink(
          client._id,
          client.details.contactInfo.email,
          client.details.firstName,
          client.details.lastName,
          companyName,
          result.details.heading,
        );
      }
    }
    return result;
  }

  async getJobById(identifier: Types.ObjectId): Promise<FlattenMaps<Job> & { _id: Types.ObjectId }> {
    const result: FlattenMaps<Job> & { _id: Types.ObjectId } = await this.jobRepository.findById(identifier);

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

  async findAllJobsForEmployee(employeeId: Types.ObjectId) {
    try {
      return await this.jobRepository.findAllForEmployee(employeeId);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException(error);
    }
  }

  async findAllJobsForClient(clientId: Types.ObjectId) {
    try {
      return await this.jobRepository.findAllForClient(clientId);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException(error);
    }
  }

  async jobExistsInCompany(id: Types.ObjectId, companyId: Types.ObjectId): Promise<boolean> {
    const result: FlattenMaps<Job> & { _id: Types.ObjectId } = await this.jobRepository.existsInCompany(id, companyId);

    console.log('jobExists -> ', result);
    return result != null;
  }

  async update(userId: Types.ObjectId, id: Types.ObjectId, updateJobDto: UpdateJobDto) {
    const inputValidated = await this.jobUpdateIsValid(userId, id, updateJobDto);
    if (!inputValidated.isValid) {
      console.log(inputValidated.message);
      throw new ConflictException(inputValidated.message);
    }

    try {
      /*      if (updateJobDto.coverImage) {
        const uploadApiResponse = await this.fileService.uploadBase64Image(updateJobDto.coverImage);
        if (uploadApiResponse.secure_url) {
          console.log('Upload successful');
          updateJobDto.coverImage = uploadApiResponse.secure_url;
        } else {
          console.log('Failed to upload image.', 'Keep it pushing');
          //return null;
        }
      }*/
      if (updateJobDto.coverImage) {
        const result = await this.fileService.saveBase64File(updateJobDto.coverImage);
        console.log(result);
        if (result.success == true) updateJobDto.coverImage = result.url;
        else throw new InternalServerErrorException('Failed to save CoverImage file upload');
      }

      const updated = await this.jobRepository.update(id, updateJobDto);
      if (updateJobDto.clientId) {
        const client = await this.clientService.getClientByIdInternal(updated.clientId);
        const companyName = await this.companyService.getCompanyNameById(client.details.companyId);
        if (client.details.contactInfo.email != null) {
          this.emailService.sendClientPortalLink(
            client._id,
            client.details.contactInfo.email,
            client.details.firstName,
            client.details.lastName,
            companyName,
            updated.details.heading,
          );
        }
      }
      return await this.jobRepository.findById(updated._id);
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateWithoutValidation(jobId: Types.ObjectId, updateJobDto: UpdateJobDto) {
    try {
      const updated = await this.jobRepository.update(jobId, updateJobDto);
      console.log('updatedJob', updated);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  async softDelete(id: Types.ObjectId): Promise<boolean> {
    let recipientArray: Types.ObjectId[] = [];
    const job = await this.getJobById(id);
    if (!job) throw new NotFoundException('Job not found');
    //Unassign all employees
    ///from jobs
    for (const employeeId of job.assignedEmployees.employeeIds) {
      recipientArray.push(employeeId);
      const employee = await this.employeeService.findById(employeeId);
      employee.currentJobAssignments = employee.currentJobAssignments.filter(
        (ass) => ass.toString() === employeeId.toString(),
      );
      this.employeeService.internalUpdate(employeeId, {
        currentJobAssignments: employee.currentJobAssignments,
      });
    }
    ///from taskItems
    for (const task of job.taskList) {
      for (const item of task.items) {
        for (const employeeId of item.assignedEmployees) {
          recipientArray.push(employeeId);
          const employee = await this.employeeService.findById(employeeId);
          if (!employee) continue;
          employee.currentJobAssignments = employee.currentJobAssignments.filter(
            (ass) => ass.toString() === employeeId.toString(),
          );
          this.employeeService.internalUpdate(employeeId, {
            currentJobAssignments: employee.currentJobAssignments,
          });
        }
      }
    }
    recipientArray = [...new Set(recipientArray)];
    this.sendDeleteNotifications(recipientArray, job);
    this.jobRepository.delete(id);
    return true;
  }

  private async sendDeleteNotifications(
    recipientArray: Types.ObjectId[],
    job: FlattenMaps<Job> & { _id: Types.ObjectId },
  ) {
    const finalArr: Types.ObjectId[] = [];
    const empArray = await this.employeeService.findByIdsInternalForJobs(recipientArray);

    for (const emp of empArray) {
      finalArr.push(emp.userId);
    }
    const company = await this.companyService.getCompanyById(job.companyId);
    const message = new Message(`New Job Update`, `You have been unassigned from job: ${job.details.heading}`);
    this.notificationService.create({
      recipientIds: finalArr,
      message: message,
      companyName: company?.name,
      isJobRelated: true,
    });
  }

  async deleteAllWithCompanyId(companyId: Types.ObjectId): Promise<boolean> {
    console.log(`Deleting all Jobs in ${companyId}`);
    this.jobRepository.deleteAllInCompany(companyId);
    return true;
  }

  async jobCreateIsValid(job: CreateJobDto): Promise<ValidationResult> {
    if (!job) {
      return new ValidationResult(false, 'Job is null');
    }

    if (!job.companyId || !job.assignedBy) {
      return new ValidationResult(false, 'CompanyId or assignedBy is invalid');
    }

    const [exists, isInCompany] = await Promise.all([
      this.employeeService.employeeExists(job.assignedBy),
      this.companyService.employeeIsInCompany(job.companyId, job.assignedBy),
    ]);

    if (!isInCompany) {
      return new ValidationResult(false, 'AssignedBy is not in company');
    }

    if (!exists) {
      return new ValidationResult(false, 'Employee is not in company');
    }

    if (job.assignedEmployees && job.assignedEmployees.employeeIds.length > 0) {
      const employeeChecks = await Promise.all(
        job.assignedEmployees.employeeIds.map((employee) => this.employeeService.employeeExists(employee)),
      );

      for (let i = 0; i < employeeChecks.length; i++) {
        if (!employeeChecks[i]) {
          return new ValidationResult(false, `Employee: ${job.assignedEmployees.employeeIds[i]} Not found`);
        }
      }
    }

    if (job.clientId) {
      const clientExists = await this.clientService.clientExists(job.clientId);
      if (!clientExists) {
        return new ValidationResult(false, 'Client does not exist');
      }
    }

    if (job.companyId) {
      const companyExists = await this.companyService.companyIdExists(job.companyId);
      if (!companyExists) {
        return new ValidationResult(false, `Company: ${job.companyId} Not found`);
      }
    }

    return new ValidationResult(true);
  }

  async jobUpdateIsValid(userId: Types.ObjectId, jobId: Types.ObjectId, job: UpdateJobDto): Promise<ValidationResult> {
    const [jobInDb, user] = await Promise.all([
      this.jobRepository.findOne(jobId),
      this.usersService.getUserById(userId),
    ]);

    if (!jobInDb) {
      return new ValidationResult(false, 'Job is null');
    }

    if (!user) {
      return new ValidationResult(false, 'User not found');
    }

    const userCanAccessJob = user.joinedCompanies.some(
      (joinedCompany) => joinedCompany.companyId.toString() === jobInDb.companyId.toString(),
    );

    if (!userCanAccessJob) {
      return new ValidationResult(false, 'Assigned By is invalid or Employee is not in company');
    }

    if (job.clientId) {
      const clientExists = await this.clientService.clientExists(job.clientId);
      if (!clientExists) {
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

  async getAllDetailedJobsInCompany(userId: Types.ObjectId, companyId: Types.ObjectId) {
    //Basic Authentication
    //TODO: Add role-related rules if necessary
    if (!(await this.usersService.userIsInCompany(userId, companyId))) {
      throw new UnauthorizedException('User not in company');
    }

    return await this.jobRepository.findAllInCompanyDetailed(companyId);
  }

  async getAllJobsForUser(userId: Types.ObjectId): Promise<(FlattenMaps<Job> & { _id: Types.ObjectId })[]> {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    const arrOfJobs: (FlattenMaps<Job> & { _id: Types.ObjectId })[] = [];
    for (const joinedCompany of user.joinedCompanies) {
      const jobsForEmployee = await this.getAllJobsForEmployee(userId, joinedCompany.employeeId);
      arrOfJobs.push.apply(jobsForEmployee);
    }
    return arrOfJobs; //TODO: Test
  }

  async getAllJobsForEmployee(
    userId: Types.ObjectId,
    employeeId: Types.ObjectId,
  ): Promise<(FlattenMaps<Job> & { _id: Types.ObjectId })[]> {
    const [userExists, userInSameCompany] = await Promise.all([
      this.usersService.userIdExists(userId),
      this.usersService.userIsInSameCompanyAsEmployee(userId, employeeId),
    ]);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    if (!userInSameCompany) {
      throw new UnauthorizedException('User not in Same Company');
    }

    return this.jobRepository.findAllForEmployee(employeeId);
  }

  async getAllDetailedJobsForEmployee(
    userId: Types.ObjectId,
    employeeId: Types.ObjectId,
  ): Promise<(FlattenMaps<Job> & { _id: Types.ObjectId })[]> {
    const [userExists, userInSameCompany] = await Promise.all([
      this.usersService.userIdExists(userId),
      this.usersService.userIsInSameCompanyAsEmployee(userId, employeeId),
    ]);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    if (!userInSameCompany) {
      throw new UnauthorizedException('User not in Same Company');
    }

    return this.jobRepository.findAllForEmployeeDetailed(employeeId);
  }

  async assignTeam(userId: Types.ObjectId, assignDto: JobAssignTeamDto) {
    const [user, job] = await Promise.all([this.usersService.getUserById(userId), this.getJobById(assignDto.jobId)]);

    if (!job) throw new NotFoundException('Job not found');
    if (!user) throw new NotFoundException('User not found');

    if (!user.joinedCompanies.some((j) => j.companyId.toString() === job.companyId.toString())) {
      throw new UnauthorizedException('User not in company');
    }

    const alreadyAssigned = job.assignedEmployees.teamIds.some((id) => id.toString() === assignDto.teamId.toString());
    if (alreadyAssigned) throw new ConflictException('Team Already Assigned');

    // Get team
    const team = await this.teamService.findById(assignDto.teamId);
    if (!team) throw new NotFoundException('Team not found');

    const result = await this.jobRepository.assignTeam(assignDto.teamId, assignDto.jobId, team.teamMembers);
    team.currentJobAssignments.push(job._id);
    team.currentJobAssignments = [...new Set(team.currentJobAssignments)];
    await this.employeeService.internalUpdate(team._id, {
      currentJobAssignments: team.currentJobAssignments,
    });
    if (user) {
      const event = `${user.personalInfo.firstName} ${user.personalInfo.surname} Assigned Team: ${team.teamName} to this job`;
      this.jobRepository.addHistory(new History(event), result._id);
      job.history.push(new History(event));
    }

    // Assign to each employee in team
    this.assignEmployeesInTeam(team.teamMembers, job);

    return job;
  }

  async unassignTeam(userId: Types.ObjectId, unassignDto: JobAssignTeamDto) {
    const [user, job] = await Promise.all([this.usersService.getUserById(userId), this.getJobById(unassignDto.jobId)]);

    if (!job) throw new NotFoundException('Job not found');
    if (!user) throw new NotFoundException('User not found');

    if (!user.joinedCompanies.some((j) => j.companyId.toString() == job.companyId.toString())) {
      throw new UnauthorizedException('User not in company');
    }

    const teamMembers = (await this.teamService.findById(unassignDto.teamId))?.teamMembers;
    if (!teamMembers) throw new NotFoundException('Team not found');

    this.unassignEmployeesInternal(teamMembers, unassignDto.jobId);
  }

  async assignEmployee(userId: Types.ObjectId, jobAssignDto: JobAssignDto) {
    // Validation
    await this.userIdMatchesEmployeeId(userId, jobAssignDto.employeeId);

    const [job, user] = await Promise.all([this.getJobById(jobAssignDto.jobId), this.usersService.getUserById(userId)]);

    if (!job) throw new NotFoundException('Job not found');

    //console.log(job);

    if (
      job.assignedEmployees.employeeIds.some(
        (employee) => employee._id.toString() === jobAssignDto.employeeToAssignId.toString(),
      )
    ) {
      throw new ConflictException('Already Assigned');
    } else {
      console.log('looks good to me');
    }

    // Role-based stuff
    // TODO: Implement later
    const result = await this.jobRepository.assignEmployee(jobAssignDto.employeeToAssignId, jobAssignDto.jobId);
    const otherEmployee = await this.employeeService.findById(jobAssignDto.employeeToAssignId);

    const assignedJobs = [...otherEmployee.currentJobAssignments, job._id];
    await this.employeeService.internalUpdate(otherEmployee._id, {
      currentJobAssignments: assignedJobs,
    });

    if (otherEmployee.userInfo) {
      const event = `${user.personalInfo.firstName} ${user.personalInfo.surname} Assigned ${otherEmployee.userInfo.firstName} ${otherEmployee.userInfo.surname} to this job`;
      const historyUpdate = await this.jobRepository.addHistory(new History(event), result._id);
      console.log(historyUpdate);
    }

    const company = await this.companyService.getCompanyById(otherEmployee.companyId);
    this.notificationService.create({
      recipientIds: [otherEmployee.userId],
      message: new Message(`New Job Assignment`, `You have been assigned to a new job: ${job.details.heading}`),
      companyName: company?.name,
      isJobRelated: true,
    });

    return this.jobRepository.findById(result._id);
  }

  async assignEmployeesInTeam(members: Types.ObjectId[], job: Job & { _id: Types.ObjectId }) {
    for (const memberId of members) {
      if (job.assignedEmployees.employeeIds.some((emp) => emp._id.toString() === memberId.toString())) {
        members = members.filter((m) => m.toString() !== memberId.toString());
      }
    }
    /// Role-based stuff
    //TODO: Implement later
    await this.jobRepository.assignEmployees(members, job._id);
    const company = await this.companyService.getCompanyById(job.companyId);
    const message = new Message(`New Job Assignment`, `You have been assigned to a new job: ${job.details.heading}`);

    for (const member of members) {
      const otherEmployee = await this.employeeService.findById(member);
      const assignedJobs = otherEmployee.currentJobAssignments;
      assignedJobs.push(job._id);
      this.employeeService.internalUpdate(otherEmployee._id, {
        currentJobAssignments: assignedJobs,
      });
      this.notificationService.create({
        recipientIds: [otherEmployee.userId],
        message: message,
        companyName: company?.name,
        isJobRelated: true,
      });
    }
  }

  async assignEmployeeToTaskItem(userId: Types.ObjectId, taskAssignDto: TaskAssignDto) {
    ///Validation
    await this.userIdMatchesEmployeeId(userId, taskAssignDto.employeeId);

    const job = await this.getJobById(taskAssignDto.jobId);
    if (!job) throw new NotFoundException('Job not found');

    console.log(job);

    if (!job.taskList) {
      throw new ConflictException('TaskList is Empty');
    }

    if (job.taskList) {
      //This may break💀
      for (const task of job.taskList) {
        console.log(task);
        if (task._id.toString() === taskAssignDto.taskId.toString()) {
          for (const item of task.items) {
            if (item.assignedEmployees) {
              for (const assignedEmployee of item.assignedEmployees) {
                if (assignedEmployee.toString() === taskAssignDto.employeeToAssignId.toString()) {
                  throw new ConflictException('Already Assigned');
                } else {
                  console.log('looks good to me');
                }
              }
            }
          }
        }
      }
    }

    /// Role-based stuff
    //TODO: Implement later

    const result = await this.jobRepository.assignEmployeeToTaskItem(
      taskAssignDto.employeeToAssignId,
      taskAssignDto.jobId,
      taskAssignDto.taskId,
      taskAssignDto.itemId,
    );
    const user = await this.usersService.getUserById(userId);
    const otherEmployee = await this.employeeService.findById(taskAssignDto.employeeToAssignId);
    const currentTaskAssignments = otherEmployee.currentTaskAssignments;
    currentTaskAssignments.push(taskAssignDto.taskId);
    await this.employeeService.internalUpdate(otherEmployee._id, {
      currentTaskAssignments: currentTaskAssignments,
    });
    if (otherEmployee.userInfo) {
      //TODO: FIX later
      const event = `${user.personalInfo.firstName} ${user.personalInfo.surname} Assigned Task: ${taskAssignDto.taskId} to ${otherEmployee?.userInfo?.firstName} ${otherEmployee?.userInfo?.surname}`;
      const historyUpdate = await this.jobRepository.addHistory(new History(event), result._id);
      console.log(historyUpdate);
    }
    this.sendAssignForTaskItem(job, taskAssignDto);
    return result;
  }

  private async sendAssignForTaskItem(job: FlattenMaps<Job> & { _id: Types.ObjectId }, taskAssignDto: TaskAssignDto) {
    const company = await this.companyService.getCompanyById(job.companyId);
    const message = new Message(`New Job Update`, `You have been assign to a new job TaskItem: ${job.details.heading}`);
    const emp = await this.employeeService.findById(taskAssignDto.employeeToAssignId);
    this.notificationService.create({
      recipientIds: [emp.userId],
      message: message,
      companyName: company?.name,
      isJobRelated: true,
    });
  }

  async unassignEmployeeFromTaskItem(userId: Types.ObjectId, taskAssignDto: TaskAssignDto) {
    ///Validation
    await this.userIdMatchesEmployeeId(userId, taskAssignDto.employeeId);

    const job = await this.getJobById(taskAssignDto.jobId);
    if (!job) throw new NotFoundException('Job not found');

    console.log(job);

    if (!job.taskList) {
      throw new ConflictException('TaskList is Empty');
    }

    if (job.taskList) {
      //This may break💀
      for (const task of job.taskList) {
        console.log(task);
        if (task._id.toString() === taskAssignDto.taskId.toString()) {
          for (const item of task.items) {
            if (item.assignedEmployees) {
              for (const assignedEmployee of item.assignedEmployees) {
                if (assignedEmployee.toString() === taskAssignDto.employeeToAssignId.toString()) {
                  throw new ConflictException('Already Assigned');
                } else {
                  console.log('looks good to me');
                }
              }
            }
          }
        }
      }
    }

    /// Role-based stuff
    //TODO: Implement later

    const result = await this.jobRepository.unassignEmployeeFromTaskItem(
      taskAssignDto.employeeToAssignId,
      taskAssignDto.jobId,
      taskAssignDto.taskId,
      taskAssignDto.itemId,
    );
    const user = await this.usersService.getUserById(userId);
    const otherEmployee = await this.employeeService.findById(taskAssignDto.employeeToAssignId);
    const currentTaskAssignments = otherEmployee.currentTaskAssignments;
    currentTaskAssignments.filter((t) => t.toString() !== taskAssignDto.taskId.toString());
    await this.employeeService.internalUpdate(otherEmployee._id, {
      currentTaskAssignments: currentTaskAssignments,
    });
    if (otherEmployee.userInfo) {
      //TODO: FIX later
      const event = `${user.personalInfo.firstName} ${user.personalInfo.surname} Unassigned Task: ${taskAssignDto.taskId} from ${otherEmployee?.userInfo?.firstName} ${otherEmployee?.userInfo?.surname}`;
      const historyUpdate = await this.jobRepository.addHistory(new History(event), result._id);
      console.log(historyUpdate);
    }
    this.sendUnassignForTaskItem(job, taskAssignDto);
    return result;
  }

  private async sendUnassignForTaskItem(job: FlattenMaps<Job> & { _id: Types.ObjectId }, taskAssignDto: TaskAssignDto) {
    const company = await this.companyService.getCompanyById(job.companyId);
    const message = new Message(
      `New Job Update`,
      `You have been unassigned from a new job TaskItem: ${job.details.heading}`,
    );
    const emp = await this.employeeService.findById(taskAssignDto.employeeToAssignId);
    this.notificationService.create({
      recipientIds: [emp.userId],
      message: message,
      companyName: company?.name,
      isJobRelated: true,
    });
  }

  async unassignEmployee(userId: Types.ObjectId, jobAssignDto: JobAssignDto) {
    ///Validation
    await this.userIdMatchesEmployeeId(userId, jobAssignDto.employeeId);

    const job = await this.getJobById(jobAssignDto.jobId);
    if (!job) throw new NotFoundException('Job not found');
    const alreadyAssigned = job.assignedEmployees.employeeIds.some(
      (id) => id._id.toString() === jobAssignDto.employeeToAssignId.toString(),
    );
    if (!alreadyAssigned) throw new ConflictException('Employee Not Assigned');
    /// Role-based stuff
    //TODO: Implement later
    const result = await this.jobRepository.unassignEmployee(jobAssignDto.employeeToAssignId, jobAssignDto.jobId);
    const user = await this.usersService.getUserById(userId);
    const otherEmployee = await this.employeeService.findById(jobAssignDto.employeeToAssignId);
    let assignedJobs = otherEmployee.currentJobAssignments;
    assignedJobs = assignedJobs.filter((j) => j.toString() !== job._id.toString());
    this.employeeService.internalUpdate(otherEmployee._id, {
      currentJobAssignments: assignedJobs,
    });
    if (otherEmployee.userInfo) {
      //TODO: FIX later
      const event = `${user.personalInfo.firstName} ${user.personalInfo.surname} Unassigned ${otherEmployee?.userInfo?.firstName} ${otherEmployee?.userInfo?.surname} from this job`;
      const historyUpdate = await this.jobRepository.addHistory(new History(event), result._id);
      console.log(historyUpdate);
    }
    const company = await this.companyService.getCompanyById(otherEmployee.companyId);
    this.notificationService.create({
      recipientIds: [otherEmployee.userId],
      message: new Message(`You were removed from a Job`, `You have been unassigned from job: ${job.details.heading}`),
      companyName: company?.name,
      isJobRelated: true,
    });
    return this.jobRepository.findById(result._id);
  }

  private async userIdMatchesEmployeeId(userId: Types.ObjectId, employeeId: Types.ObjectId) {
    const [userExists, employee] = await Promise.all([
      this.usersService.userIdExists(userId),
      this.employeeService.findById(employeeId),
    ]);

    if (!userExists) throw new NotFoundException('User not found');
    if (!employee) throw new NotFoundException('Employee not found');
    if (employee.userId.toString() !== userId.toString()) throw new UnauthorizedException('Inconsistent userId');
  }

  async assignEmployees(userId: Types.ObjectId, jobAssignGroupDto: JobAssignGroupDto) {
    // Validation
    const [user, job] = await Promise.all([
      this.usersService.getUserById(userId),
      this.getJobById(jobAssignGroupDto.jobId),
    ]);

    if (!user) throw new NotFoundException('User not found');
    await this.userIdMatchesEmployeeId(userId, jobAssignGroupDto.employeeId);

    if (!job) throw new NotFoundException('Job not found');

    const employeeExistsChecks = await Promise.all(
      jobAssignGroupDto.employeesToAssignIds.map((employeeId) => this.employeeService.employeeExists(employeeId)),
    );

    for (let i = 0; i < employeeExistsChecks.length; i++) {
      if (!employeeExistsChecks[i]) {
        throw new NotFoundException(`Employee with ID ${jobAssignGroupDto.employeesToAssignIds[i]} not found`);
      }
    }

    const total = jobAssignGroupDto.employeesToAssignIds.length;

    // Remove duplicates
    jobAssignGroupDto.employeesToAssignIds = [...new Set(jobAssignGroupDto.employeesToAssignIds)];
    let pass = 0;

    for (const employeeId of jobAssignGroupDto.employeesToAssignIds) {
      const isInJob = job.assignedEmployees.employeeIds.some((e) => e._id.toString() === employeeId.toString());

      if (!isInJob) {
        await this.jobRepository.assignEmployee(employeeId, jobAssignGroupDto.jobId);
        const otherEmployee = await this.employeeService.findById(employeeId);

        if (otherEmployee.userInfo) {
          const event = `${user.personalInfo.firstName} ${user.personalInfo.surname} assigned ${otherEmployee.userInfo.firstName} ${otherEmployee.userInfo.surname} to this job`;
          await this.jobRepository.addHistory(new History(event), jobAssignGroupDto.jobId);
        }

        const assignedJobs = [...otherEmployee.currentJobAssignments, job._id];
        await this.employeeService.internalUpdate(otherEmployee._id, {
          currentJobAssignments: assignedJobs,
        });

        pass++;
      }
    }

    return new jobAssignResultDto({
      passed: pass,
      failed: total - pass,
    });
  }

  async assignEmployeesWithoutValidation(jobId: Types.ObjectId, employeesToAssignIds: Types.ObjectId[]) {
    ///Validation
    const job = await this.getJobById(jobId);
    for (const employeeId of employeesToAssignIds) {
      const employee = await this.employeeService.findById(employeeId);
      console.log('Assigning', employee);
      if (!employee) throw new NotFoundException('Employee not found');
    }
    ///
    const total = employeesToAssignIds.length;

    //remove duplicates
    employeesToAssignIds = [...new Set(employeesToAssignIds)];
    let pass: number = 0;

    for (const employeeId of employeesToAssignIds) {
      const isInJob = job.assignedEmployees.employeeIds.some((e) => e._id.toString() === employeeId.toString());

      if (!isInJob) {
        await this.jobRepository.assignEmployee(employeeId, jobId);
        pass++;
      }
    }
    return new jobAssignResultDto({
      passed: pass,
      failed: total - pass,
    });
  }

  async unassignEmployees(userId: Types.ObjectId, jobAssignGroupDto: JobAssignGroupDto) {
    ///Validation
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    await this.userIdMatchesEmployeeId(userId, jobAssignGroupDto.employeeId);

    const job = await this.getJobById(jobAssignGroupDto.jobId);
    for (const employeeId of jobAssignGroupDto.employeesToAssignIds) {
      const exists = await this.employeeService.employeeExists(employeeId);
      if (!exists) {
        throw new NotFoundException('Employee not found');
      }
    }

    for (const employeeId of jobAssignGroupDto.employeesToAssignIds) {
      const isInJob = job.assignedEmployees.employeeIds.some((e) => e._id.toString() === employeeId.toString());

      if (isInJob) {
        const result = await this.jobRepository.unassignEmployee(employeeId, jobAssignGroupDto.jobId);
        const otherEmployee = await this.employeeService.findById(employeeId);
        if (otherEmployee.userInfo) {
          const event = `${user.personalInfo.firstName} ${user.personalInfo.surname} unassigned ${otherEmployee?.userInfo?.firstName} ${otherEmployee?.userInfo?.surname} from this job`;
          const historyUpdate = await this.jobRepository.addHistory(new History(event), jobAssignGroupDto.jobId);
          console.log(historyUpdate);
        }
        console.log(result);
      }
    }
    return true;
  }

  async unassignEmployeesInternal(employeeIds: Types.ObjectId[], jobId: Types.ObjectId) {
    const job = await this.getJobById(jobId);
    for (const employeeId of employeeIds) {
      const exists = await this.employeeService.employeeExists(employeeId);
      if (!exists) {
        throw new NotFoundException('Employee not found');
      }
    }

    for (const employeeId of employeeIds) {
      const isInJob = job.assignedEmployees.employeeIds.some((e) => e._id.toString() === employeeId.toString());

      if (isInJob) {
        this.jobRepository.unassignEmployee(employeeId, jobId);
        const otherEmployee = await this.employeeService.findById(employeeId);
        if (otherEmployee.userInfo) {
          const event = `${otherEmployee?.userInfo?.firstName} ${otherEmployee?.userInfo?.surname} was unassigned from this job`;
          this.jobRepository.addHistory(new History(event), jobId);
        }
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async getAllTagsInCompany(userId: Types.ObjectId, companyId: Types.ObjectId) {
    /// Validation
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const isInCompany = user.joinedCompanies.some((x) => x.companyId.toString() === companyId.toString());
    if (!isInCompany) throw new UnauthorizedException('User not in Company');

    const companyExists = await this.companyService.companyIdExists(companyId);
    if (!companyExists) throw new NotFoundException('Company not found');
    ///
    return this.jobTagRepository.findAllTagsInCompany(companyId);
  }

  async getAllPriorityTagsInCompany(userId: Types.ObjectId, companyId: Types.ObjectId) {
    /// Validation
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const isInCompany = user.joinedCompanies.some((x) => x.companyId.toString() === companyId.toString());
    if (!isInCompany) throw new UnauthorizedException('User not in Company');

    const companyExists = await this.companyService.companyIdExists(companyId);
    if (!companyExists) throw new NotFoundException('Company not found');
    ///
    return this.jobTagRepository.findAllPriorityTagsInCompany(companyId);
  }

  async addJobTagToCompany(userId: Types.ObjectId, createTagDto: CreateTagDto) {
    /// Validation
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const isInCompany = user.joinedCompanies.some((x) => x.companyId.toString() === createTagDto.companyId.toString());
    if (!isInCompany) throw new UnauthorizedException('User not in Company');

    const companyExists = await this.companyService.companyIdExists(createTagDto.companyId);
    if (!companyExists) throw new NotFoundException('Company not found');
    ///

    const allTags = await this.jobTagRepository.findAllTagsInCompany(createTagDto.companyId);
    if (allTags.length > 0) {
      for (const tag of allTags) {
        if (ciEquals(createTagDto.label, tag.label)) {
          throw new ConflictException('Tag already exists in company');
        }
      }
    }

    const newTag = new JobTag(createTagDto.label, createTagDto.colour, createTagDto.companyId);
    const j = await this.jobTagRepository.addJobTagToCompany(newTag);
    console.log(j);
    return j;
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
  ): Promise<JobPriorityTag & { _id: Types.ObjectId } & Required<{ _id: Types.ObjectId }>> {
    /// Validation
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const isInCompany = user.joinedCompanies.some(
      (x) => x.companyId.toString() === createPriorityTagDto.companyId.toString(),
    );
    if (!isInCompany) throw new UnauthorizedException('User not in Company');

    const companyExists = await this.companyService.companyIdExists(createPriorityTagDto.companyId);
    if (!companyExists) throw new NotFoundException('Company not found');
    ///

    const allPriorityTags = await this.jobTagRepository.findAllPriorityTagsInCompany(createPriorityTagDto.companyId);
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
    const savedDoc = await this.jobTagRepository.addJobPriorityTagToCompany(newTag);
    console.log(savedDoc);
    return savedDoc;
  }

  async removeJobTagFromCompany(userId: Types.ObjectId, deleteTagDto: DeleteTagDto) {
    /// Validation
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const isInCompany = user.joinedCompanies.some((x) => x.companyId.toString() === deleteTagDto.companyId.toString());
    if (!isInCompany) throw new UnauthorizedException('User not in Company');

    const companyExists = await this.companyService.companyIdExists(deleteTagDto.companyId);
    if (!companyExists) throw new NotFoundException('Company not found');
    ///
    const jobsInCompany = await this.jobRepository.findAllInCompany(deleteTagDto.companyId);
    for (const job of jobsInCompany) {
      if (job.tags) {
        const newTags = job.tags.filter((t) => t.toString() !== deleteTagDto.tagId.toString());
        await this.jobRepository.update(job._id, {
          tags: newTags,
        });
      }
    }

    const deleteResult = await this.jobTagRepository.deleteJobTag(deleteTagDto.tagId);
    return deleteResult.acknowledged;
  }

  async removeJobPriorityTagFromCompany(userId: Types.ObjectId, deleteTagDto: DeleteTagDto) {
    /// Validation
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const isInCompany = user.joinedCompanies.some((x) => x.companyId.toString() === deleteTagDto.companyId.toString());
    if (!isInCompany) throw new UnauthorizedException('User not in Company');

    const companyExists = await this.companyService.companyIdExists(deleteTagDto.companyId);
    if (!companyExists) throw new NotFoundException('Company not found');
    ///
    const jobsInCompany = await this.jobRepository.findAllInCompany(deleteTagDto.companyId);
    for (const job of jobsInCompany) {
      if (job.priorityTag) {
        await this.jobRepository.update(job._id, {
          priorityTag: null,
        });
      }
    }
    const deleteResult = await this.jobTagRepository.deletePriorityTag(deleteTagDto.tagId);
    return deleteResult.acknowledged;
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Comments

  async addCommentToJob(userId: Types.ObjectId, addCommentDto: AddCommentDto) {
    await this.userIdMatchesEmployeeId(userId, addCommentDto.employeeId);

    const jobExists = await this.jobRepository.exists(addCommentDto.jobId);
    if (!jobExists) throw new NotFoundException('Job not found');

    const comment = new Comment(addCommentDto.employeeId, addCommentDto.newComment, false, new Date());

    return this.jobRepository.addComment(comment, addCommentDto.jobId);
  }

  async removeCommentFromJob(userId: Types.ObjectId, removeCommentDto: RemoveCommentDto) {
    await this.userIdMatchesEmployeeId(userId, removeCommentDto.employeeId);

    const jobExists = await this.jobRepository.exists(removeCommentDto.jobId);
    if (!jobExists) throw new NotFoundException('Job not found');

    return this.jobRepository.removeComment(removeCommentDto.jobId, removeCommentDto.commentId);
  }

  async editCommentInJob(userId: Types.ObjectId, updateCommentDto: UpdateCommentDto) {
    await this.userIdMatchesEmployeeId(userId, updateCommentDto.employeeId);

    const job = await this.getJobById(updateCommentDto.jobId);
    if (!job) throw new InternalServerErrorException('JobId not found');

    const commentExists = job.comments.some((c) => c._id.toString() === updateCommentDto.commentId.toString());
    if (!commentExists) throw new InternalServerErrorException('CommentId not found');

    const updateResult = await this.jobRepository.editComment(
      updateCommentDto.jobId,
      updateCommentDto.commentId,
      updateCommentDto.comment,
    );
    console.log(updateResult);
    return updateResult;
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// STATUS
  async getStatusById(userId: Types.ObjectId, statusId: Types.ObjectId) {
    if (!(await this.usersService.userIdExists(userId))) throw new NotFoundException('User not found');
    return this.jobTagRepository.findStatusById(statusId);
  }

  async getStatusByIdInternal(statusId: Types.ObjectId) {
    return this.jobTagRepository.findStatusById(statusId);
  }

  async getStatusByLabel(companyId: Types.ObjectId, lbl: string) {
    return this.jobTagRepository.findStatusByLabel(companyId, lbl);
  }

  async getStatusByIdWithoutValidation(statusId: Types.ObjectId) {
    return this.jobTagRepository.findStatusById(statusId);
  }

  async findAllStatusesInCompany(userId: Types.ObjectId, companyId: Types.ObjectId) {
    if (!(await this.usersService.userIdExists(userId))) throw new NotFoundException('User not found');
    return this.jobTagRepository.findAllStatusesInCompany(companyId);
  }

  async findAllStatusesInCompanyInternal(companyId: Types.ObjectId) {
    return this.jobTagRepository.findAllStatusesInCompany(companyId);
  }

  async createDefaultStatuses(companyId: Types.ObjectId) {
    ///TODO: Validation CHECK HEX VALIDATION
    /// User exists, company exists, check for duplicates
    //  const protectedStatuses = ['No status', 'Archive', 'To Do', 'In Progress', 'Complete'];

    const archive = new JobStatus('Archive', '#f8a701', companyId);
    const noStatus = new JobStatus('No Status', '#f67103', companyId);
    const toDo = new JobStatus('To Do', '#304ffe', companyId);
    const inProgress = new JobStatus('In Progress', '#7a00ff', companyId);
    const requestReview = new JobStatus('Request Review', '#fcc309', companyId);
    const complete = new JobStatus('Complete', '#23d923', companyId);

    const arr: JobStatus[] = [archive, noStatus, toDo, inProgress, requestReview, complete];
    for (const js of arr) {
      const exists = await this.statusNameExistsInCompany(js.status, companyId);
      if (exists) throw new InternalServerErrorException(`Job Status already exists: ${js.status}`);
    }
    const result = await this.jobTagRepository.createDefaultStatusesInCompany(arr);
    console.log(result);
    return result;
  }

  async createDefaultPriorityTags(companyId: Types.ObjectId) {
    ///TODO: Validation CHECK HEX VALIDATION
    /// User exists, company exists, check for duplicates
    //  const protectedStatuses = ['No status', 'Archive', 'To Do', 'In Progress', 'Complete'];

    const low = new JobPriorityTag('Low', 3, '#089f6a', companyId);
    const medium = new JobPriorityTag('Medium', 2, '#ceb013', companyId);
    const high = new JobPriorityTag('High', 1, '#e01212', companyId);

    const arr: JobPriorityTag[] = [low, medium, high];
    for (const jobPriorityTag of arr) {
      const exists = await this.priorityTagExistsInCompany(jobPriorityTag.label, companyId);
      if (exists) throw new InternalServerErrorException(`Job Tag already exists: ${jobPriorityTag.label}`);
    }
    const result = await this.jobTagRepository.createDefaultPriorityTagsInCompany(arr);
    console.log(result);
    return result;
  }

  async statusNameExistsInCompany(status: string, companyId: Types.ObjectId) {
    const allStatus = await this.jobTagRepository.findAllStatusesInCompany(companyId);
    for (const stat of allStatus) {
      if (ciEquals(stat.status, status)) return true;
    }
    return false;
  }

  async priorityTagExistsInCompany(label: string, companyId: Types.ObjectId) {
    const allPTags = await this.jobTagRepository.findAllPriorityTagsInCompany(companyId);
    for (const pTag of allPTags) {
      if (ciEquals(pTag.label, label)) return true;
    }
    return false;
  }

  async createStatus(userId: Types.ObjectId, createStatusDto: CreateStatusDto) {
    ///TODO: Validation
    /// User exists, company exists, check for duplicates
    const userExists = await this.usersService.userIdExists(userId);
    if (!userExists) throw new NotFoundException('User not found');
    const companyExists = await this.companyService.companyIdExists(createStatusDto.companyId);
    if (!companyExists) throw new NotFoundException('Company not found');
    const exists = await this.statusNameExistsInCompany(createStatusDto.status, createStatusDto.companyId);
    if (exists) throw new InternalServerErrorException(`Job Status already exists: ${createStatusDto.status}`);

    ///
    const protectedStatuses = ['No status', 'Archive', 'To Do', 'In Progress', 'Complete'];
    for (const protectedStatus of protectedStatuses) {
      if (ciEquals(protectedStatus, createStatusDto.status)) {
        throw new ConflictException('You cannot alter "No status" and "Archive"');
      }
    }

    const newStatus = new JobStatus(createStatusDto.status, createStatusDto.colour, createStatusDto.companyId);
    const result = await this.jobTagRepository.createStatus(newStatus);
    //Update the company Array for kanban
    await this.companyService.addJobStatus(createStatusDto.companyId, result._id);
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
        throw new ConflictException('You cannot alter "No status" and "Archive"');
      }
    }
    return await this.jobTagRepository.updateStatus(statusId, updateStatus);
  }

  async deleteStatus(userId: Types.ObjectId, deleteStatusDto: DeleteStatusDto) {
    const userExists = await this.usersService.userIdExists(userId);
    if (!userExists) throw new NotFoundException('User not found');

    const employee = await this.employeeService.findById(deleteStatusDto.employeeId);
    if (employee == null) throw new NotFoundException('Employee not found');

    const companyExists = await this.companyService.companyIdExists(employee.companyId);
    if (!companyExists) throw new NotFoundException('Company not found');
    // Role stuff

    const protectedStatuses = ['No status', 'Archive'];
    const status = await this.getStatusByIdWithoutValidation(deleteStatusDto.statusId);
    if (status == null) throw new NotFoundException('Status not found');
    for (const protectedStatus of protectedStatuses) {
      if (ciEquals(protectedStatus, status.status)) {
        throw new ConflictException('You cannot alter "No status" and "Archive"');
      }
    }

    const resultOfDelete = await this.jobTagRepository.deleteStatus(
      deleteStatusDto.statusId,
      deleteStatusDto.companyId,
    );
    const allJobsInCompany = await this.getAllJobsInCompanyWithoutValidation(employee.companyId);
    const noStatus = await this.getStatusByLabel(deleteStatusDto.companyId, 'No Status');
    const newStatus: Types.ObjectId = noStatus ? noStatus._id : null;
    for (const job of allJobsInCompany) {
      await this.updateWithoutValidation(job._id, {
        status: newStatus,
      });
    }
    return resultOfDelete;
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Status

  async addJobTask(userId: Types.ObjectId, addTaskDto: AddTaskDto) {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    await this.userIdMatchesEmployeeId(userId, addTaskDto.employeeId);

    const jobExists = await this.jobRepository.exists(addTaskDto.jobId);
    if (!jobExists) throw new NotFoundException('Job not found');

    const task = new Task();
    task.title = addTaskDto.title;

    const event = `${user.personalInfo.firstName} ${user.personalInfo.surname} added task: ${task.title}`;
    await this.jobRepository.addHistory(new History(event), addTaskDto.jobId);

    return await this.jobRepository.addTask(task, addTaskDto.jobId);
  }

  async removeTaskFromJob(userId: Types.ObjectId, removeTaskDto: RemoveTaskDto) {
    const user = await this.usersService.getUserById(userId);
    await this.userIdMatchesEmployeeId(userId, removeTaskDto.employeeId);

    const job = await this.jobRepository.findById(removeTaskDto.jobId);
    if (!job) throw new NotFoundException('Job not found');

    const task = job.taskList.find((t) => t._id.toString() === removeTaskDto.taskId.toString());
    if (!task) throw new NotFoundException('Job not found');

    const event = `${user.personalInfo.firstName} ${user.personalInfo.surname} removed task: ${task.title}`;
    await this.jobRepository.addHistory(new History(event), removeTaskDto.jobId);

    return this.jobRepository.removeTask(removeTaskDto.jobId, removeTaskDto.taskId);
  }

  async editTaskInJob(userId: Types.ObjectId, updateTaskDto: UpdateTaskDto): Promise<Job & { _id: Types.ObjectId }> {
    await this.userIdMatchesEmployeeId(userId, updateTaskDto.employeeId);

    const jobExists = await this.jobRepository.exists(updateTaskDto.jobId);
    if (!jobExists) throw new NotFoundException('Job not found');

    return this.jobRepository.editTask(updateTaskDto.jobId, updateTaskDto.taskId, updateTaskDto.title);
  }

  async updateTag(userId: Types.ObjectId, updateTagDto: UpdateTagDto) {
    const updates: UpdateTag = new UpdateTag(updateTagDto);
    const tag = await this.jobTagRepository.updateTag(updateTagDto.tagId, updates);
    console.log(tag);
    return tag;
  }

  async updatePriorityTag(userId: Types.ObjectId, updatePriorityTagDto: UpdatePriorityTagDto) {
    const updates: UpdatePriorityTag = new UpdatePriorityTag(updatePriorityTagDto);
    return this.jobTagRepository.updatePriorityTag(updatePriorityTagDto.priorityTagId, updates);
  }

  async addAttachments(userId: Types.ObjectId, attachmentDto: AddAttachmentDto, files: Express.Multer.File[]) {
    await this.userIdMatchesEmployeeId(userId, attachmentDto.employeeId);

    const jobExists = await this.jobRepository.exists(attachmentDto.jobId);
    if (!jobExists) throw new NotFoundException('Job not found');

    const newUrls: string[] = [];
    for (const file of files) {
      const uploadApiResponse = await this.fileService.uploadFile(file);
      if (uploadApiResponse.secure_url) {
        console.log('Upload successful');
        const newUrl = uploadApiResponse.secure_url;
        console.log(newUrl);
        newUrls.push(newUrl);
      } else {
        console.log('Failed to upload image.', 'Keep it pushing');
        //return null;
      }
    }
    if (newUrls.length == 0) {
      return await this.jobRepository.findById(attachmentDto.jobId);
    }

    return this.jobRepository.addAttachments(attachmentDto.jobId, newUrls);
  }

  async updateAttachments(userId: Types.ObjectId, updateAttachmentDto: UpdateAttachmentDto) {
    await this.userIdMatchesEmployeeId(userId, updateAttachmentDto.employeeId);

    const jobExists = await this.jobRepository.exists(updateAttachmentDto.jobId);
    if (!jobExists) throw new NotFoundException('Job not found');

    return this.jobRepository.updateAttachments(updateAttachmentDto.jobId, updateAttachmentDto.attachments);
  }

  async addJobTaskItem(userId: Types.ObjectId, itemDto: AddTaskItemDto) {
    await this.userIdMatchesEmployeeId(userId, itemDto.employeeId);

    const user = await this.usersService.getUserById(userId);
    const job = await this.jobRepository.findById(itemDto.jobId);
    if (!job) throw new NotFoundException('Job not found');

    const task = job.taskList.find((t) => t._id.toString() === itemDto.taskId.toString());
    if (!task) throw new NotFoundException('Job not found');
    const event = `${user.personalInfo.firstName} ${user.personalInfo.surname} added a new item to task: ${task.title}`;
    await this.addToHistory(job._id, event);
    return this.jobRepository.addJobTaskItem(itemDto.jobId, itemDto.taskId);
  }

  async editJobTaskItem(userId: Types.ObjectId, itemDto: UpdateTaskItemDto) {
    await this.userIdMatchesEmployeeId(userId, itemDto.employeeId);

    const jobExists = await this.jobRepository.exists(itemDto.jobId);
    if (!jobExists) throw new NotFoundException('Job not found');

    return this.jobRepository.editJobTaskItem(itemDto.jobId, itemDto);
  }

  async removeJobTaskItem(userId: Types.ObjectId, itemDto: RemoveTaskItemDto) {
    await this.userIdMatchesEmployeeId(userId, itemDto.employeeId);

    const user = await this.usersService.getUserById(userId);
    const job = await this.jobRepository.findById(itemDto.jobId);
    if (!job) throw new NotFoundException('Job not found');

    const task = job.taskList.find((t) => t._id.toString() === itemDto.taskId.toString());
    if (!task) throw new NotFoundException('Job not found');
    const event = `${user.personalInfo.firstName} ${user.personalInfo.surname} removed an Item from task: ${task.title}`;
    await this.addToHistory(job._id, event);

    const jobExists = await this.jobRepository.exists(itemDto.jobId);
    if (!jobExists) throw new NotFoundException('Job not found');

    return this.jobRepository.removeJobTaskItem(itemDto.jobId, itemDto.taskId, itemDto.itemId);
  }

  async addToHistory(jobId, event: string) {
    const newEvent = new History(event);
    this.jobRepository.addToHistory(jobId, newEvent); //Do not await
  }

  removeClient(fullName: string, clientId: Types.ObjectId) {
    this.jobRepository.removeClient(fullName, clientId);
  }

  deleteAllTagsAndStatusesInCompany(companyId: Types.ObjectId) {
    this.jobTagRepository.deleteAllTagsAndStatusesInCompany(companyId);
  }

  async removeAllReferencesToEmployee(employeeId: Types.ObjectId) {
    const employee = await this.employeeService.findById(employeeId);
    if (!employee) throw new NotFoundException('Employee not found');
    this.jobRepository.removeAllReferencesToEmployee(employee.companyId, employee._id);
    return true;
  }

  removeAllReferencesToTeam(teamId: Types.ObjectId) {
    this.jobRepository.removeAllReferencesToTeam(teamId);
    return true;
  }

  async convertTaskListItemToJob(userId: Types.ObjectId, convertItemDto: ConvertItemToJobDto) {
    await this.userIdMatchesEmployeeId(userId, convertItemDto.currentEmployeeId);
    const user = await this.usersService.getUserById(userId);
    const employee = await this.employeeService.findById(convertItemDto.currentEmployeeId);
    const job = await this.jobRepository.findById(convertItemDto.jobId);
    if (!user) throw new NotFoundException('user not found');
    if (!employee) throw new NotFoundException('Employee not found');
    if (!job) throw new NotFoundException('Job not found');

    const task = job.taskList.find((t) => t._id.toString() === convertItemDto.taskId.toString());
    const item = task.items.find((i) => i._id.toString() === convertItemDto.taskItemId.toString());
    if (!task) throw new ConflictException('Task not found');
    if (!item) throw new ConflictException('Item not found');

    const createJobDto: CreateJobDto = new CreateJobDto();
    createJobDto.assignedBy = job.assignedBy._id;
    createJobDto.companyId = job.companyId;
    createJobDto.details = {
      address: job.details.address,
      heading: item.description,
    };
    createJobDto.assignedEmployees = new AssignedEmployees();
    createJobDto.status = job.status._id;

    const newJob = await this.create(userId, createJobDto);
    newJob.history.push(
      new History(
        `${employee.userInfo.firstName} ${employee.userInfo.surname} converted item: ${item.description} into a Job`,
      ),
    );
    for (const assignedEmployee of newJob.assignedEmployees.employeeIds) {
      await this.assignEmployee(userId, {
        jobId: newJob._id,
        employeeId: employee._id,
        employeeToAssignId: assignedEmployee._id,
      });
    }
    this.jobRepository.convertTaskToJob(convertItemDto.jobId, convertItemDto.taskId, convertItemDto.taskItemId);
    return (await newJob.save()).toObject();
  }

  async getAllEmployeesRelatedToJob(jobId: Types.ObjectId) {
    //This is an internal function
    const relevantJobs = await this.jobRepository.getAllRelatedEmployees(jobId);
    const result: Types.ObjectId[] = [];
    if (relevantJobs.assignedBy) result.push(relevantJobs.assignedBy);
    if (relevantJobs.assignedEmployees && relevantJobs.assignedEmployees.employeeIds)
      result.concat(relevantJobs.assignedEmployees.employeeIds);
    if (relevantJobs.taskList) {
      for (const task of relevantJobs.taskList) {
        for (const item of task.items) {
          if (item.assignedEmployees) result.concat(item.assignedEmployees);
          //TODO: Remove duplicates
        }
      }
    }
    return result;
  }

  async addClientFeedback(jobId: Types.ObjectId, addFeedbackDto: AddFeedbackDto) {
    const updated = await this.jobRepository.update(jobId, addFeedbackDto);
    console.log('updatedJob', updated);
    if (updated) {
      const client = await this.clientService.internalGetClientById(updated.clientId);
      if (!client) throw new NotFoundException('Client not found');

      const mes = new Message(
        'New Feedback from Client',
        `${client.details.firstName} ${client.details.lastName} has left a review on Job: ${updated.details.heading}`,
      );
      const allEmps = await this.getAllEmployeesRelatedToJob(jobId);
      const company = await this.companyService.getCompanyById(updated.companyId);
      await this.notificationService.create({
        recipientIds: allEmps,
        message: mes,
        isJobRelated: true,
        companyName: company.name,
      });
    }
    return true;
  }

  async getAllCurrentJobsForClient(clientId: Types.ObjectId) {
    const client = await this.clientService.internalGetClientById(clientId);
    if (!client) throw new NotFoundException('Client not found');

    const finalStatus = await this.companyService.internalFindAllStatusesInCompany(client.details.companyId);
    console.log(finalStatus);
    const statusId = finalStatus.jobStatuses[finalStatus.jobStatuses.length - 1];
    return this.jobRepository.findAllCurrentForClient(clientId, statusId);
  }

  async getAllCompletedJobsForClient(clientId: Types.ObjectId) {
    const client = await this.clientService.internalGetClientById(clientId);
    if (!client) throw new NotFoundException('Client not found');

    const finalStatus = await this.companyService.internalFindAllStatusesInCompany(client.details.companyId);
    console.log(finalStatus);
    const statusId = finalStatus.jobStatuses[finalStatus.jobStatuses.length - 1];
    return this.jobRepository.findCompletedForClient(clientId, statusId._id);
  }
}
