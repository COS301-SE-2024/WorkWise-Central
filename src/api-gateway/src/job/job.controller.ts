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
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { JobService } from './job.service';
import {
  CreateJobDto,
  CreateJobResponseDto,
  JobAllResponseDetailedDto,
  JobAllResponseDto,
} from './dto/create-job.dto';
import { UpdateDtoResponse, UpdateJobDto } from './dto/update-job.dto';
import {
  ApiBearerAuth,
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
import { JobResponseDto } from './entities/job.entity';
import { JwtService } from '@nestjs/jwt';
import { BooleanResponseDto } from '../shared/dtos/api-response.dto';

const className = 'Job';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(
    private readonly jobService: JobService,
    private jwtService: JwtService,
  ) {}
  validateObjectId(id: string | Types.ObjectId, entity: string = ''): boolean {
    let data: string;
    if (entity === '') data = `Invalid ID`;
    else data = `Invalid ${entity} ID`;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException(data, HttpStatus.BAD_REQUEST);
    }
    console.log('valid');
    return true;
  }

  @ApiOperation({ summary: 'Refer to the Documentation' })
  @Get()
  lookAtDocumentation() {
    return {
      message: 'Refer to /documentation for details on the API',
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
    if (createJobDto.companyId)
      this.validateObjectId(createJobDto.companyId, 'Company');

    try {
      return await this.jobService.create(createJobDto);
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.CONFLICT);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
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
      return { data: await this.jobService.findAllJobs() };
    } catch (Error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Get all ${className}s in a specific Company`,
  })
  @ApiOkResponse({
    type: JobAllResponseDto,
    description: `An array of mongodb objects of the ${className} class`,
  })
  @Get('all/company/:cid')
  async findAllInCompany(
    @Headers() headers: any,
    @Param('cid') companyId: string,
  ) {
    this.validateObjectId(companyId);
    const decodedJwtAccessToken = this.jwtService.decode(
      headers.authorization.replace(/^Bearer\s+/i, ''),
    );
    const userId: Types.ObjectId = decodedJwtAccessToken.sub;
    if (!userId) {
      throw new UnauthorizedException('Unauthorized, JWT required');
    }
    try {
      return {
        data: await this.jobService.GetAllJobsInCompany(
          userId,
          new Types.ObjectId(companyId),
        ),
      };
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Get all ${className}s in a specific Company`,
  })
  @ApiOkResponse({
    type: JobAllResponseDetailedDto,
    description: `An array of mongodb objects of the ${className} class`,
  })
  @Get('all/company/detailed/:cid')
  async findDetailedAllInCompany(
    @Headers() headers: any,
    @Param('cid') companyId: string,
  ) {
    this.validateObjectId(companyId);
    const decodedJwtAccessToken = this.jwtService.decode(
      headers.authorization.replace(/^Bearer\s+/i, ''),
    );
    const userId: Types.ObjectId = decodedJwtAccessToken.sub;
    if (!userId) {
      throw new UnauthorizedException('Unauthorized, JWT required');
    }
    try {
      return {
        data: await this.jobService.GetAllDetailedJobsInCompany(
          userId,
          new Types.ObjectId(companyId),
        ),
      };
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Get all ${className}s for a specific user`,
  })
  @ApiOkResponse({
    type: JobAllResponseDto,
    description: `An array of mongodb objects of the ${className} class`,
  })
  @Get('all/user/')
  async findAllForUser(@Headers() headers: any) {
    const decodedJwtAccessToken = this.jwtService.decode(
      headers.authorization.replace(/^Bearer\s+/i, ''),
    );
    const userId: Types.ObjectId = decodedJwtAccessToken.sub;
    if (!userId) {
      throw new UnauthorizedException('Unauthorized, JWT required');
    }
    this.validateObjectId(userId);

    try {
      return {
        data: await this.jobService.GetAllJobsForUser(userId),
      };
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Get all ${className}s for a specific Employee`,
  })
  @ApiOkResponse({
    type: JobAllResponseDto,
    description: `An array of mongodb objects of the ${className} class`,
  })
  @Get('all/employee/:eid')
  async findAllForEmployee(
    @Headers() headers: any,
    @Param('eid') empId: string,
  ) {
    try {
      const decodedJwtAccessToken = this.jwtService.decode(
        headers.authorization.replace(/^Bearer\s+/i, ''),
      );
      const userId: Types.ObjectId = decodedJwtAccessToken.sub;
      if (!userId) {
        throw new UnauthorizedException('Unauthorized, JWT required');
      }
      this.validateObjectId(userId);
      this.validateObjectId(empId);

      return {
        data: await this.jobService.GetAllJobsForEmployee(
          userId,
          new Types.ObjectId(empId),
        ),
      };
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Get all ${className}s for a specific Employee, but with populated fields`,
  })
  @ApiOkResponse({
    type: JobAllResponseDto,
    description: `An array of mongodb objects of the ${className} class`,
  })
  @Get('all/employee/:eid/detailed')
  async findAllForEmployeeDetailed(
    @Headers() headers: any,
    @Param('eid') empId: string,
  ) {
    try {
      const userId: Types.ObjectId = this.extractUserId(headers);
      if (!userId) {
        throw new UnauthorizedException('Unauthorized, JWT required');
      }
      this.validateObjectId(userId);
      this.validateObjectId(empId);

      return {
        data: await this.jobService.GetAllDetailedJobsForEmployee(
          userId,
          new Types.ObjectId(empId),
        ),
      };
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.INTERNAL_SERVER_ERROR);
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
      return {
        data: await this.jobService.findJobById(new Types.ObjectId(id)),
      };
    } catch (e) {
      console.log(e);
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Change the attributes of a ${className}`,
    description: `
    You may send the entire ${className} object that was sent to you, in your request body.\r\n
    You may also send a singular attribute `,
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
  async update(
    @Headers() headers: any,
    @Param('id') jobId: string,
    @Body() updateJobDto: UpdateJobDto,
  ) {
    try {
      this.validateObjectId(jobId);
      const userId: Types.ObjectId = this.extractUserId(headers);
      // console.log(userId);
      // console.log(new Types.ObjectId(jobId));
      const success = await this.jobService.update(
        userId,
        new Types.ObjectId(jobId),
        updateJobDto,
      );
      return new UpdateDtoResponse(success);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(`Job could not be updated`);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
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
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);

    try {
      return this.jobService.softDelete(new Types.ObjectId(id));
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  public extractUserId(headers: any) {
    const authHeader: string = headers.authorization;
    const decodedJwtAccessToken = this.jwtService.decode(
      authHeader.replace(/^Bearer\s+/i, ''),
    );
    if (!Types.ObjectId.isValid(decodedJwtAccessToken.sub)) {
      throw new HttpException('Invalid User', HttpStatus.BAD_REQUEST);
    }
    const userId: Types.ObjectId = decodedJwtAccessToken.sub; //This attribute is retrieved in the JWT
    return userId;
  }
}
