import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  roleId: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  superiorId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  userId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  companyId: Types.ObjectId;
}

export class createEmployeeResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
