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
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { signInResponseDto } from './dto/sign-in-response.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ type: signInResponseDto })
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDTO: signInDto) {
    try {
      const result: signInResponseDto = await this.authService.signIn(
        signInDTO.identifier,
        signInDTO.password,
      );
      return result;
    } catch (Error) {
      throw new HttpException('Invalid Login', HttpStatus.NOT_FOUND);
    }
  }
}
