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
} from '@nestjs/common';
import { CreateTeamDto, createTeamResponseDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamService } from './team.service';
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
import { teamListResponseDto, teamResponseDto } from './entities/team.entity';
import { BooleanResponseDto } from '../shared/dtos/api-response.dto';
import { AuthGuard } from '../auth/auth.guard';

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

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
  })
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
    const data = await this.teamService.findAll();
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
    type: teamResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className} to be retrieved.`,
  })
  @Get('id/:id')
  async findById(@Param('id') id: Types.ObjectId) {
    const data = await this.teamService.findById(id);
    return { data: data };
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
  async update(@Param('id') id: Types.ObjectId, @Body() updateTeamDto: UpdateTeamDto) {
    let data;
    try {
      data = await this.teamService.update(id, updateTeamDto);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    return { data: data };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
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
    let data;
    try {
      data = await this.teamService.remove(id);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    return { data: data };
  }
}
