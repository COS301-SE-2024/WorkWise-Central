import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  Headers,
  Query,
} from '@nestjs/common';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { InvoiceListResponseDto, InvoiceResponseDto } from './entities/invoice.entity';
import { Types } from 'mongoose';
import { BooleanResponseDto } from '../shared/dtos/api-response.dto';
import { CreateInvoiceDto, CreateInvoiceOuterDto, CreateInvoiceResponseDto } from './dto/create-invoice.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from '../employee/employee.service';
import { InvoiceService } from './invoice.service';

const className = 'Invoice';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly jwtService: JwtService,
    private readonly employeeService: EmployeeService,
  ) {}

  //********Endpoints for test purposes - Start**********/
  @ApiOperation({
    summary: `Refer to Documentation`,
  })
  @Get('/all')
  async findAll() {
    const data = await await this.invoiceService.findAll();
    return { data: data };
  }

  @Get()
  hello() {
    return { message: 'Refer to /documentation for details on the API' };
  }
  //********Endpoints for test purposes - End**********/

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiOperation({
    summary: `Create a new ${className}`,
    description:
      'Call to create a new Invoice item. The name and companyId are required. It returns the access token and the InvoiceId.',
  })
  @ApiBody({ type: CreateInvoiceDto })
  @ApiResponse({
    status: 201,
    type: CreateInvoiceResponseDto,
  })
  @Post('/create')
  async create(
    @Headers() headers: any,
    @Body()
    body: CreateInvoiceOuterDto,
  ) {
    // const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
    // if (currentEmployee.role.permissionSuite.includes('add new Invoice item')) {
    let data;
    try {
      data = await this.invoiceService.create(body.createInvoiceDto);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    return { data: data };
    // } else {
    //   throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
    // }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiOperation({
    summary: `Get all ${className} instances for a given Company`,
    description: `Returns all ${className} instances in the database for a given Company.`,
  })
  @ApiOkResponse({
    type: InvoiceListResponseDto,
    description: `An array of mongodb objects of the ${className} class for a given Company.`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the Company for which to get all ${className} instances.`,
  })
  @Get('/generate')
  async generate(
    @Headers() headers: any,
    @Param('currentEmployeeId') currentEmployeeId: Types.ObjectId,
    @Param('jobId') jobId: Types.ObjectId,
  ) {
    if (!currentEmployeeId) {
      throw new HttpException('currentEmployeeId is required', HttpStatus.BAD_REQUEST);
    }

    // const currentEmployee = await this.employeeService.findById(currentEmployeeId);
    // if (currentEmployee.role.permissionSuite.includes('view all Invoice')) {
    let data;
    try {
      data = await this.invoiceService.generate(jobId);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    return { data: data };
    // } else {
    //   throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
    // }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiOperation({
    summary: `Get all ${className} instances for a given Company`,
    description: `Returns all ${className} instances in the database for a given Company.`,
  })
  @ApiOkResponse({
    type: InvoiceListResponseDto,
    description: `An array of mongodb objects of the ${className} class for a given Company.`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the Company for which to get all ${className} instances.`,
  })
  @Get('/all/:currentEmployeeId')
  async findAllInCompany(@Headers() headers: any, @Param('currentEmployeeId') currentEmployeeId: Types.ObjectId) {
    if (!currentEmployeeId) {
      throw new HttpException('currentEmployeeId is required', HttpStatus.BAD_REQUEST);
    }

    const currentEmployee = await this.employeeService.findById(currentEmployeeId);
    // if (currentEmployee.role.permissionSuite.includes('view all Invoice')) {
    let data;
    try {
      data = await this.invoiceService.findAllInCompany(currentEmployee.companyId);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    return { data: data };
    // } else {
    //   throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
    // }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiOperation({
    summary: `Get all ${className} instances for a given Company`,
    description: `Returns all ${className} instances in the database for a given Company.`,
  })
  @ApiOkResponse({
    type: InvoiceListResponseDto,
    description: `An array of mongodb objects of the ${className} class for a given Company.`,
  })
  @ApiParam({
    name: 'clientId',
    description: `The _id attribute of the Client for which to get all ${className} instances.`,
  })
  @ApiQuery({
    name: 'currentEmployeeId',
    description: '_id of the employee making the request',
    type: String,
  })
  @Get('/all/forClient/:clientId')
  async findAllForClient(
    @Headers() headers: any,
    @Param('clientId') clientId: Types.ObjectId,
    @Query('currentEmployeeId') currentEmployeeId: Types.ObjectId,
  ) {
    if (!currentEmployeeId) {
      throw new HttpException('currentEmployeeId is required', HttpStatus.BAD_REQUEST);
    }

    // const currentEmployee = await this.employeeService.findById(currentEmployeeId);
    // if (currentEmployee.role.permissionSuite.includes('view all Invoice')) {
    let data;
    try {
      data = await this.invoiceService.findAllForClient(clientId);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    return { data: data };
    // } else {
    //   throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
    // }
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
    type: InvoiceResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className} to be retrieved.`,
  })
  @Get('id/:id')
  async findById(
    @Headers() headers: any,
    @Param('id') id: Types.ObjectId,
    @Query('currentEmployeeId') currentEmployeeId: Types.ObjectId,
  ) {
    if (!currentEmployeeId) {
      throw new HttpException('currentEmployeeId is required', HttpStatus.BAD_REQUEST);
    }
    // const currentEmployee = await this.employeeService.findById(currentEmployeeId);
    // if (currentEmployee.role.permissionSuite.includes('view all Invoice')) {
    const data = await this.invoiceService.findById(id);
    return { data: data };
    // } else {
    //   throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
    // }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiOperation({
    summary: `Update an ${className} instances`,
    description: `Send the ${className} ObjectId, and the updated object, and then they get updated if the id is valid.`,
  })
  @ApiOkResponse({
    type: InvoiceResponseDto,
    description: `The updated ${className} object`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className} to be updated.`,
  })
  @ApiBody({ type: UpdateInvoiceDto })
  @Patch(':id')
  async update(
    @Headers() headers: any,
    @Param('id') id: Types.ObjectId,
    @Body()
    body: {
      currentEmployeeId: Types.ObjectId;
      updateInvoiceDto: UpdateInvoiceDto;
    },
  ) {
    // const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
    // if (currentEmployee.role.permissionSuite.includes('edit all Invoice')) {
    let data;
    try {
      data = await this.invoiceService.update(id, body.updateInvoiceDto);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    return { data: data };
    // } else {
    //   throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
    // }
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
    name: 'id',
    description: `The _id attribute of the ${className}`,
  })
  @Delete(':id')
  async remove(
    @Headers() headers: any,
    @Param('id') id: Types.ObjectId,
    // @Body() body: { currentEmployeeId: Types.ObjectId },
  ) {
    // const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
    // if (currentEmployee.role.permissionSuite.includes('delete Invoice item')) {
    let data;
    try {
      data = await this.invoiceService.remove(id);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }

    if (data === false) {
      throw new HttpException('update unsuccessful', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return { data: data };
    // } else {
    //   throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
    // }
  }
}
