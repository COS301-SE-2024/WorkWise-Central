import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { EmployeeModule } from '../employee/employee.module';
import {
  UserConfirmation,
  UserConfirmationSchema,
} from './entities/user-confirmation.entity';
import { EmailService } from '../email/email.service';
import { UsersRepository } from './users.repository';
import {
  UserRequestToJoin,
  UserRequestToJoinSchema,
} from '../company/entities/request-to-join.entity';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => EmployeeModule),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserConfirmation.name, schema: UserConfirmationSchema },
      { name: UserRequestToJoin.name, schema: UserRequestToJoinSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, EmailService],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
