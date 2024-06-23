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

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  hello() {
    return { message: 'Refer to /documentation for details on the API' };
  }

  @Post('/create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get('/all')
  async findAll() {
    return await this.roleService.findAll();
  }

  @Get('/all/:id')
  async findAllInCompany(@Param('id') id: string) {
    return await this.roleService.findAllInCompany(id);
  }

  @Get('id/:id')
  async findOne(@Param('id') id: string) {
    return await this.roleService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
