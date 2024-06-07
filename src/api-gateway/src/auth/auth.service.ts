import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    userIdentifier: string,
    pass: string,
  ): Promise<{ access_token: string; id: Types.ObjectId }> {
    const user = await this.usersService.findUserByUsername(userIdentifier);
    if (!user) {
      throw new NotFoundException('Incorrect login details');
    }
    const match = await bcrypt.compare(pass, user.systemDetails.password);
    if (!match) {
      throw new NotFoundException('Incorrect login details');
    }

    const payload = { sub: user._id, username: user.systemDetails.username };
    return {
      id: user._id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
