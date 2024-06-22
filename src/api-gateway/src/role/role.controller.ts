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
  constructor(private readonly RoleService: RoleService) { }
  
  @Get()
  hello() {
    return { message: 'Refer to /documentation for details on the API' };
  }

  @Post('/create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.RoleService.create(createRoleDto);
  }

  @Get('/all')
  async findAll() {
    return await this.RoleService.findAll();
  }

  @Get('/all/:id')
  async findAllInCompany(@Param('id') id: string) {
    return await this.RoleService.findAllInCompany(id);
  }

  @Get('id/:id')
  async findOne(@Param('id') id: string) {
    return await this.RoleService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return await this.RoleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.RoleService.remove(id);
  }
}
