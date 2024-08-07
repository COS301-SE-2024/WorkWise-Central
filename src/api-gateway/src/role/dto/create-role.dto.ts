import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  @IsString({ each: true })
  permissionSuite: string[] = [
    'view all jobs assigned to me',
    'view all clients that are assigned to me',
    'record inventory use',
  ];

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  roleName: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  companyId: Types.ObjectId;
}

export class createRoleResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
