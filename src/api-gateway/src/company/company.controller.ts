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
} from '@nestjs/common';
import { CompanyService } from './company.service';
import {
  CreateCompanyDto,
  CreateCompanyResponseDto,
  findCompanyResponseDto,
} from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBody,
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
  CompanyEmployeesResponseDto,
  CompanyResponseDto,
} from './entities/company.entity';
import { BooleanResponseDto } from '../users/dto/create-user.dto';
import { DeleteEmployeeFromCompanyDto } from './dto/delete-employee-in-company.dto';

const className = 'Company';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  validateObjectId(id: string | Types.ObjectId): boolean {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  @UseGuards(AuthGuard) //Need to add authorization
  @Get()
  hello() {
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
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<CreateCompanyResponseDto> {
    return await this.companyService.create(createCompanyDto);
  }

  @ApiBody({ type: AddUserToCompanyDto })
  @ApiOkResponse({ type: BooleanResponseDto })
  @Post('/add')
  async addEmployee(@Body() addUserDto: AddUserToCompanyDto) {
    this.validateObjectId(addUserDto.adminId);
    this.validateObjectId(addUserDto.currentCompany);

    try {
      return { data: await this.companyService.addEmployee(addUserDto) };
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.CONFLICT);
    }
  }

  @UseGuards(AuthGuard) //Need to add authorization
  @ApiOperation({
    summary: `Get all ${className} instances`,
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
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard) //Need to add authorization
  @ApiOperation({ summary: `Get all employees in ${className}` })
  @ApiOkResponse({
    type: CompanyEmployeesResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiParam({
    name: 'cid',
    description: `The _id attribute of the ${className}`,
  })
  @Get('/company/employees/:cid')
  async getAllInCompany(@Param('cid') cid: string) {
    this.validateObjectId(cid);
    const objId = new Types.ObjectId(cid);
    try {
      return { data: await this.companyService.getAllEmployees(objId) };
    } catch (Error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: `Find a ${className}` })
  @ApiOkResponse({
    type: CompanyResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiParam({
    name: 'cid',
    description: `The _id attribute of the ${className}`,
  })
  @Get('id/:id')
  findOne(@Param('id') id: string) {
    try {
      this.validateObjectId(id);
      return { data: this.companyService.getCompanyById(id) };
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

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
  @ApiOkResponse({
    type: CompanyResponseDto,
    description: `The updated ${className} object`,
  })
  @ApiBody({ type: UpdateCompanyDto })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    try {
      this.validateObjectId(id);
      const objectId = new Types.ObjectId(id);
      const updatedCompany = await this.companyService.update(
        objectId,
        updateCompanyDto,
      );
      return {
        data: updatedCompany,
      };
    } catch (e) {
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard)
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
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className}`,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      this.validateObjectId(id);
      const objectId = new Types.ObjectId(id);
      await this.companyService.deleteCompany(objectId);
      return { data: true };
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: `Delete an Employee from a company using their 'Id'`,
    description: `You send the Employee _id, and then they get deleted if the id is valid.`,
    security: [],
  })
  @ApiOkResponse({
    type: BooleanResponseDto,
    description: `A boolean value indicating whether or not the deletion was a success`,
  })
  @ApiBody({
    type: DeleteEmployeeFromCompanyDto,
    description: '',
  })
  @Delete('/emp')
  async removeEmployee(
    @Body() deleteEmployeeDto: DeleteEmployeeFromCompanyDto,
  ) {
    try {
      await this.companyService.deleteEmployee(deleteEmployeeDto);
      return { data: true };
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
