import { Types } from 'mongoose';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeDto {
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  @ApiProperty()
  roleId: Types.ObjectId;
   
  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  superiorId: Types.ObjectId;

  @IsMongoId({ each: true })
  @ApiProperty()
  addJobId: Types.ObjectId;

  @IsMongoId({ each: true })
  @IsOptional()
  @ApiProperty()
  addSubordinateId: Types.ObjectId;

  @IsMongoId({ each: true })
  @IsOptional()
  @ApiProperty()
  addTeamId: Types.ObjectId;

  @IsMongoId({ each: true })
  @ApiProperty()
  removeJobId: Types.ObjectId;

  @IsMongoId({ each: true })
  @IsOptional()
  @ApiProperty()
  removeSubordinateId: Types.ObjectId;

  @IsMongoId({ each: true })
  @IsOptional()
  @ApiProperty()
  removeTeamId: Types.ObjectId;

}

export class updateEmployeeResponseDto{
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
