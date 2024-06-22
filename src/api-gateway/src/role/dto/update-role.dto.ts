import { Types } from 'mongoose';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  permissionSuite: string[];
   
  @IsNotEmpty()
  @ApiProperty()
  roleName: string;
}

export class updateRoleResponseDto{
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
