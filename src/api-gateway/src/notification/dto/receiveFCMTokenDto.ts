import { IsNotEmpty, IsString } from 'class-validator';

export class ReceiveFCMTokenDto {
  @IsNotEmpty()
  @IsString()
  newToken: string;
}

export class StopPushDto {
  @IsNotEmpty()
  @IsString()
  deviceType: string;
}
