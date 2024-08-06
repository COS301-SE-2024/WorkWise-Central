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

const className = 'Client';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly jwtService: JwtService,
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
    try {
      const userId = extractUserId(this.jwtService, headers);
      const result = await this.clientService.create(userId, createClientDto);
      return new CreateClientResponseDto(result);
    } catch (e) {
      throw e;
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
  async findAllInCompany(@Headers() headers: any, @Param('cid') cid: string) {
    try {
      validateObjectId(cid);
      const userId = extractUserId(this.jwtService, headers);
      return {
        data: await this.clientService.getAllClientsInCompany(userId, new Types.ObjectId(cid)),
      };
    } catch (e) {
      throw e;
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
  async findOne(@Headers() headers: any, @Param('id') id: string) {
    validateObjectId(id);
    try {
      const userId = extractUserId(this.jwtService, headers);
      const response = await this.clientService.getClientById(userId, new Types.ObjectId(id));
      return new ApiResponseDto(response);
    } catch (e) {
      console.log(e);
      throw e;
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
  ): Promise<{ data: (FlattenMaps<Client> & { _id: Types.ObjectId })[] }> {
    validateObjectId(compId);
    const companyId = new mongoose.Types.ObjectId(compId);
    try {
      const userId = extractUserId(this.jwtService, headers);

      return {
        data: await this.clientService.getByEmailOrName(userId, companyId, emailOrName),
      };
    } catch (e) {
      console.log(e);
      throw e;
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
  async update(@Headers() headers: any, @Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    try {
      validateObjectId(id);
      const clientId = new Types.ObjectId(id);
      const userId = extractUserId(this.jwtService, headers);

      return await this.clientService.updateClient(userId, clientId, updateClientDto);
    } catch (e) {
      console.log(e);
      throw e;
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
  remove(@Headers() headers: any, @Body() deleteClientDto: DeleteClientDto) {
    try {
      const userId = extractUserId(this.jwtService, headers);
      return this.clientService.softDelete(userId, deleteClientDto);
    } catch (e) {
      throw e;
    }
  }
}
