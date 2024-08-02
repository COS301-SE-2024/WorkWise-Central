import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  CancelRequestDto,
  UserInviteRequestDto,
  UserJoinRequestDto,
} from '../users/dto/request-to-join.dto';
import { Types } from 'mongoose';
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
import { extractUserId, validateObjectId } from '../utils/Utils';
import { JwtService } from '@nestjs/jwt';
import {
  AllJoinDetailedRequestsDto,
  AllJoinRequestsDto,
} from './dto/request.dto';
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

    if (!Types.ObjectId.isValid(id)) {
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
      throw Error;
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
  @Patch('/request/cancel')
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
      throw Error;
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
  @Patch('/request/decide')
  async acceptRequest(
    @Headers() headers: any,
    @Body() acceptRequestDto: AcceptRequestDto,
  ) {
    try {
      const userId = extractUserId(this.jwtService, headers);

      return {
        data: await this.adminService.processRequest(userId, acceptRequestDto),
      };
    } catch (Error) {
      throw Error;
      //throw new HttpException(Error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.CONFLICT,
  })
  @ApiOperation({
    summary: `Create an invite to join a company`,
    description:
      'This is a request created by someone with a WorkWise Account.' +
      'If the user has an account, they get a notification (email + push) and can see it in frontend.' +
      'Otherwise, they just get an email inviting them to join',
  })
  @ApiBody({ type: UserInviteRequestDto })
  @ApiResponse({
    status: 201,
    type: BooleanResponseDto,
    description: `Confirmation that the request was successfully created`,
  })
  @Post('/invite/create')
  async createInvite(
    @Headers() headers: any,
    @Body() inviteRequestDto: UserInviteRequestDto,
  ) {
    try {
      const userId = extractUserId(this.jwtService, headers);
      return {
        data: await this.adminService.createInvite(userId, inviteRequestDto),
      };
    } catch (Error) {
      throw Error;
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
  @Patch('/request/cancel')
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
      throw Error;
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
      validateObjectId(companyId);
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
    summary: `Get all User Requests for a Company`,
  })
  @ApiOkResponse({
    type: AllJoinDetailedRequestsDto,
    description: `An array of mongodb objects in the Request Collection, with detailed User, and Role information`,
  })
  @Get('/request/all/company/:cid/detailed')
  async findAllDetailedInCompany(
    @Headers() headers: any,
    @Param('cid') companyId: Types.ObjectId,
  ) {
    try {
      validateObjectId(companyId);
      const userId = extractUserId(this.jwtService, headers);
      return {
        data: await this.adminService.getAllDetailedRequestsInCompany(
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
  ///
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: `Get all User Requests for a specific User`,
  })
  @ApiOkResponse({
    type: AllJoinRequestsDto,
    description: `An array of mongodb objects in the Request Collection`,
  })
  @Get('/request/all/user/')
  async findAllForUser(@Headers() headers: any) {
    try {
      const userId = extractUserId(this.jwtService, headers);
      validateObjectId(userId);
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
