import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
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
  ApiBearerAuth,
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
import { JwtService } from '@nestjs/jwt';
import { UserEmailVerificationDTO } from './dto/user-validation.dto';

const className = 'User';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  validateObjectId(id: string | Types.ObjectId, entity: string = ''): boolean {
    let data: string;
    if (entity === '') data = `Invalid ID`;
    else data = `Invalid ${entity} ID`;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException(data, HttpStatus.BAD_REQUEST);
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
  //@ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Get all ${className}s`,
  })
  @ApiOkResponse({
    type: UserAllResponseDto,
    description: `An array of mongodb objects of the ${className} class`,
  })
  @Get('all')
  async findAll(@Headers() headers: any) {
    try {
      console.log(headers);
      return { data: await this.usersService.getAllUsers() };
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
  async findOne(@Headers() headers: any, @Param('id') identifier: string) {
    try {
      this.validateObjectId(identifier);
      const userId = this.extractUserId(headers);
      console.log(userId, 'is searching'); //Add Guard here as well
      return {
        data: await this.usersService.getUserById(
          new Types.ObjectId(identifier),
        ),
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
  @Post('/exists/username')
  async usernameExists(@Body('username') username: string) {
    try {
      return { data: await this.usersService.usernameExists(username) };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('Something went wrong ');
    }
  }

  @ApiOperation({
    summary: `${className} Email exists or not`,
  })
  @ApiOkResponse({
    type: BooleanResponseDto,
    description: 'Response is a Boolean value',
  })
  @Post('/exists/email')
  async emailExists(@Body() dto: UserEmailVerificationDTO) {
    try {
      return { data: await this.usersService.emailExists(dto.email) };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('Something went wrong ');
    }
  }

  @ApiOperation({
    summary: `${className} Phone Number exists or not`,
  })
  @ApiOkResponse({
    type: BooleanResponseDto,
    description: 'Response is a Boolean value',
  })
  @Post('/exists/phone')
  async phoneExists(@Body('phone') phone: string) {
    try {
      return { data: await this.usersService.phoneExists(phone) };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('Something went wrong ');
    }
  }

  @ApiOperation({
    summary: `Confirms whether a phone number is or not`,
  })
  @ApiOkResponse({
    type: BooleanResponseDto,
    description: 'Response is a Boolean value',
  })
  @Get('/isValid/phone')
  async isValidPhoneNumber(@Body('phone') phone: string) {
    try {
      return { data: this.usersService.isValidPhoneNumber(phone) };
    } catch (e) {
      console.log(e);
      throw new HttpException('Username Taken', HttpStatus.CONFLICT);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
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
  async update(@Headers() headers: any, @Body() updateUserDto: UpdateUserDto) {
    const userId = this.extractUserId(headers);
    try {
      return {
        data: await this.usersService.updateUser(userId, updateUserDto),
      };
    } catch (e) {
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
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
  remove(@Headers() headers: any, @Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    try {
      const userId = this.extractUserId(headers);
      if (userId.equals(new Types.ObjectId(id)))
        return this.usersService.softDelete(userId);
      else return new HttpException('Invalid Request', HttpStatus.BAD_REQUEST);
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  public extractUserId(headers: any) {
    const authHeader: string = headers.authorization;
    const decodedJwtAccessToken = this.jwtService.decode(
      authHeader.replace(/^Bearer\s+/i, ''),
    );
    if (!Types.ObjectId.isValid(decodedJwtAccessToken.sub)) {
      throw new HttpException('Invalid User', HttpStatus.BAD_REQUEST);
    }
    const userId: Types.ObjectId = decodedJwtAccessToken.sub; //This attribute is retrieved in the JWT
    return userId;
  }
}
