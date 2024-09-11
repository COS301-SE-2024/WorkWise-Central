import { IsArray, IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { Message } from '../entities/notification.entity';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsMongoId()
  senderId?: Types.ObjectId; //employeeId

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  recipientIds: Types.ObjectId[];

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  whoCanView?: string;

  @IsOptional()
  isJobRelated?: boolean = false;

  @IsOptional()
  companyName?: string = null;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  message: Message;
}

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
