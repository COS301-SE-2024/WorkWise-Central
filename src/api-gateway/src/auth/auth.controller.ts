import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in-dto.dto';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SignInResponseDto } from './dto/sign-in-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: `Used to login a user`,
    description: 'Further details',
  })
  @ApiOkResponse({ type: SignInResponseDto })
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async signIn(@Body() signInDTO: SignInDto) {
    try {
      const result: SignInResponseDto = await this.authService.signIn(
        signInDTO.identifier,
        signInDTO.password,
      );
      return result;
    } catch (Error) {
      throw new HttpException('Invalid Login', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/verify')
  @ApiOperation({
    summary: `Verify a user using their email`,
    description: '',
  })
  async verifyEmail(
    @Query('email') email: string,
    @Query('token') token: string,
  ) {
    const userIsVerified = await this.authService.verifyEmail(email, token);
    const status: string = userIsVerified ? 'successful' : 'failed';
    return {
      data: {
        success: userIsVerified,
        message: `Email verification ${status}`,
      },
    };
  }
}
