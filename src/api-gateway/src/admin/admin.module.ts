import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import {
  UserJoinRequest,
  UserJoinRequestSchema,
} from './entities/request-to-join.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { EmployeeModule } from '../employee/employee.module';
import { EmailModule } from '../email/email.module';
import { CompanyModule } from '../company/company.module';
import { RoleModule } from '../role/role.module';
import { FileModule } from '../file/file.module';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { AdminRepository } from './admin.repository';
import { RoleService } from '../role/role.service';
import {
  InviteToJoin,
  InviteToJoinSchema,
} from './entities/invite-to-join.entity';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => EmailModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => RoleModule),
    forwardRef(() => FileModule),
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([
      { name: UserJoinRequest.name, schema: UserJoinRequestSchema },
      { name: InviteToJoin.name, schema: InviteToJoinSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    AdminRepository,
    UsersService,
    UsersRepository,
    JwtService,
    RoleService,
  ],
  exports: [AdminService, MongooseModule],
})
export class AdminModule {}
