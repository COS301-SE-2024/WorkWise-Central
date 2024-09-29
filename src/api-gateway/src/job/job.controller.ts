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
  UseInterceptors,
  //UploadedFile,
  UploadedFiles,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto, CreateJobResponseDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
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
import { JwtService } from '@nestjs/jwt';
import { BooleanResponseDto } from '../shared/dtos/api-response.dto';
import { CreatePriorityTagDto, CreateStatusDto, CreateTagDto, PriorityTagDto } from './dto/create-tag.dto';
import { extractUserId, isBase64Uri, validateObjectId, validateObjectIds } from '../utils/Utils';
import { DeleteStatusDto, DeleteTagDto, UpdatePriorityTagDto, UpdateTagDto } from './dto/edit-tag.dto';
import {
  JobAllResponseDetailedDto,
  JobAllResponseDto,
  JobResponseDto,
  JobStatusAllResponseDto,
  JobStatusResponseDto,
  JobTagResponseDto,
  PriorityTagsAllResponseDto,
  TagResponseDto,
  TagsAllResponseDto,
} from './dto/job-responses.dto';
import { JobAssignDto, JobAssignGroupDto, JobAssignTeamDto, TaskAssignDto } from './dto/assign-job.dto';
//import { UpdateProfilePicDto } from '../users/dto/update-user.dto';
import { FileFieldsInterceptor /*, FileInterceptor*/ } from '@nestjs/platform-express';
import { AddCommentDto, RemoveCommentDto, UpdateCommentDto } from './dto/job-comments.dto';
import { AddAttachmentDto, UpdateAttachmentDto } from './dto/job-attachment.dto';
import { UpdateStatus, UpdateStatusDto } from './dto/job-status.dto';
import { AddTaskDto, RemoveTaskDto, UpdateTaskDto } from './dto/job-tasks.dto';
import { AddTaskItemDto, RemoveTaskItemDto, UpdateTaskItemDto } from './dto/job-task-item.dto';
import { ConvertItemToJobDto } from './dto/convert-item-to-job.dto';
import { EmployeeService } from '../employee/employee.service';

const className = 'Job';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(
    private readonly jobService: JobService,
    private jwtService: JwtService,
    private readonly employeeService: EmployeeService,
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
      'Jobs relate to one or more employees in a company, they may be scheduled and' + ' are also linked to clients',
  })
  @ApiBody({ type: CreateJobDto })
  @ApiResponse({
    status: 201,
    type: CreateJobResponseDto,
    description: `The ${className}'s Object of the created job`,
  })
  @Post('/create')
  async create(@Headers() headers: any, @Body() createJobDto: CreateJobDto) {
    if (createJobDto.coverImage) {
      console.log('Cover image present');
      const isValidUrl = isBase64Uri(createJobDto.coverImage);
      if (!isValidUrl) {
        throw new BadRequestException('coverImage must be Base64 URI');
      }
    }
    try {
      validateObjectId(createJobDto.assignedBy, 'assignedBy');
      if (createJobDto.companyId) validateObjectId(createJobDto.companyId, 'Company');
      const userId = extractUserId(this.jwtService, headers);
      console.log(userId);
      return { data: await this.jobService.create(userId, createJobDto) };
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
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
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
    @Query('currentEmployeeId') currentEmployeeId: Types.ObjectId,
  ) {
    const currentEmployee = await this.employeeService.findById(currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('view all jobs')) {
      try {
        validateObjectId(companyId);
        const userId = extractUserId(this.jwtService, headers);
        return {
          data: await this.jobService.getAllJobsInCompany(userId, new Types.ObjectId(companyId)),
        };
      } catch (Error) {
        throw new HttpException(Error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else if (currentEmployee.role.permissionSuite.includes('view jobs under me')) {
      try {
        const userId = extractUserId(this.jwtService, headers);
        validateObjectId(userId);

        const employeeId = new Types.ObjectId(currentEmployeeId);
        return {
          data: await this.jobService.getAllJobBelowMe(employeeId),
        };
      } catch (Error) {
        throw new HttpException(Error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else if (currentEmployee.role.permissionSuite.includes('view jobs assigned to me')) {
      try {
        const userId = extractUserId(this.jwtService, headers);
        validateObjectId(userId);

        const employeeId = new Types.ObjectId(currentEmployeeId);
        return {
          data: await this.jobService.getAllJobsForEmployee(userId, employeeId),
        };
      } catch (Error) {
        throw new HttpException(Error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      return {};
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
    @Query('currentEmployeeId') currentEmployeeId: Types.ObjectId,
  ) {
    const currentEmployee = await this.employeeService.findById(currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('view all jobs')) {
      try {
        const userId = extractUserId(this.jwtService, headers);
        validateObjectId(companyId);
        return {
          data: await this.jobService.getAllDetailedJobsInCompany(userId, new Types.ObjectId(companyId)),
        };
      } catch (Error) {
        throw new HttpException(Error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else if (currentEmployee.role.permissionSuite.includes('view jobs under me')) {
      try {
        const userId = extractUserId(this.jwtService, headers);
        validateObjectId(userId);

        const employeeId = new Types.ObjectId(currentEmployeeId);
        return {
          data: await this.jobService.getAllJobBelowMeDetailed(employeeId),
        };
      } catch (Error) {
        throw new HttpException(Error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else if (currentEmployee.role.permissionSuite.includes('view jobs assigned to me')) {
      try {
        const userId = extractUserId(this.jwtService, headers);
        validateObjectId(userId);

        const employeeId = new Types.ObjectId(currentEmployeeId);
        return {
          data: await this.jobService.getAllDetailedJobsForEmployee(userId, employeeId),
        };
      } catch (Error) {
        throw new HttpException(Error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      return {};
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
    try {
      const userId = extractUserId(this.jwtService, headers);
      validateObjectId(userId);
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
  async findAllForEmployee(@Headers() headers: any, @Param('eid') empId: string) {
    try {
      const userId = extractUserId(this.jwtService, headers);
      validateObjectId(userId);
      validateObjectId(empId);

      const employeeId = new Types.ObjectId(empId);
      return {
        data: await this.jobService.getAllJobsForEmployee(userId, employeeId),
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
  async findAllForEmployeeDetailed(@Headers() headers: any, @Param('eid') empId: string) {
    const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
    if (!userId) {
      throw new UnauthorizedException('Unauthorized, JWT required');
    }
    try {
      validateObjectId(userId);
      validateObjectId(empId);

      return {
        data: await this.jobService.getAllDetailedJobsForEmployee(userId, new Types.ObjectId(empId)),
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
    validateObjectId(id);
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
  @Patch('update/:id')
  async update(@Headers() headers: any, @Param('id') jobId: string, @Body() updateJobDto: UpdateJobDto) {
    if (updateJobDto.coverImage) {
      console.log('Cover image present');
      const isValidUrl = isBase64Uri(updateJobDto.coverImage);
      if (!isValidUrl) {
        throw new BadRequestException('coverImage must be Base64 URI');
      }
    }
    try {
      validateObjectId(jobId);
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      // console.log(userId);
      // console.log(new Types.ObjectId(jobId));
      const job = await this.jobService.update(userId, new Types.ObjectId(jobId), updateJobDto);
      return { data: job };
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
  @Delete('full/:id')
  async remove(@Param('id') id: string, @Body() pass: { pass: string }) {
    console.log(pass); //Will be implemented later
    if (!mongoose.Types.ObjectId.isValid(id)) throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);

    try {
      return { data: await this.jobService.softDelete(new Types.ObjectId(id)) };
    } catch (e) {
      throw new HttpException('Internal Server Error', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
  // Specific

  /// Comments
  @ApiOperation({ summary: 'Add a comment to a Job' })
  @ApiResponse({
    type: JobResponseDto,
    description: 'The updated Job',
  })
  @ApiBody({ type: AddCommentDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Put('/comment')
  async addComment(@Headers() headers: any, @Body() addCommentDto: AddCommentDto) {
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

  @ApiOperation({ summary: 'Remove a comment within a Job' })
  @ApiResponse({
    type: JobResponseDto,
    description: 'The updated Job',
  })
  @ApiBody({ type: RemoveCommentDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Delete('/comment')
  async removeComment(@Headers() headers: any, @Body() removeCommentDto: RemoveCommentDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.removeCommentFromJob(userId, removeCommentDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Change the contents a Comment`,
  })
  @ApiOkResponse({
    type: JobResponseDto,
    description: `The updated Job object, with a new comment`,
  })
  @ApiBody({ type: UpdateCommentDto })
  @Patch('/comment')
  async editComment(@Headers() headers: any, @Body() updateCommentDto: UpdateCommentDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.editCommentInJob(userId, updateCommentDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  /// Comments

  /// Tags
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
  async getAllTagsInCompany(@Headers() headers: any, @Param('cid') companyId: string) {
    try {
      validateObjectId(companyId);
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
  async getAllPriorityTagsInCompany(@Headers() headers: any, @Param('cid') companyId: string) {
    try {
      validateObjectId(companyId);
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
    type: JobTagResponseDto,
    description: 'Confirmation of success of request',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Post('/tags/add')
  async addJobTagToCompany(@Headers() headers: any, @Body() createTagDto: CreateTagDto) {
    try {
      validateObjectId(createTagDto.companyId);
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return { data: await this.jobService.addJobTagToCompany(userId, createTagDto) };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Add a job Priority Tag to a company',
  })
  @ApiCreatedResponse({
    type: PriorityTagDto,
    description: 'Confirmation of success of request',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Post('/tags/p')
  async addJobPriorityTagToCompany(@Headers() headers: any, @Body() createPriorityTagDto: CreatePriorityTagDto) {
    try {
      validateObjectId(createPriorityTagDto.companyId);
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.addJobPriorityTagToCompany(userId, createPriorityTagDto),
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
  async removeJobTagFromCompany(@Headers() headers: any, @Body() deleteTagDto: DeleteTagDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.removeJobTagFromCompany(userId, deleteTagDto),
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
  async removePriorityTagFromCompany(@Headers() headers: any, @Body() deleteTagDto: DeleteTagDto) {
    try {
      validateObjectId(deleteTagDto.tagId);
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.removeJobPriorityTagFromCompany(userId, deleteTagDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Update the name or colour of a Tag, within a company',
  })
  @ApiResponse({
    type: TagResponseDto,
    description: 'Tag successfully updated',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Patch('tags/')
  async updateTag(@Headers() headers: any, @Body() updateTagDto: UpdateTagDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.updateTag(userId, updateTagDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Update the name, colour, or PriorityLevel of a PriorityTag, within a company',
  })
  @ApiResponse({
    type: PriorityTagDto,
    description: 'PriorityTag successfully updated',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Patch('tags/p')
  async updatePriorityTag(@Headers() headers: any, @Body() updatePriorityTagDto: UpdatePriorityTagDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.updatePriorityTag(userId, updatePriorityTagDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  /// Tags

  ///Employees
  @ApiOperation({ summary: 'Assign an employee to a job' })
  @ApiResponse({ type: JobResponseDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Put('/employee')
  async assignEmployee(@Headers() headers: any, @Body() jobAssignDto: JobAssignDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.assignEmployee(userId, jobAssignDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({ summary: 'Unassign an employee to a job' })
  @ApiResponse({ type: JobResponseDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Patch('/employee')
  async unassignEmployee(@Headers() headers: any, @Body() jobAssignDto: JobAssignDto) {
    try {
      const userId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.unassignEmployee(userId, jobAssignDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({ summary: "Assign an employee to a job's taskList Item" })
  @ApiResponse({ type: JobResponseDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Put('/employee/taskItem')
  async assignEmployeeToTaskItem(@Headers() headers: any, @Body() taskAssignDto: TaskAssignDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.assignEmployeeToTaskItem(userId, taskAssignDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({ summary: "Unassign an employee to a job's taskList Item" })
  @ApiResponse({ type: JobResponseDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Patch('employee/taskItem')
  async unassignEmployeeFromTaskItem(@Headers() headers: any, @Body() taskAssignDto: TaskAssignDto) {
    try {
      const userId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.unassignEmployeeFromTaskItem(userId, taskAssignDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({ summary: 'Assign multiple employees to a job at once' })
  @ApiResponse({ type: JobResponseDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Put('/employees')
  async assignEmployees(@Headers() headers: any, @Body() jobAssignGroupDto: JobAssignGroupDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.assignEmployees(userId, jobAssignGroupDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({ summary: 'Unassign multiple employees to a job at once' })
  @ApiResponse({ type: JobResponseDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Patch('/employees')
  async unassignEmployees(@Headers() headers: any, @Body() jobAssignGroupDto: JobAssignGroupDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.unassignEmployees(userId, jobAssignGroupDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Assign a team to a job' })
  @ApiResponse({ type: JobResponseDto })
  @Put('/team')
  async assignTeam(@Headers() headers: any, @Body() assignTeamDto: JobAssignTeamDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.assignTeam(userId, assignTeamDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Unassign a team from a job' })
  @ApiResponse({ type: JobResponseDto })
  @Patch('/team')
  async unassignTeam(@Headers() headers: any, @Body() assignTeamDto: JobAssignTeamDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.unassignTeam(userId, assignTeamDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  ///Employees

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Add an attachment to a ${className}, (the key needed in in your form-data is "files")`,
    description: 'Max of 20 files at a time',
  })
  @ApiOkResponse({
    type: JobResponseDto,
    description: `The updated ${className} instance`,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 20 }]))
  @Patch('/add/attachments/')
  async addAttachments(
    @Headers() headers: any,
    @Query('jId') jId: string,
    @Query('eId') empId: string,
    @UploadedFiles() files: { files?: Express.Multer.File[] },
  ) {
    console.log(files);
    try {
      const userId = extractUserId(this.jwtService, headers);
      validateObjectIds([empId, jId]);
      const employeeId = new Types.ObjectId(empId);
      const jobId = new Types.ObjectId(jId);
      const attachmentDto = new AddAttachmentDto(employeeId, jobId);
      return {
        data: await this.jobService.addAttachments(userId, attachmentDto, files.files),
      };
    } catch (e) {
      throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Update the attachment array in a ${className}`,
    description: 'All you need to do is pass me the updated array of strings',
  })
  @ApiOkResponse({
    type: JobResponseDto,
    description: `The updated ${className} instance`,
  })
  @Patch('/updateAttachments')
  async updateAttachments(@Headers() headers: any, @Body() updateAttachmentDto: UpdateAttachmentDto) {
    try {
      const userId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.updateAttachments(userId, updateAttachmentDto),
      };
    } catch (e) {
      throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  ///STATUS
  @ApiOperation({ summary: 'Get a Status using its Id' })
  @ApiResponse({ type: JobStatusResponseDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Get('status/:sid')
  async getStatusById(@Headers() headers: any, @Param('sid') statusId: string) {
    try {
      validateObjectId(statusId);
      const sId = new Types.ObjectId(statusId);
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.getStatusById(userId, sId),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Get all Statuses in a company. Should not be used in kanban`,
  })
  @ApiOkResponse({
    type: JobStatusAllResponseDto,
    description: `An array of JobsStatuses`,
  })
  @Get('status/all/:cid')
  async findAllStatusInCompany(@Headers() headers: any, @Param('cid') cId: string) {
    try {
      validateObjectId(cId);
      const companyId = new Types.ObjectId(cId);
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.findAllStatusesInCompany(userId, companyId),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Add a Job Status to a company',
  })
  @ApiCreatedResponse({
    type: JobStatusResponseDto,
    description: 'The created JobStatus object',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Post('status/')
  async createStatus(@Headers() headers: any, @Body() createStatusDto: CreateStatusDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.createStatus(userId, createStatusDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Change the attributes of a Status within a company`,
  })
  @ApiOkResponse({
    type: JobResponseDto,
    description: `The updated Status object`,
  })
  @ApiBody({ type: UpdateStatusDto })
  @Patch('status/')
  async updateStatus(@Headers() headers: any, @Body() updateStatusDto: UpdateStatusDto) {
    try {
      const employeeId = new Types.ObjectId(updateStatusDto.employeeId);
      const statusId = new Types.ObjectId(updateStatusDto.statusId);
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      const updateStatus: UpdateStatus = new UpdateStatus(updateStatusDto);
      return {
        data: await this.jobService.updateStatus(userId, employeeId, statusId, updateStatus),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Remove a Job Status from a company',
  })
  @ApiResponse({
    type: BooleanResponseDto,
    description: 'Status successfully removed',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Delete('status')
  async deleteStatus(@Headers() headers: any, @Body() deleteStatusDto: DeleteStatusDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.deleteStatus(userId, deleteStatusDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({ summary: 'Add a ask to a Job' })
  @ApiResponse({
    type: JobResponseDto,
    description: 'The updated Job',
  })
  @ApiBody({ type: AddTaskDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Put('/task')
  async addTask(@Headers() headers: any, @Body() addTaskDto: AddTaskDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.addJobTask(userId, addTaskDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({ summary: 'Add an item to a Job Task' })
  @ApiResponse({
    type: JobResponseDto,
    description: 'The updated Job',
  })
  @ApiBody({ type: AddTaskItemDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Put('/taskItem')
  async addTaskItem(@Headers() headers: any, @Body() itemDto: AddTaskItemDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.addJobTaskItem(userId, itemDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({ summary: 'Remove a task within a Job, including all its Items' })
  @ApiResponse({
    type: JobResponseDto,
    description: 'The updated Job',
  })
  @ApiBody({ type: RemoveTaskDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Delete('/task')
  async removeTask(@Headers() headers: any, @Body() removeTaskDto: RemoveTaskDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.removeTaskFromJob(userId, removeTaskDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @ApiOperation({ summary: 'Remove an Item within a Task' })
  @ApiResponse({
    type: JobResponseDto,
    description: 'The updated Job',
  })
  //@ApiBody({ type: RemoveTaskItemDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Delete('/taskItem')
  async removeTaskItem(
    @Headers() headers: any,
    @Query('empId') eId: string,
    @Query('jobId') jId: string,
    @Query('taskId') tId: string,
    @Query('itemId') iId: string,
  ) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      validateObjectIds([eId, jId, tId, iId]);
      const employeeId = new Types.ObjectId(eId);
      const jobId = new Types.ObjectId(jId);
      const taskId = new Types.ObjectId(tId);
      const itemId = new Types.ObjectId(iId);
      const removeTaskItemDto = new RemoveTaskItemDto(employeeId, jobId, taskId, itemId);
      return {
        data: await this.jobService.removeJobTaskItem(userId, removeTaskItemDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Change the Title a Task`,
  })
  @ApiOkResponse({
    type: JobResponseDto,
    description: `The updated Job object, with a new comment`,
  })
  @ApiBody({ type: UpdateTaskDto })
  @Patch('/task')
  async editTask(@Headers() headers: any, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.editTaskInJob(userId, updateTaskDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Change an item a Task`,
  })
  @ApiOkResponse({
    type: JobResponseDto,
    description: `The updated Job object`,
  })
  @Patch('/taskItem')
  async editTaskItem(@Headers() headers: any, @Body() updateTaskItemDto: UpdateTaskItemDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.editJobTaskItem(userId, updateTaskItemDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Convert a Job TaskList Item into a new Job`,
    description: `It also removes the task from the current Job and updated the History to reflect the conversion`,
  })
  @ApiOkResponse({
    type: JobResponseDto,
    description: `The new Job that was created from the TaskList Item`,
  })
  @Patch('/convert')
  async convertItemToJob(@Headers() headers: any, @Body() convertItemToJobDto: ConvertItemToJobDto) {
    try {
      const userId: Types.ObjectId = extractUserId(this.jwtService, headers);
      return {
        data: await this.jobService.convertTaskListItemToJob(userId, convertItemToJobDto),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
