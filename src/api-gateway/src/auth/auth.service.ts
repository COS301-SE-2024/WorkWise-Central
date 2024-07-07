import {
  forwardRef,
  Global,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserConfirmation } from '../users/entities/user-confirmation.entity';
import { SignInUserDto } from '../users/entities/user.entity';

@Global()
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(UserConfirmation.name)
    private userConfirmationModel: Model<UserConfirmation>,
    //private mailService: EmailService,
  ) {}

  async signIn(userIdentifier: string, pass: string): Promise<SignInUserDto> {
    const user = await this.usersService.getUserByUsername(userIdentifier);
    if (!user) {
      throw new NotFoundException('Incorrect login details');
    }
    const match = await bcrypt.compare(pass, user.systemDetails.password);
    if (!match) {
      throw new NotFoundException('Incorrect login details');
    }

    const payload = { sub: user._id, username: user.systemDetails.username };
    return new SignInUserDto(
      await this.jwtService.signAsync(payload),
      user._id,
      user,
    );
  }

  async verifyEmail(email: string, token: string) {
    const userExists = await this.userConfirmationModel.findOne({
      email: email,
      key: token,
    });
    if (!userExists) {
      return false;
    }

    if (await this.usersService.verifyUser(email)) {
      this.userConfirmationModel.deleteOne({ email: email });
      return true;
    }

    return false;
  }
}
