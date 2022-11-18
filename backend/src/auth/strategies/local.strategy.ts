import { MessagesHelper } from 'src/helpers/messages.helpers';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user)
      throw new HttpException(
        MessagesHelper.USERNAME_OR_PASSWORD_INVALID,
        HttpStatus.UNAUTHORIZED,
      );
    return {
      accountId: user.accountId,
      username: user.username,
    };
  }
}
