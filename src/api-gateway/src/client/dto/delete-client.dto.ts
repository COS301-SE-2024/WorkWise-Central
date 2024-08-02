import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteClientDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  clientId: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  employeeId: Types.ObjectId;
}
