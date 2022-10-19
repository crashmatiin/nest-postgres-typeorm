import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from './utils';
import { isEmpty } from 'lodash';
import { AuthPayload, AuthToken } from './constants';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) return null;
    else if (!isEmpty(user.password)) {
      const matchPassword = await comparePassword(password, user.password);
      if (matchPassword) {
        delete user.password;
        return user;
      }
    }
    throw new UnauthorizedException();
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register() {
    return 'Здесь должна быть регистрация';
  }

  async getAccessToken(user: any): Promise<AuthToken> {
    const payload: AuthPayload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
