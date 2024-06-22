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
  roleId?: Types.ObjectId;

  @IsArray()
  @IsMongoId({ each: true })
  @ApiProperty()
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
  @ApiProperty()
  subordinateTeams?: Types.ObjectId[];

}

export class updateEmployeeResponseDto{
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
