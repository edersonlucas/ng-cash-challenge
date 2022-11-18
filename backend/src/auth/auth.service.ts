import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';
import { MessagesHelper } from '../helpers';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto';
import { UserParamDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly accountService: AccountsService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    await this.userAlreadyExists(createUserDto.username);
    const newAccount = await this.accountService.create();
    const newUser = {
      ...createUserDto,
      account: newAccount,
    };
    const { account, username } = await this.userService.create(newUser);
    const payload = {
      sub: account.id,
      username,
    };
    const token = this.jwtService.sign(payload);
    return { username, balance: account.balance, token };
  }

  async login(userParamDto: UserParamDto) {
    const payload = {
      sub: userParamDto.accountId,
      username: userParamDto.username,
    };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  private async userAlreadyExists(username: string) {
    const user = await this.userService.findByUsername(username);
    if (user)
      throw new HttpException(
        MessagesHelper.USER_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
  }
}
