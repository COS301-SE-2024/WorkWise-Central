import { Types } from 'mongoose';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInventoryUsedDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  amount: number;
}

export class updateInventoryResponseDto {
  response: { access_token: string; id: Types.ObjectId };
  constructor(message: { access_token: string; id: Types.ObjectId }) {
    this.response = message;
  }
}
