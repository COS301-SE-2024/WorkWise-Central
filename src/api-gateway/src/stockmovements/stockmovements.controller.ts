import { Controller, Get, Param, HttpException, HttpStatus, UseGuards, Headers } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { StockMovementsListResponseDto } from './entities/stockmovements.entity';
import { Types } from 'mongoose';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from '../employee/employee.service';
import { validateObjectId } from '../utils/Utils';
import { StockMovementsService } from './stockmovements.service';

const className = 'StockMovements';

@ApiTags('StockMovements')
@Controller('StockMovements')
export class StockMovementsController {
  constructor(
    private readonly stockMovementsService: StockMovementsService,
    private readonly jwtService: JwtService,
    private readonly employeeService: EmployeeService,
  ) {}

  @ApiOperation({
    summary: `Refer to Documentation`,
  })

  //********Endpoints for test purposes - Start**********/
  @Get('/all')
  async findAll() {
    const data = await await this.stockMovementsService.findAll();
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
    type: StockMovementsListResponseDto,
    description: `An array of mongodb objects of the ${className} class for a given Company.`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the Company for which to get all ${className} instances.`,
  })
  @Get('/all/:currentEmployeeId')
  async findAllInCompany(@Headers() headers: any, @Param('currentEmployeeId') currentEmployeeId: Types.ObjectId) {
    console.log('In findAllInCompany');
    console.log('id', currentEmployeeId);

    if (!currentEmployeeId) {
      throw new HttpException('currentEmployeeId is required', HttpStatus.BAD_REQUEST);
    }
    validateObjectId(currentEmployeeId, 'currentEmployee');

    const currentEmployee = await this.employeeService.findById(currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('view movements')) {
      let data;
      try {
        data = await this.stockMovementsService.findAllInCompany(currentEmployee.companyId);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
    }
  }
}
