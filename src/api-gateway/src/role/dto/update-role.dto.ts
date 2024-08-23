import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString } from 'class-validator';
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

export class ExternalUpdateRoleDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsMongoId()
  currentEmployeeId: Types.ObjectId;

  @IsNotEmptyObject()
  @ApiProperty()
  updateRoleDto: UpdateRoleDto;
}

export class updateRoleResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}

export class BulkUpdateRoleDto {
  @IsNotEmptyObject()
  @ApiProperty()
  updateRoleDto: UpdateRoleDto;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  roleId: Types.ObjectId;
}

export class ExternalBulkUpdateRoleDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsMongoId()
  currentEmployeeId: Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  bulkUpdateRoleDto: BulkUpdateRoleDto[];
}
