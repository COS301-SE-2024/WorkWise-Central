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

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiOperation({
    summary: `Get all ${className} instances. DO NOT USE`,
    description: `Returns all ${className} instances in the database.`,
  })
  @ApiOkResponse({
    type: EmployeeListResponseDto,
    description: `An array of mongodb objects of the ${className} class.`,
  })
  @Get('/all')
  async findAll() {
    const data = await this.employeeService.findAll();
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
    @Headers() headers: any,
    @Param('companyId') companyId: Types.ObjectId,
  ) {
    const userId = extractUserId(this.jwtService, headers);
    if (
      await this.employeeService.validateRoleCompanyId(
        companyId,
        userId,
        'view all employees',
      )
    ) {
      let data;
      try {
        data = await this.employeeService.detailedFindAllInCompany(companyId);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else if (
      await this.employeeService.validateRoleCompanyId(
        companyId,
        userId,
        'view employees under me',
      )
    ) {
      let data;
      try {
        data = await this.employeeService.detailedFindBelowMeInCompany(
          userId,
          companyId,
        );
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
  ) {
    console.log('In find all endpoint');
    const userId = extractUserId(this.jwtService, headers);
    if (
      await this.employeeService.validateRoleCompanyId(
        companyId,
        userId,
        'view all employees',
      )
    ) {
      console.log('In if');
      let data;
      try {
        data = await this.employeeService.findAllInCompany(companyId);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else if (
      await this.employeeService.validateRoleCompanyId(
        companyId,
        userId,
        'view employees under me',
      )
    ) {
      console.log('In if else');
      let data;
      try {
        console.log('In try');
        data = await this.employeeService.findBelowMeInCompany(
          userId,
          companyId,
        );
      } catch (e) {
        console.log('In catch');
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
  ) {
    const userId = extractUserId(this.jwtService, headers);
    if (
      await this.employeeService.validateRoleEmployeeId(
        id,
        userId,
        'view all employees',
      )
    ) {
      const data = await this.employeeService.detailedFindById(id);
      return { data: data };
    } else if (
      await this.employeeService.validateRoleEmployeeId(
        id,
        userId,
        'view employees under me',
      )
    ) {
      let data;
      try {
        data = await this.employeeService.detailedFindByIdUnderMe(userId, id);
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
  async findById(@Headers() headers: any, @Param('id') id: Types.ObjectId) {
    // console.log('In findById endpoint');
    const userId = extractUserId(this.jwtService, headers);
    // console.log('User id:', userId);
    // console.log('Employee id:', id);
    if (
      await this.employeeService.validateRoleEmployeeId(
        id,
        userId,
        'view all employees',
      )
    ) {
      // console.log('In if');
      const data = await this.employeeService.findById(id);
      return { data: data };
    } else if (
      await this.employeeService.validateRoleEmployeeId(
        id,
        userId,
        'view employees under me',
      )
    ) {
      // console.log('In else');
      let data;
      try {
        data = await this.employeeService.findByIdUnderMe(userId, id);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      // console.log('In else');
      throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
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
    // console.log('In getOtherEmployees endpoint');
    // console.log('Id:', id);
    let data;
    try {
      // console.log('In try');
      data = await this.employeeService.getListOfOtherEmployees(id);
    } catch (e) {
      // console.log('In catch');
      // console.log(e);
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
  @Patch(':id')
  async update(
    @Headers() headers: any,
    @Param('id') id: Types.ObjectId,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    console.log('In update endpoint');
    const userId = extractUserId(this.jwtService, headers);
    console.log('User id:', userId);
    if (
      await this.employeeService.validateRoleEmployeeId(
        id,
        userId,
        'edit all employees',
      )
    ) {
      console.log('In if');
      let data;
      try {
        console.log('In try');
        data = await this.employeeService.update(id, updateEmployeeDto);
      } catch (e) {
        console.log('In catch');
        console.log(e);
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else if (
      await this.employeeService.validateRoleEmployeeId(
        id,
        userId,
        'edit employees under me',
      )
    ) {
      console.log('In else');
      let data;
      try {
        data = await this.employeeService.updateUnderMe(
          userId,
          id,
          updateEmployeeDto,
        );
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      console.log('In else');
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
  async remove(@Headers() headers: any, @Param('id') id: Types.ObjectId) {
    const userId = extractUserId(this.jwtService, headers);
    if (
      await this.employeeService.validateRoleEmployeeId(
        id,
        userId,
        'remove any employees',
      )
    ) {
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
      await this.employeeService.validateRoleEmployeeId(
        id,
        userId,
        'remove employees under me',
      )
    ) {
      let data;
      try {
        data = await this.employeeService.removeUnderMe(userId, id);
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

  // @Get('/depthFirst/:id')
  // async dephFirstTraversal(@Param('id') id: Types.ObjectId) {
  //   const data = await this.employeeService.deptFirstTraversal(id);
  //   return { data: data };
  // }
}
