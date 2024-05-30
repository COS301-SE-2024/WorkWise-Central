import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    userIdentifier: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findUser(userIdentifier);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const match = await bcrypt.compare(pass, user.systemDetails.password);
    if (!match) {
      throw new NotFoundException('Username or Password is incorrect');
    }

    const payload = { sub: user.user_UUID, username: user.profile.displayName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
