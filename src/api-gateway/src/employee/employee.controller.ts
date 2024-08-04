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
  Headers,
  Post,
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
import { AuthGuard } from '../auth/auth.guard';
import { extractUserId } from '../utils/Utils';
import { JwtService } from '@nestjs/jwt';
import { CreateEmployeeDto } from './dto/create-employee.dto';

const className = 'Employee';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiOperation({
    summary: `Refer to Documentation`,
  })
  @Get()
  hello() {
    return { message: 'Refer to /documentation for details on the API' };
  }
  //********Endpoints for test purposes - Start**********/
  @Get('/all')
  async findAll() {
    const data = await this.employeeService.findAll();
    return { data: data };
  }

  @Post('/create')
  async create(
    @Headers() headers: any,
    @Body()
    body: {
      currentEmployeeId: Types.ObjectId;
      createEmployeeDto: CreateEmployeeDto;
    },
  ) {
    const currentEmployee = await this.employeeService.findById(
      body.currentEmployeeId,
    );
    if (currentEmployee.role.permissionSuite.includes('add employees')) {
      let data;
      try {
        data = await this.employeeService.create(body.createEmployeeDto);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  //********Endpoints for test purposes - End**********/

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
    @Headers() headers: any,
    @Param('companyId') companyId: Types.ObjectId,
    @Body() body: { currentEmployeeId: Types.ObjectId },
  ) {
    const userId = extractUserId(this.jwtService, headers);
    const currentEmployee = await this.employeeService.findById(
      body.currentEmployeeId,
    );
    if (currentEmployee.role.permissionSuite.includes('view all employees')) {
      let data;
      try {
        data = await this.employeeService.detailedFindAllInCompany(companyId);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else if (
      currentEmployee.role.permissionSuite.includes('view employees under me')
    ) {
      let data;
      try {
        data = await this.employeeService.detailedFindBelowMeInCompany(
          userId,
          companyId,
          body.currentEmployeeId,
        );
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
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
  async findAllInCompany(
    @Headers() headers: any,
    @Param('companyId') companyId: Types.ObjectId,
    @Body() body: { currentEmployeeId: Types.ObjectId },
  ) {
    const userId = extractUserId(this.jwtService, headers);
    const currentEmployee = await this.employeeService.findById(
      body.currentEmployeeId,
    );
    if (currentEmployee.role.permissionSuite.includes('view all employees')) {
      let data;
      try {
        data = await this.employeeService.findAllInCompany(companyId);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else if (
      currentEmployee.role.permissionSuite.includes('view employees under me')
    ) {
      let data;
      try {
        data = await this.employeeService.findBelowMeInCompany(
          userId,
          companyId,
          body.currentEmployeeId,
        );
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
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
  async findByIdDetailed(
    @Headers() headers: any,
    @Param('id') id: Types.ObjectId,
    @Body() body: { currentEmployeeId: Types.ObjectId },
  ) {
    const userId = extractUserId(this.jwtService, headers);
    const currentEmployee = await this.employeeService.findById(
      body.currentEmployeeId,
    );
    if (currentEmployee.role.permissionSuite.includes('view all employees')) {
      const data = await this.employeeService.detailedFindById(id);
      return { data: data };
    } else if (
      currentEmployee.role.permissionSuite.includes('view employees under me')
    ) {
      let data;
      try {
        data = await this.employeeService.detailedFindByIdUnderMe(
          userId,
          id,
          body.currentEmployeeId,
        );
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
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
  async findById(
    @Headers() headers: any,
    @Param('id') id: Types.ObjectId,
    @Body() body: { currentEmployeeId: Types.ObjectId },
  ) {
    const userId = extractUserId(this.jwtService, headers);
    const currentEmployee = await this.employeeService.findById(
      body.currentEmployeeId,
    );
    if (currentEmployee.role.permissionSuite.includes('view all employees')) {
      const data = await this.employeeService.findById(id);
      return { data: data };
    } else if (
      currentEmployee.role.permissionSuite.includes('view employees under me')
    ) {
      let data;
      try {
        data = await this.employeeService.findByIdUnderMe(
          userId,
          id,
          body.currentEmployeeId,
        );
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
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
  async getOtherEmployees(
    @Headers() headers: any,
    @Param('id') id: Types.ObjectId,
  ) {
    let data;
    try {
      data = await this.employeeService.getListOfOtherEmployees(id);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
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
  @Patch(':employeeId')
  async update(
    @Headers() headers: any,
    @Param('employeeId') employeeId: Types.ObjectId,
    @Body()
    body: {
      currentEmployeeId: Types.ObjectId;
      updateEmployeeDto: UpdateEmployeeDto;
    },
  ) {
    const userId = extractUserId(this.jwtService, headers);
    const currentEmployee = await this.employeeService.findById(
      body.currentEmployeeId,
    );
    if (currentEmployee.role.permissionSuite.includes('edit all employees')) {
      let data;
      try {
        data = await this.employeeService.update(
          employeeId,
          body.currentEmployeeId,
          body.updateEmployeeDto,
        );
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else if (
      currentEmployee.role.permissionSuite.includes('edit employees under me')
    ) {
      let data;
      try {
        data = await this.employeeService.updateUnderMe(
          userId,
          employeeId,
          body.updateEmployeeDto,
          body.currentEmployeeId,
        );
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
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
  async remove(
    @Headers() headers: any,
    @Param('id') id: Types.ObjectId,
    @Body() body: { currentEmployeeId: Types.ObjectId },
  ) {
    const userId = extractUserId(this.jwtService, headers);
    const currentEmployee = await this.employeeService.findById(
      body.currentEmployeeId,
    );
    if (currentEmployee.role.permissionSuite.includes('remove any employees')) {
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
    } else if (
      currentEmployee.role.permissionSuite.includes('remove employees under me')
    ) {
      let data;
      try {
        data = await this.employeeService.removeUnderMe(
          userId,
          id,
          body.currentEmployeeId,
        );
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
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
