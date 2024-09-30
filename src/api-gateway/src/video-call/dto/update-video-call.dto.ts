import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVideoCallDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  endTime: string;

  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  @ApiProperty()
  participants: Types.ObjectId[];

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  details: string;
}

export class updateVideoCallResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
