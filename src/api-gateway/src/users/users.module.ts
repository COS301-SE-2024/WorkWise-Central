import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { EmployeeModule } from '../employee/employee.module';
import {
  UserConfirmation,
  UserConfirmationScheme,
} from './entities/user-confirmation.entity';
import { EmailService } from '../email/email.service';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => EmployeeModule),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserConfirmation.name, schema: UserConfirmationScheme },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, EmailService],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
