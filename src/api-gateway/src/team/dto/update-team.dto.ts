import { Types } from 'mongoose';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTeamDto {
  @IsNotEmpty()
  @ApiProperty()
  teamName: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  addTeamMember: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  removeTeamMember: Types.ObjectId;
   
  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  teamLeaderId: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  addJob: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  removeJob: Types.ObjectId;
}

export class updateTeamResponseDto{
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
