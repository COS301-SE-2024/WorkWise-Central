import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  companyId: Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  teamName: string;

  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  @ApiProperty()
  teamMembers: Types.ObjectId[];

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  teamLeaderId: Types.ObjectId;
}

export class createTeamResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
