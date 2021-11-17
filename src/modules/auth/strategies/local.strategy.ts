import { Strategy } from 'passport-local';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<CreateUserDto> {
    const user = await this.authService.validate(email, password);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
