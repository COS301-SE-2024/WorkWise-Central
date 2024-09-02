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
import { CreateTeamDto, createTeamResponseDto } from './dto/create-team.dto';
import { AddTeamMembersDto, RemoveTeamMembersDto, UpdateTeamDto } from './dto/update-team.dto';
import { TeamService } from './team.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { teamResponseDto } from './entities/team.entity';
import { BooleanResponseDto } from '../shared/dtos/api-response.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { extractUserId } from '../utils/Utils';

const className = 'Team';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateRequestWithEmployeeId(userId: Types.ObjectId, currentEmployeeId: Types.ObjectId) {
    const user = await this.userService.getUserById(userId);
    if (!user.joinedCompanies.find((joined) => joined.employeeId.toString() === currentEmployeeId.toString())) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async validateRequestWithCompanyId(userId: Types.ObjectId, currentEmployeeId: Types.ObjectId) {
    const user = await this.userService.getUserById(userId);
    if (!user.joinedCompanies.find((joined) => joined.employeeId.toString() === currentEmployeeId.toString())) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

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
    const data = await this.teamService.findAll();
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
    summary: `Find an ${className}`,
    description: `Returns the ${className} instance with the given id.`,
  })
  @ApiOkResponse({
    type: teamResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiParam({
    name: 'teamId',
    description: `The _id attribute of the ${className} to be retrieved.`,
    type: String,
  })
  @Get('id/:teamId')
  async findById(@Headers() headers: any, @Param('teamId') teamId: Types.ObjectId) {
    const data = await this.teamService.findById(teamId);
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithCompanyId(userId, data.companyId);
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
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Find an ${className}`,
    description: `Returns the ${className} instance with the given id and Company id.`,
  })
  @ApiOkResponse({
    type: teamResponseDto,
    description: `Array of mongodb ${className} objects, in a particular Company, with an _id attribute`,
  })
  @ApiParam({
    name: 'companyId',
    description: `The _id of the Company fo which the teams must be returned.`,
    type: String,
  })
  @Get('all/:companyId')
  async findAllInCompany(@Headers() headers: any, @Param('companyId') companyId: Types.ObjectId) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithCompanyId(userId, companyId);

    const data = await this.teamService.findAllInCompany(companyId);
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
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Find an ${className}`,
    description: `Returns the ${className} instance with the given id and Company id.`,
  })
  @ApiOkResponse({
    type: teamResponseDto,
    description: `Array of detailed mongodb ${className} objects, in a particular Company, with an _id attribute`,
  })
  @ApiParam({
    name: 'companyId',
    description: `The _id of the Company fo which the teams must be returned.`,
    type: String,
  })
  @Get('detailed/all/:companyId')
  async detailedFindAllInCompany(@Headers() headers: any, @Param('companyId') companyId: Types.ObjectId) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithCompanyId(userId, companyId);

    const data = await this.teamService.detailedFindAllInCompany(companyId);
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
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Create a new ${className}`,
    description: `Call to create a new ${className} . The teamName, teamMembers array and companyId are required. The teamLeaderIdd is optional. It returns the access token and the teamId.`,
  })
  @ApiBody({ type: CreateTeamDto })
  @ApiResponse({
    status: 201,
    type: createTeamResponseDto,
  })
  @Post('/create')
  async create(@Headers() headers: any, @Body() createTeamDto: CreateTeamDto) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithCompanyId(userId, createTeamDto.companyId);
    let data;
    try {
      data = await this.teamService.create(createTeamDto);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
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
    type: teamResponseDto,
    description: `The updated ${className} object`,
  })
  @ApiParam({
    name: 'teamId',
    description: `The _id attribute of the ${className} to be updated.`,
    type: String,
  })
  @ApiBody({ type: UpdateTeamDto })
  @Patch(':teamId')
  async update(@Headers() headers: any, @Param('teamId') teamId: Types.ObjectId, @Body() updateTeamDto: UpdateTeamDto) {
    let data;
    try {
      data = await this.teamService.update(teamId, updateTeamDto);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }

    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithCompanyId(userId, data.companyId);

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
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Add team members to a ${className} instances`,
    description: `Send the id of the ${className} and an array of new team members to be added to that ${className}, and then the team members get added if they are valid`,
  })
  @ApiOkResponse({
    type: teamResponseDto,
    description: `The updated ${className} object`,
  })
  @ApiParam({
    name: 'teamId',
    description: `The _id attribute of the ${className} to be updated.`,
    type: String,
  })
  @ApiBody({ type: UpdateTeamDto })
  @Patch('add/:teamId')
  async addTeamMember(
    @Headers() headers: any,
    @Param('teamId') teamId: Types.ObjectId,
    @Body() addTeamMembersDto: AddTeamMembersDto,
  ) {
    const team = await this.teamService.findById(teamId);
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithCompanyId(userId, team.companyId);

    let data;
    try {
      data = await this.teamService.addTeamMembers(teamId, addTeamMembersDto);
    } catch (e) {
      console.log(e);
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
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
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Add team members to a ${className} instances`,
    description: `Send the id of the ${className} and an array of the team members to be removed from the ${className}, and then the team members get removed if they are part of the team`,
  })
  @ApiOkResponse({
    type: teamResponseDto,
    description: `The updated ${className} object`,
  })
  @ApiParam({
    name: 'teamId',
    description: `The _id attribute of the ${className} to be updated.`,
    type: String,
  })
  @ApiBody({ type: UpdateTeamDto })
  @Patch('remove/:teamId')
  async removeTeamMember(
    @Headers() headers: any,
    @Param('teamId') teamId: Types.ObjectId,
    @Body() removeTeamMembersDto: RemoveTeamMembersDto,
  ) {
    const team = await this.teamService.findById(teamId);
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithCompanyId(userId, team.companyId);
    let data;
    try {
      data = await this.teamService.removeTeamMembers(teamId, removeTeamMembersDto);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
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
    name: 'teamId',
    description: `The _id attribute of the ${className}`,
    type: String,
  })
  @Delete(':teamId')
  async remove(@Headers() headers: any, @Param('teamId') teamId: Types.ObjectId) {
    const team = await this.teamService.findById(teamId);
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithCompanyId(userId, team.companyId);

    let data;
    try {
      data = await this.teamService.remove(teamId);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    return { data: data };
  }
}
