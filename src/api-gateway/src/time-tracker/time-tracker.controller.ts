import { Body, Controller, Get, Headers, HttpException, HttpStatus, Post } from '@nestjs/common';
import { TimeTrackerService } from './time-tracker.service';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { extractUserId } from '../utils/Utils';
import {
  CreateTimeTrackerDto,
  GeneralTimeTrackerDto,
  GetCurrentTimeTrackersDto,
  GetTimeTrackersDto,
  StopTimeTrackerDto,
} from './dto/create-time-tracker.dto';

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
  async resume(@Headers() headers: any, @Body() pauseTimeTrackerDto: GeneralTimeTrackerDto) {
    try {
      //validateObjectId(createJobDto.assignedBy, 'assignedBy');
      const userId = extractUserId(this.jwtService, headers);
      return { data: await this.timeTrackerService.resume(userId, pauseTimeTrackerDto) };
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.CONFLICT);
    }
  }

  @Get('employee/check-ins/all')
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
  async getAllCurrentCheckins(@Headers() headers: any, @Body() currentTimeTrackersDto: GetCurrentTimeTrackersDto) {
    try {
      //validateObjectId(createJobDto.assignedBy, 'assignedBy');
      const userId = extractUserId(this.jwtService, headers);
      return { data: await this.timeTrackerService.getAllCurrentCheckins(userId, currentTimeTrackersDto) };
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
}
