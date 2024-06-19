import {
  IsArray,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

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

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  message: string;
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
