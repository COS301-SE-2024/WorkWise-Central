import { Types } from 'mongoose';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @IsArray()
  @IsOptional()
  @ApiProperty()
  @IsString({ each: true })
  permissionSuite?: string[];

  @IsOptional()
  @ApiProperty()
  @IsString()
  roleName?: string;
}

export class updateRoleResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
