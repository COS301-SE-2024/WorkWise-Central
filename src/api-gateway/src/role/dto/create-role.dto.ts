import { Types } from 'mongoose';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @IsArray()
  @IsMongoId({ each: true })
  @IsNotEmpty()
  @ApiProperty()
  permissionSuite: Types.ObjectId;
   
  @IsNotEmpty()
  @ApiProperty()
  roleName: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  companyId: Types.ObjectId;

}

export class createRoleResponseDto{
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
