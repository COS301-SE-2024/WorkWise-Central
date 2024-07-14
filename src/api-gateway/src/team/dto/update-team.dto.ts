import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTeamDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  teamName?: string;

  @IsArray()
  @IsMongoId({ each: true })
  @ApiProperty()
  @IsOptional()
  teamMembers?: Types.ObjectId[];

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  teamLeaderId?: Types.ObjectId;

  @IsArray()
  @IsMongoId({ each: true })
  @ApiProperty()
  @IsOptional()
  currentJobAssignments?: Types.ObjectId[];
}

export class updateTeamResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
