import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
  Headers,
  Post,
  Query,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  EmployeeListResponseDto,
  EmployeeResponseDto,
  GraphResponseDto,
  joinedEmployeeListResponseDto,
  joinedEmployeeResponseDto,
} from './entities/employee.entity';
import { Types } from 'mongoose';
import { AuthGuard } from '../auth/auth.guard';
import { extractUserId } from '../utils/Utils';
import { JwtService } from '@nestjs/jwt';
import { BooleanResponseDto } from '../shared/dtos/api-response.dto';
import { CurrentEmployeeDto } from '../shared/dtos/current-employee.dto';
import { AddSubordinatesDto, RemoveSubordinatesDto, UpdateEmployeeDto } from './dto/update-employee.dto';
import { ExternalCreateEmployeeDto } from './dto/create-employee.dto';
import { UsersService } from '../users/users.service';

const className = 'Employee';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async validateRequestWithEmployeeId(userId: Types.ObjectId, currentEmployeeId: Types.ObjectId) {
    const user = await this.userService.getUserById(userId);
    if (!user.joinedCompanies.find((joined) => joined.employeeId.toString() === currentEmployeeId.toString())) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async validateRequestWithCompannyId(userId: Types.ObjectId, currentEmployeeId: Types.ObjectId) {
    const user = await this.userService.getUserById(userId);
    if (!user.joinedCompanies.find((joined) => joined.employeeId.toString() === currentEmployeeId.toString())) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @ApiOperation({
    summary: `Used for testing. DO NOT USE IN PRODUCTION`,
  })
  @Get()
  hello() {
    return { message: 'Refer to /documentation for details on the API' };
  }
  //********Endpoints for test purposes - Start**********/
  @ApiOperation({
    summary: `Used for testing. DO NOT USE IN PRODUCTION`,
  })
  @Get('/all')
  async findAll() {
    // console.log('hi');
    const data = await this.employeeService.findAll();
    return { data: data };
  }

  @ApiOperation({
    summary: `Used for testing. DO NOT USE IN PRODUCTION`,
  })
  @Post('/create')
  async create(
    @Headers() headers: any,
    @Body()
    body: {
      currentEmployeeId: Types.ObjectId;
      createEmployeeDto: ExternalCreateEmployeeDto;
    },
  ) {
    const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
    // console.log('current employee: ', currentEmployee);
    if (currentEmployee.role.permissionSuite.includes('add new employees')) {
      let data;
      try {
        data = await this.employeeService.create(body.createEmployeeDto);
      } catch (e) {
        // console.log('error:', e);
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @ApiOperation({
    summary: `Used for testing. DO NOT USE IN PRODUCTION`,
  })
  @Get('/employeeWithRole/:roleId')
  async allEmployeesInCompanyWithRole(@Param('roleId') roleId: Types.ObjectId) {
    // console.log('In allEmployeesInCompanyWithRole');
    const data = await this.employeeService.allEmployeesInCompanyWithRole(roleId);
    return { data: data };
  }

  @ApiOperation({
    summary: `Used for testing. DO NOT USE IN PRODUCTION`,
  })
  @Get('/depthFirst/:employeeId')
  async depthFirst(@Param('employeeId') employeeId: Types.ObjectId) {
    // console.log('In depthFirst');
    const data = await this.employeeService.deptFirstTraversalId(employeeId);
    return { data: data };
  }

  //********Endpoints for test purposes - End**********/

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiNoContentResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
    description: `There was no data returned for the request. Please check the request and try again.`,
  })
  @ApiBadRequestResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
    description: `There is something wrong with the request. Please check the request and try again.`,
  })
  @ApiUnauthorizedResponse({
    type: HttpException,
    status: HttpStatus.UNAUTHORIZED,
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Get a detailed list of all ${className}s in a given company.`,
    description: `Returns all ${className}s in for a given Company. The user information is also added to the response. userId returns an object with the user information.`,
  })
  @ApiOkResponse({
    type: joinedEmployeeListResponseDto,
    description: `An array of mongodb objects of the ${className} class for a given Company, joined with the User and Role tables.`,
  })
  @ApiParam({
    name: 'currentEmployeeId',
    description: `This is the _id of the ${className} making the request.`,
    type: String,
  })
  @Get('/detailed/all/:currentEmployeeId')
  async findAllInCompanyDetailed(
    @Headers() headers: any,
    @Param('currentEmployeeId') currentEmployeeId: Types.ObjectId,
  ) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithEmployeeId(userId, currentEmployeeId);
    const currentEmployee = await this.employeeService.findById(currentEmployeeId);
    // console.log('currentEmployee', currentEmployee);
    if (currentEmployee.role.permissionSuite.includes('view all employees')) {
      let data;
      try {
        // console.log('In try block');
        data = await this.employeeService.detailedFindAllInCompany(currentEmployee.companyId);
        // console.log('data', data);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else if (currentEmployee.role.permissionSuite.includes('view employees under me')) {
      let data;
      try {
        data = await this.employeeService.detailedFindBelowMeInCompany(currentEmployeeId);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiNoContentResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
    description: `There was no data returned for the request. Please check the request and try again.`,
  })
  @ApiBadRequestResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
    description: `There is something wrong with the request. Please check the request and try again.`,
  })
  @ApiUnauthorizedResponse({
    type: HttpException,
    status: HttpStatus.UNAUTHORIZED,
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Get all ${className}s for a given company`,
    description: `Returns all ${className} instances for a given Company.`,
  })
  @ApiOkResponse({
    type: EmployeeListResponseDto,
    description: `An array of mongodb objects of the ${className} class for a given Company.`,
  })
  @ApiParam({
    name: 'currentEmployeeId',
    description: `This is the _id of the ${className} making the request.`,
    type: String,
  })
  @Get('/all/:currentEmployeeId')
  async findAllInCompany(@Headers() headers: any, @Param('currentEmployeeId') currentEmployeeId: Types.ObjectId) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithEmployeeId(userId, currentEmployeeId);

    const currentEmployee = await this.employeeService.findById(currentEmployeeId);
    // console.log('currentEmployee', currentEmployee);
    if (currentEmployee.role.permissionSuite.includes('view all employees')) {
      let data;
      try {
        data = await this.employeeService.findAllInCompany(currentEmployee.companyId);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else if (currentEmployee.role.permissionSuite.includes('view employees under me')) {
      let data;
      try {
        data = await this.employeeService.findBelowMeInCompany(currentEmployeeId);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
    description: `There was no data returned for the request. Please check the request and try again.`,
  })
  @ApiBadRequestResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
    description: `There is something wrong with the request. Please check the request and try again.`,
  })
  @ApiUnauthorizedResponse({
    type: HttpException,
    status: HttpStatus.UNAUTHORIZED,
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
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
    type: String,
  })
  @ApiQuery({
    name: 'currentEmployeeId',
    description: '_id of the employee making the request',
    type: String,
  })
  @Get('/detailed/id/:id')
  async findByIdDetailed(
    @Headers() headers: any,
    @Param('id') id: Types.ObjectId,
    @Query('currentEmployeeId') currentEmployeeId: Types.ObjectId,
  ) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithEmployeeId(userId, currentEmployeeId);

    const currentEmployee = await this.employeeService.findById(currentEmployeeId);
    console.log('currentEmployee', currentEmployee);
    if (currentEmployee.role.permissionSuite.includes('view all employees')) {
      const data = await this.employeeService.detailedFindById(id);
      return { data: data };
    } else if (currentEmployee.role.permissionSuite.includes('view employees under me')) {
      let data;
      try {
        data = await this.employeeService.detailedFindByIdUnderMe(id, currentEmployeeId);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
    description: `There was no data returned for the request. Please check the request and try again.`,
  })
  @ApiBadRequestResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
    description: `There is something wrong with the request. Please check the request and try again.`,
  })
  @ApiUnauthorizedResponse({
    type: HttpException,
    status: HttpStatus.UNAUTHORIZED,
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
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
    type: String,
  })
  @Get('id/:id')
  async findById(
    @Headers() headers: any,
    @Param('id') id: Types.ObjectId,
    @Query('currentEmployeeId') currentEmployeeId: Types.ObjectId,
  ) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithEmployeeId(userId, currentEmployeeId);

    const currentEmployee = await this.employeeService.findById(currentEmployeeId);
    // console.log('currentEmployee', currentEmployee);
    if (currentEmployee.role.permissionSuite.includes('view all employees')) {
      const data = await this.employeeService.findById(id);
      return { data: data };
    } else if (currentEmployee.role.permissionSuite.includes('view employees under me')) {
      let data;
      try {
        data = await this.employeeService.findByIdUnderMe(id, currentEmployeeId);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
    description: `There was no data returned for the request. Please check the request and try again.`,
  })
  @ApiBadRequestResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
    description: `There is something wrong with the request. Please check the request and try again.`,
  })
  @ApiUnauthorizedResponse({
    type: HttpException,
    status: HttpStatus.UNAUTHORIZED,
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Gets a list of employees that are allowed to be made subordinates of the current employee`,
    description: `Returns a list of ${className}`,
  })
  @ApiOkResponse({
    type: EmployeeListResponseDto,
  })
  @ApiParam({
    name: 'employeeId',
    description: `The _id attribute of the ${className}, for which a list of potential subordinates needs to be returned.`,
    type: String,
  })
  @Get('/listPotentialSubordinates/:employeeId')
  async listPotentialSubordinates(@Headers() headers: any, @Param('employeeId') id: Types.ObjectId) {
    let data;
    try {
      data = await this.employeeService.listPotentialSubordinates(id);
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
    status: HttpStatus.NO_CONTENT,
    description: `There was no data returned for the request. Please check the request and try again.`,
  })
  @ApiBadRequestResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
    description: `There is something wrong with the request. Please check the request and try again.`,
  })
  @ApiUnauthorizedResponse({
    type: HttpException,
    status: HttpStatus.UNAUTHORIZED,
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Gets a list of all the employees in the company that are allowed to be made the superior of the current employee`,
    description: `Returns a list of ${className}`,
  })
  @ApiOkResponse({
    type: EmployeeListResponseDto,
  })
  @ApiParam({
    name: 'employeeId',
    description: `The _id attribute of the ${className}, for which a list of potential superiors needs to be returned.`,
    type: String,
  })
  @Get('/listPotentialSuperiors/:employeeId')
  async listSuperiors(@Headers() headers: any, @Param('employeeId') id: Types.ObjectId) {
    let data;
    try {
      data = await this.employeeService.listPotentialSuperiors(id);
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
    status: HttpStatus.NO_CONTENT,
    description: `There was no data returned for the request. Please check the request and try again.`,
  })
  @ApiBadRequestResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
    description: `There is something wrong with the request. Please check the request and try again.`,
  })
  @ApiUnauthorizedResponse({
    type: HttpException,
    status: HttpStatus.UNAUTHORIZED,
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Get data for the graph view of the company`,
    description: `Return the nodes and edged for the graph view of the company. Also returns the nodes mapped to the ids of the employees.`,
  })
  @ApiOkResponse({
    type: GraphResponseDto,
    description: `This returns the data needed to render the graph view of the company`,
  })
  @ApiParam({
    name: 'currentEmployeeId',
    description: `The _id attribute of the employee that is making the request.`,
    type: String,
  })
  @Get('/graphViewData/:currentEmployeeId')
  async graphData(@Headers() headers: any, @Param('currentEmployeeId') currentEmployeeId: Types.ObjectId) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithEmployeeId(userId, currentEmployeeId);

    const currentEmployee = await this.employeeService.findById(currentEmployeeId);
    const data = await this.employeeService.graphData(currentEmployee.companyId);
    return { data: data };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
    description: `There was no data returned for the request. Please check the request and try again.`,
  })
  @ApiBadRequestResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
    description: `There is something wrong with the request. Please check the request and try again.`,
  })
  @ApiUnauthorizedResponse({
    type: HttpException,
    status: HttpStatus.UNAUTHORIZED,
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
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
    name: 'employeeId',
    description: `The _id attribute of the ${className} to be updated.`,
    type: String,
  })
  @ApiBody({ type: UpdateEmployeeDto })
  @Patch(':employeeId')
  async update(
    @Headers() headers: any,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @Param('employeeId') employeeId: Types.ObjectId,
  ) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithEmployeeId(userId, updateEmployeeDto.currentEmployeeId);

    const currentEmployee = await this.employeeService.findById(updateEmployeeDto.currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('edit employees')) {
      //TODO: change edit permission
      let data;
      try {
        data = await this.employeeService.update(employeeId, updateEmployeeDto);
      } catch (e) {
        console.log('error:', e);
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
    description: `There was no data returned for the request. Please check the request and try again.`,
  })
  @ApiBadRequestResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
    description: `There is something wrong with the request. Please check the request and try again.`,
  })
  @ApiUnauthorizedResponse({
    type: HttpException,
    status: HttpStatus.UNAUTHORIZED,
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
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
    name: 'employeeId',
    description: `The _id attribute of the ${className} to be updated.`,
    type: String,
  })
  @ApiBody({ type: AddSubordinatesDto })
  @Patch('addSubordinate/:employeeId')
  async addSubordinates(
    @Headers() headers: any,
    @Param('employeeId') employeeId: Types.ObjectId,
    @Body() addSubordinatesDto: AddSubordinatesDto,
  ) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithEmployeeId(userId, addSubordinatesDto.currentEmployeeId);

    const currentEmployee = await this.employeeService.findById(addSubordinatesDto.currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('edit employees')) {
      let data;
      try {
        data = await this.employeeService.addSubordinates(employeeId, addSubordinatesDto);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
    description: `There was no data returned for the request. Please check the request and try again.`,
  })
  @ApiBadRequestResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
    description: `There is something wrong with the request. Please check the request and try again.`,
  })
  @ApiUnauthorizedResponse({
    type: HttpException,
    status: HttpStatus.UNAUTHORIZED,
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
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
    name: 'employeeId',
    description: `The _id attribute of the ${className} to be updated.`,
    type: String,
  })
  @ApiBody({ type: RemoveSubordinatesDto })
  @Patch('removeSubordinate/:employeeId')
  async removeSubordinate(
    @Headers() headers: any,
    @Param('employeeId') employeeId: Types.ObjectId,
    @Body() removeSubordinatesDto: RemoveSubordinatesDto,
  ) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithEmployeeId(userId, removeSubordinatesDto.currentEmployeeId);

    const currentEmployee = await this.employeeService.findById(removeSubordinatesDto.currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('edit employees')) {
      let data;
      try {
        data = await this.employeeService.removeSubordinates(employeeId, removeSubordinatesDto);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
    description: `There was no data returned for the request. Please check the request and try again.`,
  })
  @ApiBadRequestResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
    description: `There is something wrong with the request. Please check the request and try again.`,
  })
  @ApiUnauthorizedResponse({
    type: HttpException,
    status: HttpStatus.UNAUTHORIZED,
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
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
    name: 'employeeId',
    description: `The _id attribute of the ${className}`,
    type: String,
  })
  @Delete(':employeeId')
  async remove(
    @Headers() headers: any,
    @Param('employeeId') employeeId: Types.ObjectId,
    @Body() currentEmployeeDto: CurrentEmployeeDto,
  ) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithEmployeeId(userId, currentEmployeeDto.currentEmployeeId);

    const currentEmployee = await this.employeeService.findById(currentEmployeeDto.currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('delete employees')) {
      let data;
      try {
        console.log('In try block');
        data = await this.employeeService.remove(employeeId);
      } catch (e) {
        console.log('error:', e);
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }

      if (data === false) {
        throw new HttpException('update unsuccessful', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return { data: data };
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
