import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { JobService } from './job.service';
import {
  CreateJobDto,
  CreateJobResponseDto,
  JobAllResponseDto,
} from './dto/create-job.dto';
import { UpdateDtoResponse, UpdateJobDto } from './dto/update-job.dto';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import mongoose, { Types } from 'mongoose';
import { AuthGuard } from '../auth/auth.guard';
import { BooleanResponseDto } from '../users/dto/create-user.dto';
import { JobResponseDto } from './entities/job.entity';

const className = 'Job';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  validateObjectId(id: string | Types.ObjectId, entity: string = ''): boolean {
    let response: string;
    if (entity === '') response = `Invalid ID`;
    else response = `Invalid ${entity} ID`;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  @ApiOperation({ summary: 'Refer to the Documentation' })
  @Get()
  lookAtDocumentation() {
    return {
      message: 'Refer to localhost:3000/documentation for details on the API',
    };
  }

  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.CONFLICT,
  })
  @ApiOperation({
    summary: `Create a new ${className}`,
    description:
      'Jobs relate to one or more employees in a company, they may be scheduled and' +
      ' are also linked to clients',
  })
  @ApiBody({ type: CreateJobDto })
  @ApiResponse({
    status: 201,
    type: CreateJobResponseDto,
    description: `The ${className}'s Object of the created job`,
  })
  @Post('/create')
  async create(
    @Body() createJobDto: CreateJobDto,
  ): Promise<CreateJobResponseDto> {
    this.validateObjectId(createJobDto.assignedBy, 'assignedBy');
    this.validateObjectId(createJobDto.companyId, 'Company');

    try {
      return await this.jobService.create(createJobDto);
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.CONFLICT);
    }
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: `Get all ${className}s`,
  })
  @ApiOkResponse({
    type: JobAllResponseDto,
    description: `An array of mongodb objects of the ${className} class`,
  })
  @Get('all')
  async findAll() {
    try {
      return { response: await this.jobService.findAllJobs() };
    } catch (Error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: `Find a specific ${className}` })
  @ApiOkResponse({
    type: JobResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className}`,
  })
  @Get('id/:id')
  async findOne(@Param('id') id: string) {
    this.validateObjectId(id);
    try {
      return { response: await this.jobService.findJobById(id) };
    } catch (e) {
      console.log(e);
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: `Change the attributes of a ${className}`,
    description: `
    You may send the entire ${className} object that was sent to you, in your request body.\r\n
    You may also send a singular attribute `,
    // /security: [],
  })
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.CONFLICT,
    description: 'Update failed',
  })
  @ApiOkResponse({
    type: JobResponseDto,
    description: `The updated ${className} object`,
  })
  @ApiBody({ type: UpdateJobDto })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    try {
      const success = await this.jobService.update(id, updateJobDto);
      return new UpdateDtoResponse(success);
    } catch (e) {
      throw new InternalServerErrorException(`User could not be updated`);
    }
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: `Delete a ${className}`,
    description: `You send the ${className} ObjectId, and then they get deleted if the id is valid.\n 
    There will be rules on deletion later.`,
  })
  @ApiOkResponse({
    type: BooleanResponseDto,
    description: `A boolean value indicating whether or not the deletion was a success`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className}`,
  })
  @Delete()
  remove(@Param('id') id: string, @Body() pass: { pass: string }) {
    console.log(pass); //Will be implemented later
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    try {
      return this.jobService.softDelete(id);
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
