import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamService } from './team.service';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  hello() {
    return { message: 'Refer to /documentation for details on the API' };
  }

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get('/all')
  findAll() {
    return this.teamService.findAll();
  }

  @Get('id/:id')
  findById(@Param('id') id: Types.ObjectId) {
    return this.teamService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamService.update(id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.teamService.remove(id);
  }
}
