import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { MessagesHelper } from '../../helpers';
import { UsersService } from 'src/users/users.service';
import { PayloadJwtDto } from '../../dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payloadJwt: PayloadJwtDto) {
    const user = await this.userService.findByUsername(payloadJwt.username);
    if (!user || user.accountId !== payloadJwt.sub)
      throw new HttpException(
        MessagesHelper.TOKEN_INVALID,
        HttpStatus.UNAUTHORIZED,
      );
    return { accountId: payloadJwt.sub, username: payloadJwt.username };
  }
}
