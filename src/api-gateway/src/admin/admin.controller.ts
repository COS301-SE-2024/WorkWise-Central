import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  CancelRequestDto,
  UserJoinRequestDto,
} from '../users/dto/request-to-join.dto';
import mongoose, { Types } from 'mongoose';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BooleanResponseDto } from '../shared/dtos/api-response.dto';
import { AuthGuard } from '../auth/auth.guard';
import { extractUserId } from '../utils/Utils';
import { JwtService } from '@nestjs/jwt';
import { AllJoinRequestsDto } from './dto/request.dto';
import { AcceptRequestDto } from '../client/dto/accept-request.dto';

//const className = 'Administration';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}
  validateObjectId(id: string | Types.ObjectId, entity: string = ''): boolean {
    let data: string;
    if (entity === '') data = `Invalid ID`;
    else data = `Invalid ${entity} ID`;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException(data, HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  @ApiOperation({ summary: 'Refer to the Documentation' })
  @Get()
  lookAtDocumentation() {
    return { message: 'Refer to /documentation for details on the API' };
  }

  /// User-side
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.CONFLICT,
  })
  @ApiOperation({
    summary: `Create a Request to Join a company`,
    description: 'This is a request created by someone with a WorkWise Account',
  })
  @ApiBody({ type: UserJoinRequestDto })
  @ApiResponse({
    status: 201,
    type: BooleanResponseDto,
    description: `Confirmation that the request was successfully created`,
  })
  @Post('/request/create')
  async createRequest(
    @Headers() headers: any,
    @Body() requestToJoin: UserJoinRequestDto,
  ) {
    try {
      const userId = extractUserId(this.jwtService, headers);

      return {
        data: await this.adminService.createRequest(userId, requestToJoin),
      };
    } catch (Error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Create a Request to Join a company`,
    description: 'This is a request created by someone with a WorkWise Account',
  })
  @ApiBody({ type: CancelRequestDto })
  @ApiResponse({
    status: 201,
    type: BooleanResponseDto,
    description: `Confirmation that the request was successfully deleted`,
  })
  @Post('/request/cancel')
  async deleteRequest(
    @Headers() headers: any,
    @Body() cancelRequestDto: CancelRequestDto,
  ) {
    try {
      const userId = extractUserId(this.jwtService, headers);
      // if (!userId) throw new BadRequestException('Invalid JWT');
      return {
        data: await this.adminService.cancelRequest(userId, cancelRequestDto),
      };
    } catch (Error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  ///

  ///Company-side
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Accept a Request to Join a company`,
    description:
      'This is for an admin person to accept requests to join a company',
  })
  @ApiBody({ type: AcceptRequestDto })
  @ApiResponse({
    status: 201,
    type: BooleanResponseDto,
    description: `Confirmation that the request was successfully created`,
  })
  @Post('/request/accept')
  async acceptRequest(
    @Headers() headers: any,
    @Body() acceptRequestDto: AcceptRequestDto,
  ) {
    try {
      const userId = extractUserId(this.jwtService, headers);

      return {
        data: await this.adminService.acceptRequest(userId, acceptRequestDto),
      };
    } catch (Error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  ///

  //@UseGuards(AuthGuard)
  //@ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `*DO NOT USE* Get all User Requests`,
  })
  @ApiOkResponse({
    type: AllJoinRequestsDto,
    description: `An array of mongodb objects in the Request Collection`,
  })
  @Get('/request/all')
  async findAll(@Headers() headers: any) {
    try {
      console.log(headers);
      return { data: await this.adminService.getAllRequests() };
    } catch (Error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Get all User Requests for a Company`,
  })
  @ApiOkResponse({
    type: AllJoinRequestsDto,
    description: `An array of mongodb objects in the Request Collection`,
  })
  @Get('/request/all/company/:cid')
  async findAllInCompany(
    @Headers() headers: any,
    @Param('cid') companyId: Types.ObjectId,
  ) {
    try {
      this.validateObjectId(companyId);
      const userId = extractUserId(this.jwtService, headers);
      return {
        data: await this.adminService.getAllRequestsInCompany(
          userId,
          companyId,
        ),
      };
    } catch (Error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Get all User Requests From a specific User`,
  })
  @ApiOkResponse({
    type: AllJoinRequestsDto,
    description: `An array of mongodb objects in the Request Collection`,
  })
  @Get('/request/all/user/:cid')
  async findAllForUser(@Headers() headers: any) {
    try {
      const userId = extractUserId(this.jwtService, headers);
      this.validateObjectId(userId);
      return {
        data: await this.adminService.getAllRequestsForUser(userId),
      };
    } catch (Error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
