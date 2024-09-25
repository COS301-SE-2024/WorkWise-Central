import { Body, Controller, Get, Headers, HttpException, HttpStatus, Post } from '@nestjs/common';
import { TimeTrackerService } from './time-tracker.service';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { extractUserId } from '../utils/Utils';
import {
  CreateTimeTrackerDto,
  GeneralTimeTrackerDto,
  GetCompletedTimeTrackersDto,
  GetCurrentTimeTrackersDto,
  GetTimeTrackersDto,
  StopTimeTrackerDto,
} from './dto/create-time-tracker.dto';
import { BooleanResponseDto } from '../shared/dtos/api-response.dto';
import { TimeTracker } from './entities/time-tracker.entity';
import { TimeSpentDto } from './dto/time-spent.dto';
import { TimeTrackerResponseDto, TimeTrackersResponseDto } from './dto/time-tracker-response.dto';

@ApiTags('Time-Tracker')
@Controller('time-tracker')
export class TimeTrackerController {
  constructor(
    private readonly timeTrackerService: TimeTrackerService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: 'Refer to the Documentation' })
  @Get()
  lookAtDocumentation() {
    return {
      message: 'Refer to /documentation for details on the API',
    };
  }

  @Post('check-in')
  @ApiOperation({ summary: 'Check in to indicate them starting to work on a job' })
  @ApiResponse({ status: 201, description: 'User checked in successfully.', type: TimeTrackerResponseDto })
  @ApiResponse({ status: 409, description: 'Conflict error.' })
  async checkIn(@Headers() headers: any, @Body() createTimeTrackerDto: CreateTimeTrackerDto) {
    try {
      //validateObjectId(createJobDto.assignedBy, 'assignedBy');
      const userId = extractUserId(this.jwtService, headers);
      return { data: await this.timeTrackerService.checkIn(userId, createTimeTrackerDto) };
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.CONFLICT);
    }
  }

  @Post('check-out')
  @ApiOperation({ summary: 'Check out to indicate you are no longer working on a job for the day' })
  @ApiResponse({ status: 201, description: 'User checked out successfully.', type: TimeTrackerResponseDto })
  @ApiResponse({ status: 409, description: 'Conflict error.' })
  async checkOut(@Headers() headers: any, @Body() stopTimeTrackerDto: StopTimeTrackerDto) {
    try {
      //validateObjectId(createJobDto.assignedBy, 'assignedBy');
      const userId = extractUserId(this.jwtService, headers);
      return { data: await this.timeTrackerService.checkOut(userId, stopTimeTrackerDto) };
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.CONFLICT);
    }
  }

  @Post('pause')
  @ApiOperation({ summary: 'Pause your latest running timer on a job' })
  @ApiResponse({ status: 201, description: 'Pause was successful', type: TimeTrackerResponseDto })
  @ApiResponse({ status: 409, description: 'Conflict error.' })
  async pause(@Headers() headers: any, @Body() pauseTimeTrackerDto: GeneralTimeTrackerDto) {
    try {
      //validateObjectId(createJobDto.assignedBy, 'assignedBy');
      const userId = extractUserId(this.jwtService, headers);
      return { data: await this.timeTrackerService.pause(userId, pauseTimeTrackerDto) };
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.CONFLICT);
    }
  }

  @Post('resume')
  @ApiOperation({ summary: 'Resume your latest running timer on a job' })
  @ApiResponse({ status: 201, description: 'Resumption was successful', type: TimeTrackerResponseDto })
  @ApiResponse({ status: 409, description: 'Conflict error.' })
  async resume(@Headers() headers: any, @Body() pauseTimeTrackerDto: GeneralTimeTrackerDto) {
    try {
      //validateObjectId(createJobDto.assignedBy, 'assignedBy');
      const userId = extractUserId(this.jwtService, headers);
      return { data: await this.timeTrackerService.resume(userId, pauseTimeTrackerDto) };
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.CONFLICT);
    }
  }

  @Get('employee/check-ins/all/between')
  @ApiOperation({ summary: 'Get all check-ins for an employee between a certain range of time' })
  @ApiResponse({ status: 201, description: 'Pause was successful', type: TimeTrackersResponseDto })
  @ApiResponse({ status: 409, description: 'Conflict error.' })
  async getAllCheckins(@Headers() headers: any, @Body() getTimeTrackersDto: GetTimeTrackersDto) {
    try {
      //validateObjectId(createJobDto.assignedBy, 'assignedBy');
      const userId = extractUserId(this.jwtService, headers);
      return { data: await this.timeTrackerService.getAllCheckins(userId, getTimeTrackersDto) };
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.CONFLICT);
    }
  }

  @Get('employee/check-ins/current')
  @ApiOperation({ summary: `Get an employee's current checkin` })
  @ApiResponse({ status: 201, description: 'Pause was successful', type: TimeTrackersResponseDto })
  @ApiResponse({ status: 409, description: 'Conflict error.' })
  async getAllCurrentCheckins(@Headers() headers: any, @Body() currentTimeTrackersDto: GetCurrentTimeTrackersDto) {
    try {
      //validateObjectId(createJobDto.assignedBy, 'assignedBy');
      const userId = extractUserId(this.jwtService, headers);
      return { data: await this.timeTrackerService.getAllCurrentCheckins(userId, currentTimeTrackersDto) };
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.CONFLICT);
    }
  }

  @Get('employee/check-ins/complete')
  @ApiOperation({ summary: `Get all complete checkins for an employee` })
  @ApiResponse({ type: TimeTracker })
  async getAllCompleteCheckins(@Headers() headers: any, @Body() completedTimeTrackersDto: GetCompletedTimeTrackersDto) {
    try {
      //validateObjectId(createJobDto.assignedBy, 'assignedBy');
      const userId = extractUserId(this.jwtService, headers);
      return {
        data: await this.timeTrackerService.getAllCompletedCheckins(userId, completedTimeTrackersDto.employeeId),
      };
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.CONFLICT);
    }
  }

  @Get('employee/check-ins/company/')
  @ApiOperation({ summary: `Get all complete checkins for an employee` })
  @ApiResponse({ type: TimeTracker })
  async getAllCompanyCheckins(@Headers() headers: any, @Body() companyTimeTrackerDto: GetCompletedTimeTrackersDto) {
    try {
      //validateObjectId(createJobDto.assignedBy, 'assignedBy');
      const userId = extractUserId(this.jwtService, headers);
      return { data: await this.timeTrackerService.getAllCompanyCheckins(userId, companyTimeTrackerDto.employeeId) };
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.CONFLICT);
    }
  }

  /*  @Get('user/check-ins/current')
  async getAllCurrentUserCheckins(@Headers() headers: any) {
    try {
      //validateObjectId(createJobDto.assignedBy, 'assignedBy');
      const userId = extractUserId(this.jwtService, headers);
      return { data: await this.timeTrackerService.getAllCurrentUserCheckins(userId) };
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.CONFLICT);
    }
  }*/

  @Get('latest-checkin/')
  @ApiOperation({ summary: 'Get the latest check-in for an employee' })
  @ApiBody({ type: GeneralTimeTrackerDto })
  @ApiResponse({ status: 200, description: 'Latest check-in retrieved successfully.', type: BooleanResponseDto })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  async getLatestCheckinForEmployee(@Headers() headers: any, @Body() generalTimeTrackerDto: GeneralTimeTrackerDto) {
    const userId = extractUserId(this.jwtService, headers);
    await this.timeTrackerService.userIdMatchesEmployeeId(userId, generalTimeTrackerDto.employeeId);
    return { data: await this.timeTrackerService.getLatestCheckinForEmployee(userId, generalTimeTrackerDto) };
  }

  @Get('all-checkins')
  @ApiOperation({ summary: `Get all checkins for an employee` })
  @ApiResponse({ type: TimeTrackersResponseDto })
  async getAllEmployeeCheckins(@Headers() headers: any, @Body() generalTimeTrackerDto: GeneralTimeTrackerDto) {
    const userId = extractUserId(this.jwtService, headers);
    await this.timeTrackerService.userIdMatchesEmployeeId(userId, generalTimeTrackerDto.employeeId);
    return { data: await this.timeTrackerService.getAllEmployeeCheckins(userId, generalTimeTrackerDto.employeeId) };
  }

  @Get('total-time-spent')
  @ApiOperation({ summary: `Get total time spent on a job for an employee` })
  @ApiResponse({ type: TimeSpentDto })
  async getTotalTimeSpentOnJob(@Headers() headers: any, @Body() generalTimeTrackerDto: GeneralTimeTrackerDto) {
    const userId = extractUserId(this.jwtService, headers);
    await this.timeTrackerService.userIdMatchesEmployeeId(userId, generalTimeTrackerDto.employeeId);
    return {
      data: await this.timeTrackerService.getTotalTimeSpentOnJob(
        generalTimeTrackerDto.employeeId,
        generalTimeTrackerDto.jobId,
      ),
    };
  }
}
