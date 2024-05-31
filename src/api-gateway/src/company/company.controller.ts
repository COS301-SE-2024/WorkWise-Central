import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBody, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.CONFLICT,
  })
  @ApiBody({ type: [CreateCompanyDto] })
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @UseGuards(AuthGuard) //Need to add authorization
  @Get()
  findAll() {
    try {
      return this.companyService.findAll();
    } catch (Error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.companyService.findOne(id);
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBody({ type: [UpdateCompanyDto] })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    try {
      return this.companyService.update(+id, updateCompanyDto);
    } catch (e) {
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.companyService.remove(+id);
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
