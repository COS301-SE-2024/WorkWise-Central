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
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import mongoose, { Types } from 'mongoose';
import { AuthGuard } from '../auth/auth.guard';

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
  @ApiBody({ type: [CreateJobDto] })
  @Post('/create')
  async create(
    @Body() createJobDto: CreateJobDto,
  ): Promise<{ message: { id: Types.ObjectId; message: string } }> {
    this.validateObjectId(createJobDto.assignedBy, 'assignedBy');
    this.validateObjectId(createJobDto.companyId, 'Company');

    if (
      createJobDto.recordedDetails.inventoryUsed != undefined &&
      createJobDto.recordedDetails.inventoryUsed.length > 0
    )
      for (const item of createJobDto.recordedDetails.inventoryUsed) {
        this.validateObjectId(item.inventoryItemId, 'inventoryUsed');
      }

    try {
      return { message: await this.jobService.create(createJobDto) };
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.CONFLICT);
    }
  }

  @UseGuards(AuthGuard)
  @Get('all')
  findAll() {
    try {
      return this.jobService.findAllJobs();
    } catch (Error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    this.validateObjectId(id);
    try {
      return this.jobService.findJobById(id);
    } catch (e) {
      console.log(e);
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(+id, updateJobDto);
  }

  // @UseGuards(AuthGuard)
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
