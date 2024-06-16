import { Types } from 'mongoose';
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
  @ApiProperty()
  roleId: Types.ObjectId;

  // @IsArray()
  // @IsMongoId({ each: true })
  // @ApiProperty()
  // currentJobAssignments: Types.ObjectId[];
   
  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  superiorId: Types.ObjectId;

  // @IsArray()
  // @IsMongoId({ each: true })
  // @IsOptional()
  // @ApiProperty()
  // subordinates: Types.ObjectId[];

  // @IsArray()
  // @IsMongoId({ each: true })
  // @IsOptional()
  // @ApiProperty()
  // subordinateTeams: Types.ObjectId[];

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  userId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  companyId: Types.ObjectId;

}

export class createEmployeeResponseDto{
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
