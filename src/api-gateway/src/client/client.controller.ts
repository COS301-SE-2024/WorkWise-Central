import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import {
  CreateClientDto,
  findClientResponseDto,
} from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import mongoose, { FlattenMaps, Types } from 'mongoose';
// import { AuthGuard } from '../auth/auth.guard';
import {
  ApiResponseDto,
  Client,
  ClientApiObject,
  CreateClientResponseDto,
} from './entities/client.entity';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';

const className = 'Client';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
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
  async create(
    @Body() createClientDto: CreateClientDto,
  ): Promise<CreateClientResponseDto> {
    try {
      const result = await this.clientService.create(createClientDto);
      return new CreateClientResponseDto(result);
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.CONFLICT);
    }
  }

  //@UseGuards(AuthGuard)
  @ApiOperation({ summary: `Get all ${className}s` }) // Add summary here
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
    } catch (Error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: `Find a specific ${className}` })
  @ApiResponse({
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className}`,
  })
  @Get('id/:id')
  async findOne(@Param('id') id: string) {
    this.validateObjectId(id);
    try {
      const temp = await this.clientService.getClientById(id);
      return new ApiResponseDto(temp);
    } catch (e) {
      console.log(e);
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @ApiResponse({
    type: findClientResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiOperation({ summary: `Find a specific ${className}` })
  @Get('/search')
  async findByEmailOrName(
    @Query('compId')
    compId: string,
    @Query('str') str: string,
  ): Promise<{ data: (FlattenMaps<Client> & { _id: Types.ObjectId })[] }> {
    this.validateObjectId(compId);
    const companyId = new mongoose.Types.ObjectId(compId);
    try {
      return {
        data: await this.clientService.getByEmailOrName(companyId, str),
      };
    } catch (e) {
      console.log(e);
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({
    summary: `Change the attributes of a ${className}`,
    description: `You may send the entire ${className} object that was sent to you, in your request body`,
    security: [],
  })
  @ApiResponse({
    description: `The updated ${className} object`,
  })
  @ApiBody({ type: [UpdateUserDto] })
  //@ApiQuery({})
  @ApiParam({
    name: 'id',
    description: `${className} objectId for ${className} that you wish to delete`,
  })
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    this.validateObjectId(id);
    const objectId = new Types.ObjectId(id);
    try {
      return await this.clientService.updateClient(objectId, updateClientDto);
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.CONFLICT);
    }
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: `Delete a ${className}`,
    description: `You send the ${className} ObjectId, and then they get deleted if the id is valid. 
    There will be rules on deletion later.`,
    security: [],
  })
  @ApiResponse({
    description: `A boolean value indicating whether or not the deletion was a success`,
  })
  @Delete('/delete/:id')
  remove(@Param('id') id: string /*, @Body() pass: { pass: string }*/) {
    //console.log(pass); //Will be implemented later
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    try {
      return this.clientService.softDelete(id);
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
