import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  Query,
  Headers,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import {
  CompanyAllNameResponseDto,
  CreateCompanyDto,
  CreateCompanyResponseDto,
  findCompanyResponseDto,
} from './dto/create-company.dto';
import { UpdateCompanyDto, UpdateCompanyJobStatusesDto, UpdateCompanyJobStatuses } from './dto/update-company.dto';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AddUserToCompanyDto } from './dto/add-user-to-company.dto';
import mongoose, { FlattenMaps, Types } from 'mongoose';
import {
  Company,
  CompanyAccountDetailsResponseDto,
  CompanyAllResponseDto,
  CompanyDetailedResponseDto,
  CompanyResponseDto,
} from './entities/company.entity';
import { LeaveCompanyDto } from './dto/delete-employee-in-company.dto';
import { extractUserId, isBase64Uri, validateObjectId, validateObjectIds } from '../utils/Utils';
import { JwtService } from '@nestjs/jwt';
import { BooleanResponseDto } from '../shared/dtos/api-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JobStatusAllResponseDto } from '../job/dto/job-responses.dto';
import { EmployeeService } from '../employee/employee.service';
import { DeleteCompanyDto } from './dto/delete-company.dto';

const className = 'Company';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly jwtService: JwtService,
    private readonly employeeService: EmployeeService,
  ) {}
  validateObjectId(id: string | Types.ObjectId): boolean {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  @UseGuards(AuthGuard) //Need to add authorization
  @Get()
  lookAtDocumentation() {
    return { message: 'Refer to /documentation for details on the API' };
  }

  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.CONFLICT,
  })
  @ApiOperation({
    summary: `Create a new ${className}`,
    description: 'Further details',
  })
  @ApiBody({ type: CreateCompanyDto })
  @ApiResponse({
    status: 201,
    type: CreateCompanyResponseDto,
    description: `The access token and ${className}'s Id used for querying.`,
  })
  @Post('/create')
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<CreateCompanyResponseDto> {
    if (createCompanyDto.logo) {
      if (!isBase64Uri(createCompanyDto.logo)) {
        throw new BadRequestException('Profile picture is invalid, it must be base64 encoded');
      }
    }
    return { data: await this.companyService.create(createCompanyDto) };
  }

  @ApiOperation({
    summary: `Add an employee to a company`,
    description: 'Further details',
  })
  @ApiBody({ type: AddUserToCompanyDto })
  @ApiOkResponse({ type: BooleanResponseDto })
  @Post('/add')
  async addEmployee(@Body() addUserDto: AddUserToCompanyDto) {
    // const currentEmployee = await this.employeeService.findById(
    //   body.currentEmployeeId,
    // );
    // if (currentEmployee.role.permissionSuite.includes('add new employees')) {
    //TODO: Figure out if this endpoint needs role based access
    const arr = [addUserDto.adminId, addUserDto.currentCompany];
    if (addUserDto.roleId) arr.push(addUserDto.roleId);
    validateObjectIds(arr);

    try {
      return { data: await this.companyService.addEmployee(addUserDto) };
    } catch (Error) {
      throw new HttpException('Internal server error', HttpStatus.CONFLICT);
    }
    // }
  }

  @UseGuards(AuthGuard)
  @ApiSecurity('JWT')
  @ApiOperation({
    summary: `Leave a Company`,
    description: 'The admin in the company will get a notification, and be able to see any jobs you were working on',
  })
  @ApiOkResponse({ type: BooleanResponseDto })
  @Patch('/leave')
  async leaveCompany(@Headers() headers: any, @Body() leaveCompanyDto: LeaveCompanyDto) {
    try {
      const userId = extractUserId(this.jwtService, headers);
      return { data: await this.companyService.leaveCompany(userId, leaveCompanyDto) };
    } catch (Error) {
      throw new HttpException('Internal server error', HttpStatus.CONFLICT);
    }
  }

  @ApiOperation({
    summary: `Get all ${className} Names (Except Privates ones)`,
  })
  @ApiOkResponse({
    type: CompanyAllNameResponseDto,
    description: `An array of mongodb objects of the ${className} class`,
  })
  @Get('/all/names')
  async findAllNames() {
    try {
      return { data: await this.companyService.getAllCompanyNames() };
    } catch (Error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard) //Need to add authorization
  @ApiOperation({
    summary: `DO NOT USE THIS ONE! Get all ${className} instances`,
  })
  @ApiOkResponse({
    type: CompanyAllResponseDto,
    description: `An array of mongodb objects of the ${className} class`,
  })
  @Get('/all')
  async findAll() {
    try {
      return { data: await this.companyService.getAllCompanies() };
    } catch (Error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: `Find a ${className}` })
  @ApiOkResponse({
    type: CompanyResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @Get('id/:id')
  async findOne(@Param('id') id: string) {
    try {
      validateObjectId(id);
      return {
        data: await this.companyService.getCompanyById(new Types.ObjectId(id)),
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({
    summary: `Find a ${className}, with Actual Employees and Inventory Items instead of ObjectIds`,
  })
  @ApiOkResponse({
    type: CompanyDetailedResponseDto,
    description: `The mongodb 'Detailed' object of the ${className}, with an _id attribute`,
  })
  @Get('id/:id/detailed')
  async findOneDetailed(@Param('id') id: string): Promise<{ data: FlattenMaps<Company> & { _id: Types.ObjectId } }> {
    try {
      validateObjectId(id);
      return {
        data: await this.companyService.getCompanyByIdDetailed(new Types.ObjectId(id)),
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({
    summary: `Find a ${className}, with Actual Employees and Inventory Items instead of ObjectIds`,
  })
  @ApiOkResponse({
    type: CompanyAccountDetailsResponseDto,
    description: `The mongodb 'Detailed' object of the ${className}, with an _id attribute`,
  })
  @Get('id/:id/accountDetails')
  async findOneAccountDetails(@Param('id') id: string) {
    try {
      validateObjectId(id);
      return {
        data: await this.companyService.getCompanyAccountDetails(new Types.ObjectId(id)),
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({
    summary: `Search for a company using Email or Company Name`,
    description: '\nurlEncode the search parameter!',
  })
  @ApiResponse({
    type: findCompanyResponseDto,
  })
  @ApiQuery({ name: 'str', description: 'An email or name of company' })
  @Get('search?')
  async findByEmailOrName(@Query('str') str: string) {
    try {
      str = decodeURIComponent(str);
      return {
        data: await this.companyService.getByEmailOrName(str),
      };
    } catch (e) {
      console.log(e);
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Update a company`,
    description: '',
  })
  @ApiOkResponse({
    type: CompanyResponseDto,
    description: `The updated ${className} object`,
  })
  @ApiBody({ type: UpdateCompanyDto })
  @Patch('update/:cid')
  async update(
    @Headers() headers: any,
    @Param('cid') cid: string,
    @Body()
    body: {
      currentEmployeeId: Types.ObjectId;
      updateCompanyDto: UpdateCompanyDto;
    },
  ) {
    const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('company settings')) {
      try {
        validateObjectId(cid);
        const userId = extractUserId(this.jwtService, headers);

        const companyId = new Types.ObjectId(cid);
        const updatedCompany = await this.companyService.update(userId, companyId, body.updateCompanyDto);
        return {
          data: updatedCompany,
        };
      } catch (e) {
        console.log(e);
        throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Change the Logo of a ${className}`,
    description: `Mime Type: multipart/mixed.\n The key for the image is "logo"`,
  })
  @ApiOkResponse({
    type: CompanyResponseDto,
    description: `The updated ${className} instance`,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('logo'))
  @Patch('/update/:cid/logo')
  async updateLogo(
    @Headers() headers: any,
    @Param('cid') companyId: string,
    @UploadedFile() logo: Express.Multer.File,
    // @Query('currentEmployeeId') currentEmployeeId: Types.ObjectId,
  ) {
    //console.log('In update endpoint');
    // const currentEmployee = await this.employeeService.findById(currentEmployeeId);
    // if (currentEmployee.role.permissionSuite.includes('company settings')) {
    try {
      validateObjectId(companyId);
      const userId = extractUserId(this.jwtService, headers);
      return {
        data: await this.companyService.updateLogo(userId, new Types.ObjectId(companyId), logo),
      };
    } catch (e) {
      throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // } else {
    //   throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    // }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Delete a ${className}`,
    description: `You send the ${className} ObjectId, and then they get deleted if the id is valid.\n 
    There will be rules on deletion later.`,
    security: [],
  })
  @ApiOkResponse({
    type: BooleanResponseDto,
    description: `A boolean value indicating whether or not the deletion was a success`,
  })
  @Delete('full')
  async remove(@Headers() headers: any, @Query('empId') empId: string, @Query('cId') cId: string) {
    validateObjectIds([empId, cId]);
    const employeeId = new Types.ObjectId(empId);
    const companyId = new Types.ObjectId(cId);
    const currentEmployee = await this.employeeService.findById(employeeId);
    if (currentEmployee.role.permissionSuite.includes('company settings')) {
      try {
        validateObjectId(cId);
        const userId = extractUserId(this.jwtService, headers);
        const deleteDto = new DeleteCompanyDto(employeeId, companyId);
        await this.companyService.deleteCompany(userId, deleteDto);
        return { data: true };
      } catch (e) {
        throw new HttpException('Internal Server Error', HttpStatus.SERVICE_UNAVAILABLE);
      }
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Get all Statuses in a company`,
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
        data: await this.companyService.findAllStatusesInCompany(userId, companyId),
      };
    } catch (e) {
      //console.log(e);
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Update the order of Job Statuses in company, this will be used for the kanban`,
    description: '',
  })
  @ApiOkResponse({
    type: JobStatusAllResponseDto,
    description: `The updated array`,
  })
  @ApiBody({ type: UpdateCompanyJobStatusesDto })
  @Patch('statuses')
  async updateStatusOrder(
    @Headers() headers: any,
    @Body()
    updateCompanyJobStatusesDto: UpdateCompanyJobStatusesDto,
  ) {
    const currentEmployee = await this.employeeService.findById(updateCompanyJobStatusesDto.employeeId);
    if (currentEmployee.role.permissionSuite.includes('company settings')) {
      try {
        const userId = extractUserId(this.jwtService, headers);
        const statusArr = new UpdateCompanyJobStatuses(updateCompanyJobStatusesDto);
        return {
          data: await this.companyService.updateCompanyStatuses(
            userId,
            updateCompanyJobStatusesDto.employeeId,
            statusArr,
          ),
        };
      } catch (e) {
        throw e;
      }
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
