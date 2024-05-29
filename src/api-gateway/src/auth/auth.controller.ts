import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/sign-in-dto.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDTO: signInDto) {
    try {
      return this.authService.signIn(signInDTO.identifier, signInDTO.password);
    } catch (Error) {
      throw new HttpException('Invalid Login', HttpStatus.NOT_FOUND);
    }
  }
}
