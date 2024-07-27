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
  Put,
} from '@nestjs/common';
import { JobService } from './job.service';
import {
  CreateJobDto,
  CreateJobResponseDto,
  JobAllResponseDetailedDto,
  JobAllResponseDto,
} from './dto/create-job.dto';
import {
  AddCommentDto,
  RemoveCommentDto,
  UpdateDtoResponse,
  UpdateJobDto,
} from './dto/update-job.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
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
import { CreatePriorityTagDto, CreateTagDto } from './dto/create-tag.dto';
import { extractUserId } from '../utils/Utils';
import { DeleteTagDto } from './dto/edit-tag.dto';
import {
  PriorityTagsAllResponseDto,
  TagsAllResponseDto,
} from './dto/job-responses.dto';

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
        data: await this.jobService.getAllJobsInCompany(
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
        data: await this.jobService.getAllDetailedJobsInCompany(
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
        data: await this.jobService.getAllJobsForUser(userId),
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
    const decodedJwtAccessToken = this.jwtService.decode(
      headers.authorization.replace(/^Bearer\s+/i, ''),
    );
    const userId: Types.ObjectId = decodedJwtAccessToken.sub;
    if (!userId) {
      throw new UnauthorizedException('Unauthorized, JWT required');
    }
    try {
      this.validateObjectId(userId);
      this.validateObjectId(empId);

      return {
        data: await this.jobService.getAllJobsForEmployee(
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
    const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
    if (!userId) {
      throw new UnauthorizedException('Unauthorized, JWT required');
    }
    try {
      this.validateObjectId(userId);
      this.validateObjectId(empId);

      return {
        data: await this.jobService.getAllDetailedJobsForEmployee(
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
        data: await this.jobService.getJobById(new Types.ObjectId(id)),
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
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
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
  @Delete('/:id')
  async remove(@Param('id') id: string, @Body() pass: { pass: string }) {
    console.log(pass); //Will be implemented later
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);

    try {
      return { data: await this.jobService.softDelete(new Types.ObjectId(id)) };
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
  // Specific

  // Comments
  @ApiResponse({
    type: JobResponseDto,
    description: 'The updated Job',
  })
  @ApiBody({ type: AddCommentDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Put('comment')
  async addComment(
    @Headers() headers: any,
    @Body() addCommentDto: AddCommentDto,
  ) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.addCommentToJob(userId, addCommentDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiResponse({
    type: JobResponseDto,
    description: 'The updated Job',
  })
  @ApiBody({ type: AddCommentDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Delete('comment')
  async removeComment(
    @Headers() headers: any,
    @Body() removeCommentDto: RemoveCommentDto,
  ) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.removeCommentFromJob(
          userId,
          removeCommentDto,
        ),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // tags
  @ApiOperation({
    summary: 'Get all Tags in a company',
  })
  @ApiOkResponse({
    type: TagsAllResponseDto,
    description: 'An array of tags',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Get('/tags/:cid')
  async getAllTagsInCompany(
    @Headers() headers: any,
    @Param('cid') companyId: string,
  ) {
    try {
      this.validateObjectId(companyId);
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      const compId = new Types.ObjectId(companyId);
      return {
        data: await this.jobService.getAllTagsInCompany(userId, compId),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Get all Priority Tags in a company',
  })
  @ApiOkResponse({
    type: PriorityTagsAllResponseDto,
    description: 'An array of Priority tags',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Get('/tags/p/:cid')
  async getAllPriorityTagsInCompany(
    @Headers() headers: any,
    @Param('cid') companyId: string,
  ) {
    try {
      this.validateObjectId(companyId);
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      const compId = new Types.ObjectId(companyId);
      return {
        data: await this.jobService.getAllPriorityTagsInCompany(userId, compId),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Add a Job Tag to a company',
  })
  @ApiCreatedResponse({
    type: BooleanResponseDto,
    description: 'Confirmation of success of request',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Post('/tags/add')
  addJobTagToCompany(
    @Headers() headers: any,
    @Body() createTagDto: CreateTagDto,
  ) {
    try {
      this.validateObjectId(createTagDto.companyId);
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return this.jobService.addJobTagToCompany(userId, createTagDto);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Add a job Priority Tag to a company',
  })
  @ApiCreatedResponse({
    type: BooleanResponseDto,
    description: 'Confirmation of success of request',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Post('/tags/p')
  async addJobPriorityTagToCompany(
    @Headers() headers: any,
    @Body() createPriorityTagDto: CreatePriorityTagDto,
  ) {
    try {
      this.validateObjectId(createPriorityTagDto.companyId);
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.addJobPriorityTagToCompany(
          userId,
          createPriorityTagDto,
        ),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Remove a Job Tag from a company',
  })
  @ApiResponse({
    type: BooleanResponseDto,
    description: 'Tag successfully removed',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Delete('tags/')
  async removeJobTagFromCompany(
    @Headers() headers: any,
    @Body() deleteTagDto: DeleteTagDto,
  ) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.removeJobTagFromCompany(
          userId,
          deleteTagDto,
        ),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Remove a Job Priority Tag from a company',
  })
  @ApiResponse({
    type: BooleanResponseDto,
    description: 'Tag successfully removed',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Delete('tags/p/')
  async removePriorityTagFromCompany(
    @Headers() headers: any,
    @Body() deleteTagDto: DeleteTagDto,
  ) {
    try {
      this.validateObjectId(deleteTagDto.tagId);
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.removeJobPriorityTagFromCompany(
          userId,
          deleteTagDto,
        ),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  //Comments

  /*  addAttachmentToJob(@Headers() headers: any, @Param('cid') companyId: string) {
    try {
      this.validateObjectId(companyId);
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      const compId = new Types.ObjectId(companyId);
      return this.jobService.addAttachmentToJob(userId, compId);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(`Job could not be updated`);
    }
  }*/
}
