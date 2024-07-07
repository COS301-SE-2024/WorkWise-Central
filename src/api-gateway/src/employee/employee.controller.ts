import {
  Controller,
  Get,
  // Post,
  Body,
  Patch,
  Param,
  Delete,
  // HttpException,
  // HttpStatus,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
// import {
//   CreateEmployeeDto,
//   CreateEmployeeResponseDto,
// } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {
  ApiBody,
  // ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  // ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  BooleanResponseDto,
  EmployeeListResponseDto,
  EmployeeResponseDto,
} from './entities/employee.entity';

const className = 'Employee';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // @ApiOperation({
  //   summary: `Refer to Documentation`,
  // })
  // @Get()
  // hello() {
  //   return { message: 'Refer to /documentation for details on the API' };
  // }

  // @ApiInternalServerErrorResponse({
  //   type: HttpException,
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  // })
  // @ApiOperation({
  //   summary: `Create a new ${className}`,
  //   description:
  //     'Call to create a new employee. The userId and companyId are required. The roleId and superiorId are optional. It returns the access token and the employee Id.',
  // })
  // @ApiBody({ type: CreateEmployeeDto })
  // @ApiResponse({
  //   status: 201,
  //   type: CreateEmployeeResponseDto,
  //   description: `The access token and ${className}'s Id used for querying.`,
  // })
  // @Post('/create')
  // async create(
  //   @Body() createEmployeeDto: CreateEmployeeDto,
  // ): Promise<{ data: CreateEmployeeDto }> {
  //   return { data: await this.employeeService.create(createEmployeeDto) };
  // }

  @ApiOperation({
    summary: `Get all ${className} instances`,
    description: `Returns all ${className} instances in the database.`,
  })
  @ApiOkResponse({
    type: EmployeeListResponseDto,
    description: `An array of mongodb objects of the ${className} class.`,
  })
  @Get('/all')
  findAll() {
    return this.employeeService.findAll();
  }

  @ApiOperation({
    summary: `Get all ${className} instances for a given company`,
    description: `Returns all ${className} instances in the database for a given Company.`,
  })
  @ApiOkResponse({
    type: EmployeeListResponseDto,
    description: `An array of mongodb objects of the ${className} class for a given Company.`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the Company for which to get all ${className} instances.`,
  })
  @Get('/all/:id')
  findAllInCompany(id: string) {
    return this.employeeService.findAllInCompany(id);
  }

  @ApiOperation({
    summary: `Find an ${className}`,
    description: `Returns the ${className} instance with the given id.`,
  })
  @ApiOkResponse({
    type: EmployeeResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className} to be retrieved.`,
  })
  @Get('id/:id')
  findBytId(id: string) {
    return this.employeeService.findById(id);
  }

  @ApiOperation({
    summary: `Update an ${className} instances`,
    description: `Send the ${className} ObjectId, and the updated object, and then they get updated if the id is valid.`,
  })
  @ApiOkResponse({
    type: EmployeeResponseDto,
    description: `The updated ${className} object`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className} to be updated.`,
  })
  @ApiBody({ type: UpdateEmployeeDto })
  @Patch(':id')
  update(id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(id, updateEmployeeDto);
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
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
}
