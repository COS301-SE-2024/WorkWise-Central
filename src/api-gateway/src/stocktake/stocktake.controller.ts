import { Body, Controller, Get, HttpException, HttpStatus, Post, Headers, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { EmployeeService } from '../employee/employee.service';
import { StockTakeService } from './stocktake.service';
import { AuthGuard } from '../auth/auth.guard';
import { OuterCreateStocktakeDto } from './dto/create-stocktake.dto';
import { extractUserId } from '../utils/Utils';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Types } from 'mongoose';

const className = 'StockTake';

@ApiTags('StockTake')
@Controller('stocktake')
export class StockTakeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly stockTakeService: StockTakeService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateRequestWithEmployeeId(userId: Types.ObjectId, currentEmployeeId: Types.ObjectId) {
    const user = await this.userService.getUserById(userId);
    if (!user.joinedCompanies.find((joined) => joined.employeeId.toString() === currentEmployeeId.toString())) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async validateRequestWithCompanyId(userId: Types.ObjectId, companyId: Types.ObjectId) {
    const user = await this.userService.getUserById(userId);
    if (!user.joinedCompanies.find((joined) => joined.companyId.toString() === companyId.toString())) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @ApiOperation({
    summary: `Used for testing. DO NOT USE IN PRODUCTION`,
  })
  @Get()
  hello() {
    return { message: 'Refer to /documentation for details on the API' };
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
    summary: `Add a new stock take`,
    description: `Send the details of the stock take.`,
  })
  @ApiOkResponse({
    type: OuterCreateStocktakeDto,
    description: `The updated ${className} object`,
  })
  @Post('/create')
  async create(@Headers() headers: any, @Body() body: OuterCreateStocktakeDto) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithEmployeeId(userId, body.currentEmployeeId);
    const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('record stock take')) {
      let data;
      try {
        if (body.currentEmployeeId && currentEmployee.role.permissionSuite.includes('edit inventory')) {
          data = await this.stockTakeService.create(body);
        } else {
          throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
      } catch (e) {
        console.log(e);
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
