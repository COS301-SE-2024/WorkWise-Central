import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class currentEmployeeDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  currentEmployeeId: Types.ObjectId;
}
