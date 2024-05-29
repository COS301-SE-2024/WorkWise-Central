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
    console.log('user');
    console.log(user);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const match = await bcrypt.compare(pass, user.password);
    console.log('match');
    console.log(match);
    if (!match) {
      throw new NotFoundException('username or password is incorrect');
    }

    const payload = { sub: user.user_UUID, username: user.displayName };
    console.log(payload);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
