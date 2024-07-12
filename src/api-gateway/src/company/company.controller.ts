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
} from '@nestjs/common';
import { CompanyService } from './company.service';
import {
  CompanyAllNameResponseDto,
  CreateCompanyDto,
  CreateCompanyResponseDto,
  findCompanyResponseDto,
} from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBearerAuth,
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
import { validateObjectIds } from '../utils/Utils';
import { JwtService } from '@nestjs/jwt';

const className = 'Company';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly jwtService: JwtService,
  ) {}

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

  @ApiOperation({
    summary: `Add an employee to a company`,
    description: 'Further details',
  })
  @ApiBody({ type: AddUserToCompanyDto })
  @ApiOkResponse({ type: BooleanResponseDto })
  @Post('/add')
  async addEmployee(@Body() addUserDto: AddUserToCompanyDto) {
    const arr = [addUserDto.adminId, addUserDto.currentCompany];
    if (addUserDto.roleId) arr.push(addUserDto.roleId);
    validateObjectIds(arr);

    try {
      return { data: await this.companyService.addEmployee(addUserDto) };
    } catch (Error) {
      throw new HttpException('Internal server error', HttpStatus.CONFLICT);
    }
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
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
  @Get('/all/employees/:cid')
  async getAllEmployeesInCompany(@Param('cid') cid: string) {
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
  @Get('id/:id')
  async findOne(@Param('id') id: string) {
    try {
      this.validateObjectId(id);
      return {
        data: await this.companyService.getCompanyById(new Types.ObjectId(id)),
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
  @Patch(':cid')
  async update(
    @Headers() headers: any,
    @Param('cid') cid: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    try {
      this.validateObjectId(cid);
      const userId = this.extractUserId(headers);

      const companyId = new Types.ObjectId(cid);
      const updatedCompany = await this.companyService.update(
        userId,
        companyId,
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
  @ApiParam({
    name: 'cid',
    description: `The _id attribute of the ${className}`,
  })
  @Delete(':cid')
  async remove(@Headers() headers: any, @Param('cid') cid: string) {
    try {
      this.validateObjectId(cid);
      const userId = this.extractUserId(headers);
      const objectId = new Types.ObjectId(cid);
      await this.companyService.deleteCompany(userId, objectId);
      return { data: true };
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
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
    @Headers() headers: any,
    @Body() deleteEmployeeDto: DeleteEmployeeFromCompanyDto,
  ) {
    try {
      const userId = this.extractUserId(headers);
      await this.companyService.deleteEmployee(userId, deleteEmployeeDto);
      return { data: true };
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  private extractUserId(headers: any) {
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
