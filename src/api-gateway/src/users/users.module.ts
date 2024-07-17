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
import { EmailModule } from '../email/email.module';
import { CompanyModule } from '../company/company.module';
import { CompanyService } from '../company/company.service';
import { RoleModule } from '../role/role.module';
import { JwtService } from '@nestjs/jwt';
import { FileModule } from '../file/file.module';
import { FileService } from '../file/file.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => EmailModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => RoleModule),
    forwardRef(() => FileModule),

    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserConfirmation.name, schema: UserConfirmationSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    EmailService,
    CompanyService,
    JwtService,
    FileService,
  ],
  exports: [UsersService, UsersRepository, MongooseModule],
})
export class UsersModule {}
