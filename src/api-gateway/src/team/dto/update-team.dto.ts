import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTeamDto {
  @IsNotEmpty()
  @ApiProperty()
  teamName: string;

  @IsArray()
  @IsMongoId({ each: true })
  @ApiProperty()
  teamMembers: Types.ObjectId[];

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  teamLeaderId: Types.ObjectId;

  @IsArray()
  @IsMongoId({ each: true })
  @ApiProperty()
  currentJobAssignments: Types.ObjectId[];
}

export class updateTeamResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
