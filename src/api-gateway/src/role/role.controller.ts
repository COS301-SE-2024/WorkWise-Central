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
import { CreateRoleDto, createRoleResponseDto } from './dto/create-role.dto';
import {
  UpdateRoleDto,
  BulkUpdateRoleDto,
  BulkUpdateRoleResponseDto,
} from './dto/update-role.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { BooleanResponseDto } from '../shared/dtos/api-response.dto';
import { RoleListResponseDto, RoleResponseDto } from './entity/role.entity';
import { AuthGuard } from '../auth/auth.guard';
import { extractUserId } from '../utils/Utils';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from 'src/employee/employee.service';

const className = 'Role';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
    private readonly employeeService: EmployeeService,
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
    const data = await this.roleService.findAll();
    if (data.length === 0) {
      throw new HttpException('No data found', HttpStatus.NO_CONTENT);
    }
    return { data: data };
  }

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
    type: RoleListResponseDto,
    description: `An array of mongodb objects of the ${className} class for a given Company.`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the Company for which to get all ${className} instances.`,
  })
  @Get('/all/:id')
  async findAllInCompany(@Param('id') id: Types.ObjectId) {
    let data;
    try {
      data = await this.roleService.findAllInCompany(id);
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
    description: `Returns the ${className} instance with the given id.`,
  })
  @ApiOkResponse({
    type: RoleResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className} to be retrieved.`,
  })
  @Get('id/:id')
  async findById(@Param('id') id: Types.ObjectId) {
    const data = await this.roleService.findById(id);
    if (!data) {
      throw new HttpException('No data found', HttpStatus.NO_CONTENT);
    }
    if (data.roleName === 'Owner' || data.roleName === 'Owner') {
      throw new HttpException('No data found', HttpStatus.NO_CONTENT);
    }
    return { data: data };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
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
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiOperation({
    summary: `Create a new ${className}`,
    description:
      'Call to create a new role. The userId and companyId are required. The roleId and superiorId are optional. It returns the access token and the employee Id.',
  })
  @ApiBody({ type: CreateRoleDto })
  @ApiResponse({
    status: 201,
    type: createRoleResponseDto,
  })
  @Post('/create')
  async create(
    @Headers() headers: any,
    @Body()
    body: { currentEmployeeId: Types.ObjectId; createRoleDto: CreateRoleDto },
  ) {
    const currentEmployee = await this.employeeService.findById(
      body.currentEmployeeId,
    );
    if (currentEmployee.role.permissionSuite.includes('company settings')) {
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
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiOperation({
    summary: `Update an ${className} instances`,
    description: `Send the ${className} ObjectId, and the updated object, and then they get updated if the id is valid.`,
  })
  @ApiOkResponse({
    type: RoleResponseDto,
    description: `The updated ${className} object`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className} to be updated.`,
  })
  @ApiBody({ type: UpdateRoleDto })
  @Patch(':id')
  async update(
    @Headers() headers: any,
    @Param('id') id: Types.ObjectId,
    @Body()
    body: { currentEmployeeId: Types.ObjectId; updateRoleDto: UpdateRoleDto },
  ) {
    const userId = extractUserId(this.jwtService, headers);
    const currentEmployee = await this.employeeService.findById(
      body.currentEmployeeId,
    );
    if (currentEmployee.role.permissionSuite.includes('company settings')) {
      let data;
      try {
        data = await this.roleService.update(userId, id, body.updateRoleDto);
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
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiOperation({
    summary: `Update an ${className} instances`,
    description: `Send array of ${className} ObjectIds and an array of updated objects, and then they get updated if the id is valid.`,
  })
  @ApiOkResponse({
    type: BulkUpdateRoleResponseDto,
    description: `The updated ${className} object`,
  })
  @ApiBody({ type: BulkUpdateRoleDto })
  async bulkUpdate(
    @Headers() headers: any,
    @Param('id') id: Types.ObjectId,
    @Body()
    body: {
      currentEmployeeId: Types.ObjectId;
      updateRoleDto: BulkUpdateRoleDto;
    },
  ) {
    const userId = extractUserId(this.jwtService, headers);
    const currentEmployee = await this.employeeService.findById(
      body.currentEmployeeId,
    );
    if (currentEmployee.role.permissionSuite.includes('company settings')) {
      let data;
      try {
        data = await this.roleService.bulkUpdate(userId, body.updateRoleDto);
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
    const currentEmployee = await this.employeeService.findById(
      body.currentEmployeeId,
    );
    if (currentEmployee.role.permissionSuite.includes('company settings')) {
      let data;
      try {
        data = await this.roleService.remove(id);
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
      throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
    }
  }
}
