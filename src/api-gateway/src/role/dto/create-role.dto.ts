import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
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

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  hourlyRate?: number;
}

export class ExternalCreateRoleDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsMongoId()
  currentEmployeeId: Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  createRoleDto: CreateRoleDto;
}

export class createRoleResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
