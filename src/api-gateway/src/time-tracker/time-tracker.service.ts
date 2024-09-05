import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import { UsersService } from '../users/users.service';
import { JobService } from '../job/job.service';
import { FlattenMaps, Types } from 'mongoose';
import {
  CreateTimeTrackerDto,
  GeneralTimeTrackerDto,
  GetCurrentTimeTrackersDto,
  GetTimeTrackersDto,
  StopTimeTrackerDto,
} from './dto/create-time-tracker.dto';
import { Employee } from '../employee/entities/employee.entity';
import { TimeTrackerRepository } from './time-tracker.repository';
import { TimeInterval } from './entities/time-tracker.entity';
import { TimeSpentDto } from './dto/time-spent.dto';

@Injectable()
export class TimeTrackerService {
  constructor(
    private readonly timeTrackerRepository: TimeTrackerRepository,

    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,

    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,

    @Inject(forwardRef(() => JobService))
    private jobService: JobService,
  ) {}

  async getAllCheckins(userId: Types.ObjectId, getTimeTrackersDto: GetTimeTrackersDto) {
    await this.userIdMatchesEmployeeId(userId, getTimeTrackersDto.employeeId);
  }

  async checkIn(userId: Types.ObjectId, createTimeTrackerDto: CreateTimeTrackerDto) {
    await this.userIdMatchesEmployeeId(userId, createTimeTrackerDto.employeeId);
    const job = await this.jobService.getJobById(createTimeTrackerDto.jobId);
    if (!job) throw new NotFoundException('Job not found');
    return this.timeTrackerRepository.checkIn(
      createTimeTrackerDto.employeeId,
      createTimeTrackerDto.jobId,
      job.companyId,
    );
  }

  async checkOut(userId: Types.ObjectId, stopTimeTrackerDto: StopTimeTrackerDto) {
    await this.userIdMatchesEmployeeId(userId, stopTimeTrackerDto.employeeId);
    const job = await this.jobService.getJobById(stopTimeTrackerDto.jobId);
    if (!job) throw new NotFoundException('Job not found');
    return this.timeTrackerRepository.checkOut(stopTimeTrackerDto.employeeId, stopTimeTrackerDto.jobId);
  }

  async pause(userId: Types.ObjectId, pauseTimeTrackerDto: GeneralTimeTrackerDto) {
    await this.userIdMatchesEmployeeId(userId, pauseTimeTrackerDto.employeeId);
    const job = await this.jobService.getJobById(pauseTimeTrackerDto.jobId);
    if (!job) throw new NotFoundException('Job not found');
    return this.timeTrackerRepository.pause(pauseTimeTrackerDto.employeeId, pauseTimeTrackerDto.jobId);
  }

  async resume(userId: Types.ObjectId, pauseTimeTrackerDto: GeneralTimeTrackerDto) {
    await this.userIdMatchesEmployeeId(userId, pauseTimeTrackerDto.employeeId);
    const job = await this.jobService.getJobById(pauseTimeTrackerDto.jobId);
    if (!job) throw new NotFoundException('Job not found');
    return this.timeTrackerRepository.resume(pauseTimeTrackerDto.employeeId, pauseTimeTrackerDto.jobId);
  }

  async getAllCurrentCheckins(userId: Types.ObjectId, currentTimeTrackersDto: GetCurrentTimeTrackersDto) {
    await this.userIdMatchesEmployeeId(userId, currentTimeTrackersDto.employeeId);
    return this.timeTrackerRepository.getAllRunningCheckins(currentTimeTrackersDto.employeeId);
  }

  //async getAllCurrentUserCheckins(userId: Types.ObjectId) {}

  async getLatestCheckinForEmployee(userId: Types.ObjectId, generalTimeTrackerDto: GeneralTimeTrackerDto) {
    await this.userIdMatchesEmployeeId(userId, generalTimeTrackerDto.employeeId);
    return this.timeTrackerRepository.getLatestCheckin(generalTimeTrackerDto.employeeId, generalTimeTrackerDto.jobId);
  }

  async getAllCompletedCheckins(userId: Types.ObjectId, employeeId: Types.ObjectId) {
    await this.userIdMatchesEmployeeId(userId, employeeId);
    return this.timeTrackerRepository.getAllCompletedCheckins(employeeId);
  }

  async getAllCompanyCheckins(userId: Types.ObjectId, employeeId: Types.ObjectId) {
    await this.userIdMatchesEmployeeId(userId, employeeId);
    return this.timeTrackerRepository.getAllCompanyCheckins(employeeId);
  }

  async getAllEmployeeCheckins(userId: Types.ObjectId, employeeId: Types.ObjectId) {
    await this.userIdMatchesEmployeeId(userId, employeeId);
    return this.timeTrackerRepository.getAllEmployeeCheckins(employeeId);
  }

  async getTotalTimeSpentOnJob(employeeId: Types.ObjectId, jobId: Types.ObjectId): Promise<TimeSpentDto> {
    await this.closeAllTimeTrackersForJob(jobId);
    const times = await this.timeTrackerRepository.getAllIntervalsOnJob(employeeId, jobId);
    if (!times) return new TimeSpentDto(0, 0);
    let timeWorking: number = 0;
    let timePaused: number = 0;
    for (const time of times) {
      timePaused += this.calculateTotalPauseMinutes(time.pauses);
      timeWorking += this.calculateTotalWorkMinutes(time.checkInTime, time.checkOutTime);
    }

    return new TimeSpentDto(timeWorking, timePaused);
  }

  async closeAllTimeTrackersForJob(jobId: Types.ObjectId) {
    return this.timeTrackerRepository.closeAllTimeTrackersForJob(jobId);
  }

  calculateTotalPauseMinutes(pauses: TimeInterval[]): number {
    let totalMinutes = 0;

    for (const pause of pauses) {
      const start = new Date(pause.start).getTime();
      const end = new Date(pause.end).getTime();
      const duration = (end - start) / (1000 * 60);
      totalMinutes += duration;
    }

    return totalMinutes;
  }

  calculateTotalWorkMinutes(startDate: Date, endDate: Date): number {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    return (end - start) / (1000 * 60);
  }

  async userIdMatchesEmployeeId(userId: Types.ObjectId, employeeId: Types.ObjectId) {
    const userExists = await this.usersService.userIdExists(userId);
    if (!userExists) throw new NotFoundException('User not found');

    const employee: FlattenMaps<Employee> & { _id: Types.ObjectId } = await this.employeeService.findById(employeeId);
    if (!employee) throw new NotFoundException('Employee not found');
    if (employee.userId.toString() !== userId.toString()) throw new UnauthorizedException('Inconsistent userId');
  }
}
