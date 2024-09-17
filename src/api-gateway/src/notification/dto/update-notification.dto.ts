import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateNotificationDto {
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}
