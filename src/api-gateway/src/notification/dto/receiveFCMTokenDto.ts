import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReceiveFCMTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  newToken: string;
}

export class StopPushDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  deviceType: string;
}
