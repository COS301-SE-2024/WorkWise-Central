import { Body, Controller, Get, HttpException, HttpStatus, Post, Headers } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BulkCreateStocktakeDto } from './dto/bulk-create-stocktake.dto';
import { EmployeeService } from '../employee/employee.service';

// const className = 'StockTake';

@ApiTags('StockTake')
@Controller('stocktake')
export class StockTakeController {
  constructor(private readonly employeeService: EmployeeService,) {}

  @ApiOperation({
    summary: `Refer to Documentation`,
  })
  @Get()
  hello() {
    return { message: 'Refer to /documentation for details on the API' };
  }

  @Post('/create')
  async create(
    @Headers() headers: any,
    @Body()
    body: BulkCreateStocktakeDto,
  ) {
    const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
    console.log('current employee: ', currentEmployee);
    if (currentEmployee.role.permissionSuite.includes('add new employees')) {
      let data;
      try {
        data = await this.employeeService.create(body.createEmployeeDto);
      } catch (e) {
        console.log('error:', e);
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
