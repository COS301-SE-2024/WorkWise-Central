import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AddSubordinatesDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  currentEmployeeId: Types.ObjectId;

  @IsArray()
  @IsMongoId({ each: true })
  @IsNotEmpty()
  @ApiProperty()
  subordinatesToBeAdded: Types.ObjectId[];
}

export class RemoveSubordinatesDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  currentEmployeeId: Types.ObjectId;

  @IsArray()
  @IsMongoId({ each: true })
  @IsNotEmpty()
  @ApiProperty()
  subordinatesToBeRemoved: Types.ObjectId[];
}

export class UpdateEmployeeDto {
  @IsMongoId()
  @IsNotEmpty()
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
}

export class updateEmployeeResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
