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
} from '@nestjs/common';
import { CreateTeamDto, createTeamResponseDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamService } from './team.service';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { teamListResponseDto, teamResponseDto } from './entities/team.entity';
import { BooleanResponseDto } from '../shared/dtos/api-response.dto';

const className = 'Team';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiOperation({
    summary: `Refer to Documentation`,
  })
  @Get()
  hello() {
    return { message: 'Refer to /documentation for details on the API' };
  }

  @ApiOperation({
    summary: `Get all ${className} instances`,
    description: `Returns all ${className} instances in the database.`,
  })
  @ApiOkResponse({
    type: teamListResponseDto,
    description: `An array of mongodb objects of the ${className} class.`,
  })
  @Get('/all')
  async findAll() {
    return { data: await this.teamService.findAll() };
  }

  @ApiOperation({
    summary: `Find an ${className}`,
    description: `Returns the ${className} instance with the given id.`,
  })
  @ApiOkResponse({
    type: teamResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className} to be retrieved.`,
  })
  @Get('id/:id')
  async findById(@Param('id') id: Types.ObjectId) {
    return { data: await this.teamService.findById(id) };
  }

  // @Get('name/:name/company/:company')
  // findByNameInCompany(
  //   @Param('name') name: string,
  //   @Param('company') company: Types.ObjectId,
  // ) {
  //   return this.teamService.findByNameInCompany(name, company);
  // }

  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
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
  async create(@Body() createTeamDto: CreateTeamDto) {
    console.log('In endpoint\ncreateTeamDto: ', createTeamDto);
    return { data: await this.teamService.create(createTeamDto) };
  }

  @ApiOperation({
    summary: `Update an ${className} instances`,
    description: `Send the ${className} ObjectId, and the updated object, and then they get updated if the id is valid.`,
  })
  @ApiOkResponse({
    type: teamResponseDto,
    description: `The updated ${className} object`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className} to be updated.`,
  })
  @ApiBody({ type: UpdateTeamDto })
  @Patch(':id')
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    console.log('In the update controller');
    return { data: await this.teamService.update(id, updateTeamDto) };
  }

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
  async remove(@Param('id') id: Types.ObjectId) {
    console.log('In the delete controller');
    return { data: await this.teamService.remove(id) };
  }
}
