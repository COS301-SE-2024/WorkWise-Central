import { Controller, Get, Param, HttpException, HttpStatus, UseGuards, Headers } from '@nestjs/common';
import { StatsService } from './stats.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { extractUserId } from '../utils/Utils';
import { ClientResponseDto } from './dto/stats-response.dto';

const className = 'stats';

@ApiTags('Stats')
@Controller('stats')
export class StatsController {
  constructor(
    private readonly statsService: StatsService,
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

  //********Endpoints for test purposes - Start**********/
  @ApiOperation({
    summary: `Used for testing. DO NOT USE IN PRODUCTION`,
  })
  @Get()
  hello() {
    return { message: 'Refer to /documentation for details on the API' };
  }

  //********Endpoints for test purposes - End**********/

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
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Find an ${className}`,
    description: `Returns the ${className} instance with the given id.`,
  })
  @ApiOkResponse({
    type: ClientResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiParam({
    name: 'currentEmployeeId',
    description: `The _id attribute of the Employee making the request.`,
    type: String,
  })
  @Get('clientStats/:currentEmployeeId')
  async clientStats(@Headers() headers: any, @Param('currentEmployeeId') currentEmployeeId: Types.ObjectId) {
    const data = await this.statsService.findById(currentEmployeeId);
    // const userId = await extractUserId(this.jwtService, headers);
    // await this.validateRequestWithCompanyId(userId, data.companyId);
    return { data: data };
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
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Find an ${className}`,
    description: `Returns the ${className} instance with the given id and Company id.`,
  })
  @ApiOkResponse({
    // type: statsResponseDto,
    description: `Array of mongodb ${className} objects, in a particular Company, with an _id attribute`,
  })
  @ApiParam({
    name: 'companyId',
    description: `The _id of the Company fo which the statss must be returned.`,
    type: String,
  })
  @Get('all/:companyId')
  async findAllInCompany(@Headers() headers: any, @Param('companyId') companyId: Types.ObjectId) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithCompanyId(userId, companyId);

    const data = await this.statsService.findAllInCompany(companyId);
    return { data: data };
  }
}
