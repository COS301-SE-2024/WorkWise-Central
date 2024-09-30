import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { roleObject, UserInfo } from '../entities/employee.entity';

export class UpdateEmployeeUserInfoDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  surname?: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsString()
  @IsOptional()
  displayImage?: string;
}
export class InternalUpdateEmployeeDto {
  @IsMongoId()
  @IsOptional()
  role?: roleObject;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  currentJobAssignments?: Types.ObjectId[];

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  superiorId?: Types.ObjectId;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  @ApiProperty()
  subordinates?: Types.ObjectId[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  teams?: Types.ObjectId[];

  @ApiProperty()
  @IsMongoId()
  userInfo?: UserInfo;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  hourlyRate?: number;

  @IsOptional()
  @IsMongoId()
  currentTaskAssignments?: Types.ObjectId[];
}

export class updateEmployeeResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
