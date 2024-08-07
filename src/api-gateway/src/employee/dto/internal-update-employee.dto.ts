import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
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
  superiorId?: Types.ObjectId;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  subordinates?: Types.ObjectId[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  subordinateTeams?: Types.ObjectId[];

  @ApiProperty()
  @IsMongoId()
  userInfo?: UserInfo;
}

export class updateEmployeeResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
