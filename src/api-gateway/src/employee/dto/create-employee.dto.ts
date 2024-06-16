import { Types } from 'mongoose';
import { Prop } from '@nestjs/mongoose';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  roleId: Types.ObjectId;

  @IsArray()
  @IsMongoId({ each: true })
  currentJobAssignments: Types.ObjectId[];
   
  @IsMongoId()
  @IsOptional()
  superiorId: Types.ObjectId;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  subordinates: Types.ObjectId[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  subordinateTeams: Types.ObjectId[];

  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  companyId: Types.ObjectId;

}

export class createEmployeeResponseDto{
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
