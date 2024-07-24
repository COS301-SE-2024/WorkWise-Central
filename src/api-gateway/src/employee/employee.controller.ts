import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  EmployeeListResponseDto,
  EmployeeResponseDto,
  joinedEmployeeListResponseDto,
  joinedEmployeeResponseDto,
} from './entities/employee.entity';
import { Types } from 'mongoose';
import { BooleanResponseDto } from '../shared/dtos/api-response.dto';
import { CompanyService } from 'src/company/company.service';
import { AuthGuard } from '../auth/auth.guard';

const className = 'Employee';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly companyService: CompanyService,
  ) {}

  @ApiOperation({
    summary: `Refer to Documentation`,
  })
  @Get()
  hello() {
    return { message: 'Refer to /documentation for details on the API' };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiOperation({
    summary: `Get all ${className} instances`,
    description: `Returns all ${className} instances in the database.`,
  })
  @ApiOkResponse({
    type: EmployeeListResponseDto,
    description: `An array of mongodb objects of the ${className} class.`,
  })
  @Get('/all')
  async findAll() {
    const data = await this.employeeService.findAll();
    if (data.length === 0) {
      throw new HttpException('No data found', HttpStatus.NO_CONTENT);
    }
    return { data: data };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiOperation({
    summary: `Get all ${className} instances for a given company, joined with the User and Role tables`,
    description: `Returns all ${className} instances in the database for a given Company, joined with the User and Role tables.`,
  })
  @ApiOkResponse({
    type: joinedEmployeeListResponseDto,
    description: `An array of mongodb objects of the ${className} class for a given Company, joined with the User and Role tables.`,
  })
  @ApiParam({
    name: 'companyId',
    description: `The _id attribute of the Company for which to get all ${className} instances.`,
  })
  @Get('/detailed/all/:companyId')
  async findAllInCompanyDetailed(
    @Param('companyId') companyId: Types.ObjectId,
  ) {
    const fieldsToJoin = ['userId', 'roleId'];
    let data;
    try {
      data = await this.employeeService.findAllInCompany(
        companyId,
        fieldsToJoin,
      );
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    if (data.length === 0) {
      throw new HttpException('No data found', HttpStatus.NO_CONTENT);
    }
    return { data: data };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiOperation({
    summary: `Get all ${className} instances for a given company`,
    description: `Returns all ${className} instances in the database for a given Company.`,
  })
  @ApiOkResponse({
    type: EmployeeListResponseDto,
    description: `An array of mongodb objects of the ${className} class for a given Company.`,
  })
  @ApiParam({
    name: 'companyId',
    description: `The _id attribute of the Company for which to get all ${className} instances.`,
  })
  @Get('/all/:companyId')
  async findAllInCompany(@Param('companyId') companyId: Types.ObjectId) {
    let data;
    try {
      data = await this.employeeService.findAllInCompany(companyId);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    if (data.length === 0) {
      throw new HttpException('No data found', HttpStatus.NO_CONTENT);
    }
    return { data: data };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiOperation({
    summary: `Find an ${className}`,
    description: `Returns the ${className} instance with the given id, joined with the User and Role tables.`,
  })
  @ApiOkResponse({
    type: joinedEmployeeResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute, joined with the User and Role tables.`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className} to be retrieved.`,
  })
  @Get('/detailed/id/:id')
  async findByIdDetailed(@Param('id') id: Types.ObjectId) {
    const fieldsToJoin = ['userId', 'roleId'];
    const data = await this.employeeService.findById(id, fieldsToJoin);
    if (data.length === 0) {
      throw new HttpException('No data found', HttpStatus.NO_CONTENT);
    }
    return { data: data };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiOperation({
    summary: `Find an ${className}`,
    description: `Returns the ${className} instance with the given id.`,
  })
  @ApiOkResponse({
    type: EmployeeResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className} to be retrieved.`,
  })
  @Get('id/:id')
  async findById(@Param('id') id: Types.ObjectId) {
    const data = await this.employeeService.findById(id);
    if (data.length === 0) {
      throw new HttpException('No data found', HttpStatus.NO_CONTENT);
    }
    return { data: data };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiOperation({
    summary: `Find the list of all the employees in the company except the given employee and their subordinates and superiors.`,
    description: `Returns the ${className} instance with the given id.`,
  })
  @ApiOkResponse({
    type: EmployeeListResponseDto,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className}.`,
  })
  @ApiParam({
    name: 'companyId',
    description: `The _id attribute of the Company.`,
  })
  @Get('/listOther/:id')
  async getOtherEmployees(@Param('id') id: Types.ObjectId) {
    let data;
    try {
      data = await this.employeeService.getListOfOtherEmployees(id);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    if (data.length === 0) {
      throw new HttpException('No data found', HttpStatus.NO_CONTENT);
    }
    return {
      data: data,
    };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiOperation({
    summary: `Update an ${className} instances`,
    description: `Send the ${className} ObjectId, and the updated object, and then they get updated if the id is valid.`,
  })
  @ApiOkResponse({
    type: EmployeeResponseDto,
    description: `The updated ${className} object`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className} to be updated.`,
  })
  @ApiBody({ type: UpdateEmployeeDto })
  @Patch(':id')
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    let data;
    try {
      data = await this.employeeService.update(id, updateEmployeeDto);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    return { data: data };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  @ApiOperation({
    summary: `Delete an ${className}`,
    description: `Send the ${className} ObjectId, and then they get deleted if the id is valid.\n `,
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
  async remove(@Param('id') id: Types.ObjectId) {
    let data;
    try {
      data = await this.employeeService.remove(id);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }

    if (data === false) {
      throw new HttpException(
        'update unsuccessful',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return { data: data };
  }
}
