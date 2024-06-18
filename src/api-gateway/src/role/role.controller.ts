import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IsObjectId } from 'class-validator-mongo-object-id';

@Controller('role')
export class RoleController {
  constructor(private readonly RoleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.RoleService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.RoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.RoleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.RoleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.RoleService.remove(id);
  }
}
