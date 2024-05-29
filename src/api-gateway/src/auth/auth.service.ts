import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(userIdentifier: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(userIdentifier);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const match = await bcrypt.compare(pass, user.password);
    if (!match) {
      throw new NotFoundException('username or password is incorrect');
    }

    const result = user;
    result.password = '';
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}
