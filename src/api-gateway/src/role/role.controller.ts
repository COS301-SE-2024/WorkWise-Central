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
  Headers,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { createRoleResponseDto, ExternalCreateRoleDto } from './dto/create-role.dto';
import { updateRoleResponseDto, ExternalUpdateRoleDto, ExternalBulkUpdateRoleDto } from './dto/update-role.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { BooleanResponseDto } from '../shared/dtos/api-response.dto';
import { RoleListResponseDto, RoleResponseDto } from './entity/role.entity';
import { AuthGuard } from '../auth/auth.guard';
import { extractUserId } from '../utils/Utils';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from '../employee/employee.service';
import { CurrentEmployeeDto } from '../shared/dtos/current-employee.dto';

const className = 'Role';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
    private readonly employeeService: EmployeeService,
  ) {}

  //********Endpoints for test purposes - Start**********/
  @ApiOperation({
    summary: `Used for testing. DO NOT USE IN PRODUCTION`,
  })
  @Get()
  hello() {
    return { message: 'Refer to /documentation for details on the API' };
  }

  @ApiOperation({
    summary: `Used for testing. DO NOT USE IN PRODUCTION`,
  })
  @Get('/all')
  async findAll() {
    const data = await this.roleService.findAll();
    if (data.length === 0) {
      throw new HttpException('No data found', HttpStatus.NO_CONTENT);
    }
    return { data: data };
  }

  @ApiOperation({
    summary: `Used for testing. DO NOT USE IN PRODUCTION`,
  })
  @Get('/createDefault/:id')
  async createDefault(@Param('id') id: Types.ObjectId) {
    let data;
    try {
      console.log('id', id);
      data = await this.roleService.createDefaultRoles(id);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
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
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Get all ${className} instances for a given company`,
    description: `Returns all ${className} instances in the database for a given Company.`,
  })
  @ApiOkResponse({
    type: RoleListResponseDto,
    description: `An array of mongodb objects of the ${className} class for a given Company.`,
  })
  @ApiParam({
    name: 'companyId',
    description: `The _id attribute of the Company for which to get all ${className} instances.`,
    type: String,
  })
  @Get('/all/:companyId')
  async findAllInCompany(@Param('companyId') companyId: Types.ObjectId) {
    console.log('In findAllInCompany');
    let data;
    try {
      console.log('In try clause');
      data = await this.roleService.findAllInCompany(companyId);
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
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Get all ${className} instances for a given company`,
    description: `Returns all ${className} instances in the database for a given Company.`,
  })
  @ApiOkResponse({
    type: RoleListResponseDto,
    description: `An array of mongodb objects of the ${className} class for a given Company. It excludes the Owner and Default role since those are not allowed to be edited by anyone`,
  })
  @ApiParam({
    name: 'companyId',
    description: `The _id attribute of the Company for which to get all ${className} instances.`,
    type: String,
  })
  @Get('/all/editing/:companyId')
  async findAllInCompanyForEditing(@Param('companyId') companyId: Types.ObjectId) {
    console.log('In findAllInCompanyForEditing');
    let data;
    try {
      console.log('In try clause');
      data = await this.roleService.findAllInCompanyForEditing(companyId);
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
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Find an ${className}`,
    description: `Returns the ${className} instance with the given id.`,
  })
  @ApiOkResponse({
    type: RoleResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiParam({
    name: 'roleId',
    description: `The _id attribute of the ${className} to be retrieved.`,
    type: String,
  })
  @Get('id/:roleId')
  async findById(@Param('roleId') roleId: Types.ObjectId) {
    console.log('In findById endpoint');
    const data = await this.roleService.findById(roleId);
    console.log('data: ', data);
    if (!data) {
      throw new HttpException('No data found', HttpStatus.NO_CONTENT);
    }
    console.log('No exception thrown');
    return { data: data };
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
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Get the list of all the permissions available in the system.`,
    description: `Returns the array of strings of all the permissions available in the system.`,
  })
  @ApiOkResponse({
    type: RoleResponseDto,
    description: ``,
  })
  @Get('/allPermissions')
  async getPermissionsArray() {
    return { data: await this.roleService.getPermissionsArray() };
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
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Create a new ${className}`,
    description:
      'Call to create a new role. The userId and companyId are required. The roleId and superiorId are optional. It returns the access token and the employee Id.',
  })
  @ApiBody({ type: ExternalCreateRoleDto })
  @ApiResponse({
    status: 201,
    type: createRoleResponseDto,
  })
  @Post('/create')
  async create(@Headers() headers: any, @Body() body: ExternalCreateRoleDto) {
    console.log('In create endpoint');
    const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
    console.log('currentEmployee: ', currentEmployee);
    if (currentEmployee.role.permissionSuite.includes('company settings')) {
      console.log('In if');
      let data;
      try {
        data = await this.roleService.create(body.createRoleDto);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
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
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Update an ${className} instances`,
    description: `Send the ${className} ObjectId, and the updated object, and then they get updated if the id is valid.`,
  })
  @ApiOkResponse({
    type: updateRoleResponseDto,
    description: `The updated ${className} object`,
  })
  @ApiParam({
    name: 'roleId',
    description: `The _id attribute of the ${className} to be updated.`,
    type: String,
  })
  @ApiBody({ type: ExternalUpdateRoleDto })
  @Patch(':roleId')
  async update(@Headers() headers: any, @Param('roleId') roleId: Types.ObjectId, @Body() body: ExternalUpdateRoleDto) {
    console.log('In update endpoint');
    const userId = extractUserId(this.jwtService, headers);
    const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
    console.log('currentEmployee: ', currentEmployee);
    if (currentEmployee.role.permissionSuite.includes('company settings')) {
      let data;
      try {
        data = await this.roleService.update(userId, roleId, body.updateRoleDto);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
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
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Update an ${className} instances`,
    description: `Send array of ${className} ObjectIds and an array of updated objects, and then they get updated if the id is valid.`,
  })
  @ApiOkResponse({
    type: [updateRoleResponseDto],
    description: `The updated ${className} object`,
  })
  @ApiParam({
    name: 'companyId',
    description: `The _id attribute of the ${className} to be retrieved.`,
    type: String,
  })
  @ApiBody({ type: ExternalBulkUpdateRoleDto })
  @Patch('/bulkUpdate/:companyId')
  async bulkUpdate(
    @Headers() headers: any,
    @Param('companyId') companyId: Types.ObjectId,
    @Body()
    body: ExternalBulkUpdateRoleDto,
  ) {
    console.log('In bulkUpdate endpoint');
    const userId = extractUserId(this.jwtService, headers);
    const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
    console.log('currentEmployee: ', currentEmployee);
    if (currentEmployee.role.permissionSuite.includes('company settings')) {
      let data;
      console.log('In if');
      try {
        console.log('In try clause');
        data = await this.roleService.bulkUpdate(userId, body.bulkUpdateRoleDto, companyId);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
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
    name: 'roleId',
    description: `The _id attribute of the ${className} to be deleted.`,
    type: String,
  })
  @Delete(':roleId')
  async remove(@Headers() headers: any, @Param('roleId') roleId: Types.ObjectId, @Body() body: CurrentEmployeeDto) {
    const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('company settings')) {
      let data;
      try {
        data = await this.roleService.remove(roleId);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }

      if (data === false) {
        throw new HttpException('update unsuccessful', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return { data: data };
    } else {
      throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
    }
  }
}
