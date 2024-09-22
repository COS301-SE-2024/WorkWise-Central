import { Types } from 'mongoose';
import { IsArray, IsDate, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VideoCall } from '../entities/video-call.entity';

export class CreateVideoCallDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsDate()
  scheduledTime: Date;

  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  @ApiProperty()
  participants: Types.ObjectId[];

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  companyId: Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  details: string;
}

export class VideoCallResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}

export class VideoCallForEmployeeResponseDto {
  data: { data: [VideoCall] };
}
