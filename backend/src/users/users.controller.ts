import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDecorator } from '../decorators';
import { UserParamDto, TransferDto } from '../dto';
import { TransactionsService } from 'src/transactions/transactions.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('/user')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private transactionsService: TransactionsService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('/balance')
  async getBalance(@UserDecorator() user: UserParamDto) {
    const { username } = user;
    const {
      account: { balance },
    } = await this.usersService.findByUsername(username);
    return { balance };
  }

  @UseGuards(JwtGuard)
  @Post('/transfer')
  async create(
    @Body() transferDto: TransferDto,
    @UserDecorator() user: UserParamDto,
  ) {
    return this.transactionsService.create(transferDto, user);
  }

  @UseGuards(JwtGuard)
  @Get('/transactions')
  async findAll(
    @UserDecorator() user: UserParamDto,
    @Query('date') date?: string,
    @Query('cashType') cashType?: string,
  ) {
    if (date || cashType) {
      return this.transactionsService.findAllFiltered(user, date, cashType);
    }
    return this.transactionsService.findAll(user);
  }
}
