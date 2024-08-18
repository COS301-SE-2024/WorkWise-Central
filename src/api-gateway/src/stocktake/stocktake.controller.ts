import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// const className = 'StockTake';

@ApiTags('StockTake')
@Controller('stocktake')
export class StockTakeController {
  constructor() {}

  @ApiOperation({
    summary: `Refer to Documentation`,
  })
  @Get()
  hello() {
    return { message: 'Refer to /documentation for details on the API' };
  }
}
