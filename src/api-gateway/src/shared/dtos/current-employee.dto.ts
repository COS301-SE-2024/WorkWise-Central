import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CurrentEmployeeDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  currentEmployeeId: Types.ObjectId;
}
