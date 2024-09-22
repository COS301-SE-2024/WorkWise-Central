import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Headers,
  Patch,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { VideoCallService } from './video-call.service';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { BooleanResponseDto } from '../shared/dtos/api-response.dto';
import { extractUserId } from '../utils/Utils';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from '../employee/employee.service';
import { UsersService } from '../users/users.service';
import {
  CreateVideoCallDto,
  createVideoCallResponseDto,
  VideoCallForEmployeeResponseDto,
} from './dto/create-video-call.dto';
import { UpdateInvoiceDto } from 'src/invoices/dto/update-invoice.dto';
import { InvoiceResponseDto } from 'src/invoices/entities/invoice.entity';
const className = 'Video Calls';

@ApiTags('Video Calls')
@Controller('video-calls')
export class VideoCallController {
  constructor(
    private readonly videoCallService: VideoCallService,
    private readonly jwtService: JwtService,
    private readonly employeeService: EmployeeService,
    private readonly userService: UsersService,
  ) {}

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
    summary: `Find all the ${className} for a given employee`,
    description: `Returns an array of ${className} instance for the given employee`,
  })
  @ApiOkResponse({
    type: VideoCallForEmployeeResponseDto,
    description: `Array of mongodb objects of type ${className}, with an _id attribute`,
  })
  @ApiParam({
    name: 'employeeId',
    description: `The _id attribute of the employee for whom to retrieve video call instances.`,
    type: String,
  })
  @Get('forEmployee/:employeeId')
  async findById(@Headers() headers: any, @Param('employeeId') employeeId: Types.ObjectId) {
    const data = await this.videoCallService.findAllForEmployee(employeeId);
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
    summary: `Create a new ${className}`,
    description: `Call to create a new ${className} . The teamName, teamMembers array and companyId are required. The teamLeaderIdd is optional. It returns the access token and the teamId.`,
  })
  @ApiBody({ type: CreateVideoCallDto })
  @ApiResponse({
    status: 201,
    type: createVideoCallResponseDto,
  })
  @Post('create')
  @UseGuards(AuthGuard)
  async create(@Body() createVideoCallDto: CreateVideoCallDto) {
    return this.videoCallService.create(createVideoCallDto);
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
    let data;
    try {
      data = await this.invoiceService.update(id, body.updateInvoiceDto);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
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
    summary: `Delete an ${className}`,
    description: `Send the ${className} ObjectId, and then they get deleted if the id is valid.\n `,
    security: [],
  })
  @ApiOkResponse({
    type: BooleanResponseDto,
    description: `A boolean value indicating whether or not the deletion was a success`,
  })
  @ApiParam({
    name: 'meetingId',
    description: `The _id attribute of the ${className} to be deleted.`,
    type: String,
  })
  @Delete(':meetingId')
  async remove(@Headers() headers: any, @Param('meetingId') meetingId: Types.ObjectId) {
    const userId = extractUserId(headers.authorization);
    const employee = await this.employeeService.getEmployeeByUserId(userId);
    const meeting = await this.videoCallService.getMeetingById(meetingId);
    if (!meeting) {
      throw new HttpException(`Meeting not found`, HttpStatus.NOT_FOUND);
    }
    if (employee._id.toString() !== meeting.employeeId.toString()) {
      throw new HttpException(`You are not authorized to delete this meeting`, HttpStatus.FORBIDDEN);
    }
    return this.videoCallService.remove(meetingId);
  }
}
