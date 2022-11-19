import { Controller, Get, UseGuards, Query, Post, Body } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { UserDecorator } from 'src/decorators';
import { TransferDto, UserParamDto } from 'src/dto';
import { MessagesHelper } from 'src/helpers';
import { TransactionsService } from './transactions.service';

@UseGuards(JwtGuard)
@Controller('/transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}
  @Get()
  async findAll(
    @UserDecorator() user: UserParamDto,
    @Query('date') date?: string,
    @Query('cashType') cashType?: string,
  ) {
    let transactions;
    if (date || cashType) {
      transactions = await this.transactionsService.findAllFiltered(
        user,
        date,
        cashType,
      );
    } else {
      transactions = await this.transactionsService.findAll(user);
    }
    if (transactions.length < 1)
      return { message: MessagesHelper.TRANSACTION_NOT_FOUND };
    return transactions;
  }

  @Post()
  async create(
    @Body() transferDto: TransferDto,
    @UserDecorator() user: UserParamDto,
  ) {
    return this.transactionsService.create(transferDto, user);
  }
}
