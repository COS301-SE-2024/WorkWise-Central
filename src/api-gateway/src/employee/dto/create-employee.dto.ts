import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserInfo } from '../entities/employee.entity';

export class CreateEmployeeDto {
  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  roleId?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  superiorId?: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  userId: Types.ObjectId;

  @ApiHideProperty()
  @IsMongoId()
  userInfo?: UserInfo;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  companyId: Types.ObjectId;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  hourlyRate?: number;
}

export class ExternalCreateEmployeeDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  currentEmployeeId: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  roleId?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  superiorId?: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  userId: Types.ObjectId;

  @ApiHideProperty()
  @IsMongoId()
  userInfo?: UserInfo;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  companyId: Types.ObjectId;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  hourlyRate?: number;
}

export class CreateEmployeeResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
