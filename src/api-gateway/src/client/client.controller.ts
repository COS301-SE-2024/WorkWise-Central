import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto, findClientResponseDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import mongoose, { FlattenMaps, Types } from 'mongoose';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponseDto, Client, ClientApiObject, CreateClientResponseDto } from './entities/client.entity';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { extractUserId, validateObjectId } from '../utils/Utils';
import { DeleteClientDto } from './dto/delete-client.dto';
import { EmployeeService } from '../employee/employee.service';

const className = 'Client';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly jwtService: JwtService,
    private readonly employeeService: EmployeeService,
  ) {}
  validateObjectId(id: string): boolean {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  @ApiOperation({ summary: 'Refer to the Documentation' })
  @Get()
  lookAtDocumentation() {
    return { message: 'Refer to /documentation for details on the API' };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.CONFLICT,
  })
  @ApiOperation({
    summary: `Create a new ${className}`,
    description: 'Further details',
    security: [],
  })
  @ApiBody({ type: [CreateClientDto] })
  @ApiResponse({
    type: CreateClientResponseDto,
    description: `The access token and ${className}'s Id used for querying. 
    currentCompany Will also be added soon*`,
  })
  @Post('/create')
  async create(@Headers() headers: any, @Body() createClientDto: CreateClientDto): Promise<CreateClientResponseDto> {
    console.log('Creating client');
    const currentEmployee = await this.employeeService.findById(createClientDto.employeeId);
    console.log(currentEmployee);
    if (currentEmployee.role.permissionSuite.includes('add a new clients')) {
      console.log('in if');
      try {
        const userId = extractUserId(this.jwtService, headers);
        const result = await this.clientService.create(userId, createClientDto);
        return new CreateClientResponseDto(result);
      } catch (e) {
        throw e;
      }
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: `DO NOT USE THIS! Get all ${className}s` }) // Add summary here
  @ApiResponse({
    isArray: true,
    type: ClientApiObject,
    status: 200,
    description: `The mongodb ${className} objects in an array, with _id attribute included`,
  })
  @Get('all')
  async findAll() {
    try {
      return { data: await this.clientService.getAllClients() };
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: `Get all ${className}s in a Company` }) // Add summary here
  @ApiResponse({
    isArray: true,
    type: ClientApiObject,
    status: 200,
    description: `The mongodb ${className} objects in an array, with _id attribute included`,
  })
  @Get('all/:cid')
  async findAllInCompany(
    @Headers() headers: any,
    @Param('cid') cid: string,
    @Body() body: { currentEmployeeId: Types.ObjectId },
  ) {
    const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('view all clients')) {
      try {
        validateObjectId(cid);
        const userId = extractUserId(this.jwtService, headers);
        return {
          data: await this.clientService.getAllClientsInCompany(userId, new Types.ObjectId(cid)),
        };
      } catch (e) {
        throw e;
      }
    } else if (currentEmployee.role.permissionSuite.includes('view clients under me')) {
      //TODO: Add validation for the company id
      return {
        data: await this.clientService.getListOfClientObjectsUnderEmployee(body.currentEmployeeId),
      };
    } else if (currentEmployee.role.permissionSuite.includes('view clients that are assigned to me')) {
      //TODO: Add validation for the company id
      return {
        data: await this.clientService.getListOfClientObjectsAssignedToEmployee(body.currentEmployeeId),
      };
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: `Find a specific ${className}` })
  @ApiResponse({
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className}`,
  })
  @Get('id/:id')
  async findOne(
    @Headers() headers: any,
    @Param('id') id: Types.ObjectId,
    @Body() body: { currentEmployeeId: Types.ObjectId },
  ) {
    const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
    const userId = extractUserId(this.jwtService, headers);
    if (currentEmployee.role.permissionSuite.includes('view all clients')) {
      validateObjectId(id);
      try {
        const response = await this.clientService.getClientById(userId, new Types.ObjectId(id));
        return new ApiResponseDto(response);
      } catch (e) {
        console.log(e);
        throw e;
      }
    } else if (currentEmployee.role.permissionSuite.includes('view clients under me')) {
      validateObjectId(id);
      try {
        const response = await this.clientService.getClientById(userId, new Types.ObjectId(id));
        if (this.clientService.clientIsBelowCurrentEmployee(body.currentEmployeeId, id)) {
          return new ApiResponseDto(response);
        } else {
          throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
      } catch (e) {
        console.log(e);
        throw e;
      }
    } else if (currentEmployee.role.permissionSuite.includes('view clients that are assigned to me')) {
      validateObjectId(id);
      try {
        const response = await this.clientService.getClientById(userId, new Types.ObjectId(id));
        if (this.clientService.clientIsAssignedToCurrentEmployee(body.currentEmployeeId, id)) {
          return new ApiResponseDto(response);
        } else {
          throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
      } catch (e) {
        console.log(e);
        throw e;
      }
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiResponse({
    type: findClientResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiOperation({ summary: `Find a specific ${className}` })
  @Get('/search')
  async findByEmailOrName(
    @Headers() headers: any,
    @Query('compId')
    compId: string,
    @Query('term') emailOrName: string,
    @Body() body: { currentEmployeeId: Types.ObjectId },
  ): Promise<{ data: (FlattenMaps<Client> & { _id: Types.ObjectId })[] }> {
    const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
    const userId = extractUserId(this.jwtService, headers);
    if (currentEmployee.role.permissionSuite.includes('view all clients')) {
      console.log('in if');
      validateObjectId(compId);
      const companyId = new mongoose.Types.ObjectId(compId);
      try {
        return {
          data: await this.clientService.getByEmailOrName(userId, companyId, emailOrName),
        };
      } catch (e) {
        console.log(e);
        throw e;
      }
    } else if (currentEmployee.role.permissionSuite.includes('view clients under me')) {
      validateObjectId(compId);
      const companyId = new mongoose.Types.ObjectId(compId);
      const list = await this.clientService.getListOfClientIdsUnderEmployee(body.currentEmployeeId);
      const clients = await this.clientService.getByEmailOrName(userId, companyId, emailOrName);
      const data = [];
      clients.forEach((client) => {
        if (list.includes(client._id)) {
          data.push(client);
        }
      });
      if (data.length !== 0) {
        return { data: data };
      } else {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    } else if (currentEmployee.role.permissionSuite.includes('view clients that are assigned to me')) {
      const list = await this.clientService.getListOfClientIdsAssignedToEmployee(body.currentEmployeeId);
      validateObjectId(compId);
      const companyId = new mongoose.Types.ObjectId(compId);
      const clients = await this.clientService.getByEmailOrName(userId, companyId, emailOrName);
      const data = [];
      clients.forEach((client) => {
        if (list.includes(client._id)) {
          data.push(client);
        }
      });
      if (data.length !== 0) {
        return { data: data };
      } else {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Change the attributes of a ${className}`,
    description: `You may send the entire ${className} object that was sent to you, in your request body`,
    security: [],
  })
  @ApiResponse({
    description: `The updated ${className} object`,
  })
  @ApiBody({ type: [UpdateUserDto] })
  @ApiParam({
    name: 'id',
    description: `${className} objectId for ${className} that you wish to delete`,
  })
  @Patch('/:id')
  async update(
    @Headers() headers: any,
    @Param('id') id: Types.ObjectId,
    @Body()
    body: {
      currentEmployeeId: Types.ObjectId;
      updateClientDto: UpdateClientDto;
    },
  ) {
    const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('edit all clients')) {
      console.log('in if');
      try {
        validateObjectId(id);
        const clientId = new Types.ObjectId(id);
        const userId = extractUserId(this.jwtService, headers);

        return await this.clientService.updateClient(userId, clientId, body.updateClientDto);
      } catch (e) {
        console.log(e);
        throw e;
      }
    } else if (currentEmployee.role.permissionSuite.includes('edit clients that are under me')) {
      if (this.clientService.clientIsBelowCurrentEmployee(body.currentEmployeeId, id)) {
        try {
          validateObjectId(id);
          const clientId = new Types.ObjectId(id);
          const userId = extractUserId(this.jwtService, headers);

          return await this.clientService.updateClient(userId, clientId, body.updateClientDto);
        } catch (e) {
          console.log(e);
          throw e;
        }
      } else {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    } else if (currentEmployee.role.permissionSuite.includes('edit clients that are assigned to me')) {
      if (this.clientService.clientIsAssignedToCurrentEmployee(body.currentEmployeeId, id)) {
        try {
          validateObjectId(id);
          const clientId = new Types.ObjectId(id);
          const userId = extractUserId(this.jwtService, headers);

          return await this.clientService.updateClient(userId, clientId, body.updateClientDto);
        } catch (e) {
          console.log(e);
          throw e;
        }
      }
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiBody({ type: DeleteClientDto })
  @ApiOperation({
    summary: `Delete a ${className}`,
    description: `You send the ${className} ObjectId, and then they get deleted if the id is valid. 
    There will be rules on deletion later.`,
  })
  @ApiResponse({
    description: `A boolean value indicating whether or not the deletion was a success`,
  })
  @Delete('/delete/')
  async remove(@Headers() headers: any, @Body() deleteClientDto: DeleteClientDto) {
    const currentEmployee = await this.employeeService.findById(deleteClientDto.employeeId);
    if (currentEmployee.role.permissionSuite.includes('remove any clients')) {
      console.log('in if');
      try {
        const userId = extractUserId(this.jwtService, headers);
        return this.clientService.softDelete(userId, deleteClientDto);
      } catch (e) {
        throw e;
      }
    } else if (currentEmployee.role.permissionSuite.includes('remove clients under me')) {
      if (this.clientService.clientIsBelowCurrentEmployee(deleteClientDto.employeeId, deleteClientDto.clientId)) {
        try {
          const userId = extractUserId(this.jwtService, headers);
          return this.clientService.softDelete(userId, deleteClientDto);
        } catch (e) {
          throw e;
        }
      } else {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    } else if (currentEmployee.role.permissionSuite.includes('remove clients assigned to me')) {
      if (this.clientService.clientIsAssignedToCurrentEmployee(deleteClientDto.employeeId, deleteClientDto.clientId)) {
        try {
          const userId = extractUserId(this.jwtService, headers);
          return this.clientService.softDelete(userId, deleteClientDto);
        } catch (e) {
          throw e;
        }
      }
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
