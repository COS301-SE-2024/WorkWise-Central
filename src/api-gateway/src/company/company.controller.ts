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
} from '@nestjs/common';
import { CompanyService } from './company.service';
import {
  CompanyAllNameResponseDto,
  CreateCompanyDto,
  CreateCompanyResponseDto,
  findCompanyResponseDto,
} from './dto/create-company.dto';
import {
  UpdateCompanyDto,
  UpdateCompanyJobStatusesDto,
  UpdateCompanyLogoDto,
  UpdateCompanyJobStatuses,
} from './dto/update-company.dto';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddUserToCompanyDto } from './dto/add-user-to-company.dto';
import mongoose, { FlattenMaps, Types } from 'mongoose';
import {
  Company,
  CompanyAllResponseDto,
  CompanyDetailedResponseDto,
  CompanyResponseDto,
} from './entities/company.entity';
import { DeleteEmployeeFromCompanyDto } from './dto/delete-employee-in-company.dto';
import { extractUserId, validateObjectId, validateObjectIds } from '../utils/Utils';
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
    return await this.companyService.create(createCompanyDto);
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

  @UseGuards(AuthGuard) //It may be accessed by external users
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
    summary: `Search for a company using Email or Company Name`,
    description: '\nurlencode the search parameter!',
  })
  @ApiResponse({
    type: findCompanyResponseDto,
  })
  @ApiQuery({ name: 'str', description: 'An email or name of company' })
  @Get('search?')
  async findByEmailOrName(
    @Query('str') str: string,
  ): Promise<{ data: FlattenMaps<Company> & { _id: Types.ObjectId } }> {
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
  })
  @ApiOkResponse({
    type: CompanyResponseDto,
    description: `The updated ${className} instance`,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateCompanyLogoDto })
  @UseInterceptors(FileInterceptor('logo'))
  @Patch('/update/:cid/logo')
  async updateLogo(
    @Headers() headers: any,
    @Param('cid') companyId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { currentEmployeeId: Types.ObjectId },
  ) {
    const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('company settings')) {
      try {
        validateObjectId(companyId);
        const userId = extractUserId(this.jwtService, headers);
        return {
          data: await this.companyService.updateLogo(userId, new Types.ObjectId(companyId), file),
        };
      } catch (e) {
        throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
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
    summary: `Delete an Employee from a company using their 'Id'`,
    description: `You send the Employee _id, and then they get deleted if the id is valid.`,
  })
  @ApiOkResponse({
    type: BooleanResponseDto,
    description: `A boolean value indicating whether or not the deletion was a success`,
  })
  @ApiBody({
    type: DeleteEmployeeFromCompanyDto,
  })
  @Delete('/emp')
  async removeEmployee(
    @Headers() headers: any,

    @Query('adminId') adminId: Types.ObjectId,
    @Query('companyId') companyId: Types.ObjectId,
    @Query('employeeToDeleteId') employeeToDeleteId: Types.ObjectId,
  ) {
    try {
      validateObjectId(adminId, 'employee');
      validateObjectId(companyId, 'company');
      validateObjectId(employeeToDeleteId, 'employeeToDelete');
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    const deleteEmployeeDto: DeleteEmployeeFromCompanyDto = new DeleteEmployeeFromCompanyDto(
      adminId,
      companyId,
      employeeToDeleteId,
    );
    //await this.companyService.deleteEmployee(userId, deleteEmployeeDto); //TODO: Use with cascading delete
    const userId = extractUserId(this.jwtService, headers);
    const currentEmployee = await this.employeeService.findById(deleteEmployeeDto.adminId);
    if (currentEmployee.role.permissionSuite.includes('remove any employees')) {
      let data;
      try {
        data = await this.employeeService.remove(deleteEmployeeDto.employeeToDeleteId);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }

      if (data === false) {
        throw new HttpException('update unsuccessful', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return { data: data };
    } else if (currentEmployee.role.permissionSuite.includes('remove employees under me')) {
      let data;
      try {
        data = await this.employeeService.removeUnderMe(
          userId,
          deleteEmployeeDto.employeeToDeleteId,
          deleteEmployeeDto.adminId,
        );
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }

      if (data === false) {
        throw new HttpException('update unsuccessful', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return { data: data };
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
      console.log(e);
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
    body: {
      currentEmployeeId: Types.ObjectId;
      updateCompanyJobStatusesDto: UpdateCompanyJobStatusesDto;
    },
  ) {
    const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('company settings')) {
      try {
        const userId = extractUserId(this.jwtService, headers);
        const statusArr = new UpdateCompanyJobStatuses(body.updateCompanyJobStatusesDto);
        return {
          data: await this.companyService.updateCompanyStatuses(
            userId,
            body.updateCompanyJobStatusesDto.employeeId,
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
