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
import { CreateVideoCallDto, VideoCallResponseDto, VideoCallForEmployeeResponseDto } from './dto/create-video-call.dto';
import { UpdateVideoCallDto } from './dto/update-video-call.dto';
const className = 'Video Calls';

@ApiTags('VideoCalls')
@Controller('videoCalls')
export class VideoCallController {
  constructor(private readonly videoCallService: VideoCallService) {}

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
    type: VideoCallResponseDto,
  })
  @Post('create')
  @UseGuards(AuthGuard)
  async create(@Body() createVideoCallDto: CreateVideoCallDto) {
    console.log('createVideoCallDto', createVideoCallDto);
    try {
      return this.videoCallService.create(createVideoCallDto);
    } catch (e) {
      console.log('Error', e);
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
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
    type: VideoCallResponseDto,
    description: `The updated ${className} object`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className} to be updated.`,
  })
  @ApiBody({ type: UpdateVideoCallDto })
  @Patch(':id')
  async update(
    @Headers() headers: any,
    @Param('id') id: Types.ObjectId,
    @Body() updateVideoCallDto: UpdateVideoCallDto,
  ) {
    let data;
    try {
      data = await this.videoCallService.update(id, updateVideoCallDto);
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
    name: 'videoCallId',
    description: `The _id attribute of the ${className} to be deleted.`,
    type: String,
  })
  @Delete(':videoCallId')
  async remove(@Headers() headers: any, @Param('videoCallId') videoCallId: Types.ObjectId) {
    return this.videoCallService.remove(videoCallId);
  }
}
