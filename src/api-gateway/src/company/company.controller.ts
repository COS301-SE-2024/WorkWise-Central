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
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import {
  CreateCompanyDto,
  CreateCompanyResponseDto,
  findCompanyResponseDto,
} from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddUserToCompanyDto } from './dto/add-user-to-company.dto';
import mongoose, { FlattenMaps, Types } from 'mongoose';
import { Company } from './entities/company.entity';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  validateObjectId(id: string | Types.ObjectId): boolean {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  // @UseGuards(AuthGuard) //Need to add authorization
  @Get()
  hello() {
    return { message: 'Refer to /documentation for details on the API' };
  }

  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.CONFLICT,
  })
  @ApiBody({ type: [CreateCompanyDto] })
  @Post('/create')
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<{ data: CreateCompanyResponseDto }> {
    return { data: await this.companyService.create(createCompanyDto) };
  }

  @ApiBody({ type: AddUserToCompanyDto })
  @Post('/add')
  async addEmployee(@Body() addUserDto: AddUserToCompanyDto) {
    this.validateObjectId(addUserDto.adminId);
    this.validateObjectId(addUserDto.currentCompany);

    try {
      return { data: await this.companyService.addEmployee(addUserDto) };
    } catch (Error) {
      throw new HttpException(Error, HttpStatus.CONFLICT);
    }
  }

  // @UseGuards(AuthGuard) //Need to add authorization
  @Get('/all')
  async findAll() {
    try {
      return { data: await this.companyService.findAllCompanies() };
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
      return { data: this.companyService.getCompanyById(id) };
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  @ApiResponse({
    type: findCompanyResponseDto,
  })
  @Get('search?')
  async findByEmailOrName(
    @Query('str') str: string,
  ): Promise<{ data: (FlattenMaps<Company> & { _id: Types.ObjectId })[] }> {
    try {
      return {
        data: await this.companyService.getByEmailOrName(str),
      };
    } catch (e) {
      console.log(e);
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  // @UseGuards(AuthGuard)
  @ApiBody({ type: [UpdateCompanyDto] })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    try {
      const objectId = new Types.ObjectId(id);
      const updatedCompany = this.companyService.update(
        objectId,
        updateCompanyDto,
      );
      return {
        data: updatedCompany,
      };
    } catch (e) {
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.companyService.deleteCompany(id);
      return { data: true };
    } catch (e) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
