import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserEmailVerificationDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
