import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { IsObjectId } from 'class-validator-mongo-object-id';

@Controller('employee')
export class TeamController {
  constructor(private readonly TeamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.TeamService.create(createTeamDto);
  }

  @Get('/all')
  findAll() {
    return this.TeamService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.TeamService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return this.TeamService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.TeamService.remove(id);
  }
}
