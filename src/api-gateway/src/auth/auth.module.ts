import { forwardRef, Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from '../email/email.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserConfirmation,
  UserConfirmationScheme,
} from '../users/entities/user-confirmation.entity';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserConfirmation.name, schema: UserConfirmationScheme },
    ]),
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1333333h' },
    }),
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
