import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  companyId: Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  teamName: string;

  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  @ApiProperty()
  teamMembers: Types.ObjectId[];

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  teamLeaderId?: Types.ObjectId;
}

export class createTeamResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
