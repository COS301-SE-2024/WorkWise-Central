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
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  CreateUserResponseDto,
  BooleanResponseDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import mongoose, { Types } from 'mongoose';
import { UserAllResponseDto, UserResponseDto } from './entities/user.entity';

const className = 'User';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  validateObjectId(id: string | Types.ObjectId, entity: string = ''): boolean {
    let response: string;
    if (entity === '') response = `Invalid ID`;
    else response = `Invalid ${entity} ID`;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException(response, HttpStatus.BAD_REQUEST);
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
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    type: CreateUserResponseDto,
    description: `The access token and ${className}'s Id used for querying. 
    currentCompany Will also be added soon*`,
  })
  @Post('/create')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.CONFLICT);
    }
  }

  //@UseGuards(AuthGuard)
  @ApiOperation({
    summary: `Get all ${className}s`,
  })
  @ApiOkResponse({
    type: UserAllResponseDto,
    description: `An array of mongodb objects of the ${className} class`,
  })
  @Get('all')
  async findAll() {
    try {
      return { response: await this.usersService.getAllUsers() };
    } catch (Error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: `Find a specific ${className}` })
  @ApiOkResponse({
    type: UserResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className}`,
  })
  @Get('id/:id')
  async findOne(@Param('id') identifier: string) {
    this.validateObjectId(identifier);
    try {
      return {
        response: await this.usersService.getUserById(identifier),
      };
    } catch (e) {
      console.log(e);
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({
    summary: `${className} exists or not`,
  })
  @ApiOkResponse({
    type: BooleanResponseDto,
    description: 'Response is a Boolean value',
  })
  @Post('/exists')
  async usernameAvailable(@Body('username') username: string) {
    try {
      return { response: !(await this.usersService.usernameExists(username)) };
    } catch (e) {
      console.log(e);
      throw new HttpException('Username Taken', HttpStatus.CONFLICT);
    }
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: `Change the attributes of a ${className}`,
    description: `
    You may send the entire ${className} object that was sent to you, in your request body.\r\n
    You may also send a singular attribute `,
    // /security: [],
  })
  @ApiOkResponse({
    type: UserResponseDto,
    description: `The updated ${className} object`,
  })
  @ApiBody({ type: UpdateUserDto })
  @Patch('/update')
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    /*
    console.log('Update');
    console.log(req);
    */
    const id = req.user.sub; //This attribute is retrieved in the JWT
    console.log(id);
    try {
      return {
        response: await this.usersService.updateUser(id, updateUserDto),
      };
    } catch (e) {
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard)
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
    name: 'id',
    description: `The _id attribute of the ${className}`,
  })
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    try {
      return this.usersService.softDelete(id);
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
