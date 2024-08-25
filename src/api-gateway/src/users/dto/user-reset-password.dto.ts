import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class RequestResetDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class UserResetPasswordDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  userId: Types.ObjectId;

  @ApiProperty({
    description: 'This is the token that should be a query parameter when the user is redirected from the email',
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
