import { Types } from 'mongoose';
import { IsArray, IsDateString, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoCallDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsDateString()
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

export class VideoCallApiObject {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  _id: Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsDateString()
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

export class VideoCallData {
  data: VideoCallApiObject;
}

export class VideoCallResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}

export class VideoCallForEmployeeResponseDto {
  data: VideoCallData;
}
