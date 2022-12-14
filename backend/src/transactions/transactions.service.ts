import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { TransferDto, UserParamDto } from '../dto';
import { UsersService } from 'src/users/users.service';
import { AccountsService } from 'src/accounts/accounts.service';
import { v4 as uuid } from 'uuid';
import { DateIsEqual, DateIsValid, MessagesHelper } from '../helpers';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly userService: UsersService,
    private readonly accountService: AccountsService,
  ) {}

  async create(transferDto: TransferDto, user: UserParamDto) {
    const { accountReceive, accountSend } = await this.verifyTransferIsValid(
      transferDto,
      user,
    );
    await this.transfer(
      accountSend.account.id,
      accountReceive.account.id,
      transferDto.value,
    );
    const newTransfer = {
      debitedAccountId: accountSend.account.id,
      creditedAccountId: accountReceive.account.id,
      value: transferDto.value,
      createAt: new Date(),
    };
    const transfer = this.transactionRepository.create(newTransfer);
    const createTransfer = {
      ...transfer,
      id: uuid(),
    };
    const { id, value, createAt } = await this.transactionRepository.save(
      createTransfer,
    );
    return { id, userReceived: accountReceive.username, value, createAt };
  }

  async findAll(user: UserParamDto) {
    const transactions = await this.transactionRepository.find({
      where: [
        { debitedAccountId: user.accountId },
        { creditedAccountId: user.accountId },
      ],
    });
    return await this.formatTransactions(transactions);
  }

  async findAllFiltered(user: UserParamDto, date?: string, cashType?: string) {
    let transactions = await this.findAll(user);
    if (cashType === 'cashIn' || cashType === 'cashOut') {
      transactions = transactions.filter(
        (transaction) => transaction[cashType] === user.username,
      );
    }
    if (DateIsValid(new Date(date))) {
      return transactions.filter((transaction) =>
        DateIsEqual(new Date(date), new Date(transaction.createAt)),
      );
    }
    return transactions;
  }

  private async transfer(sendId: string, receiveId: string, value: number) {
    await this.accountService.cashSend(sendId, value);
    await this.accountService.cashReceived(receiveId, value);
  }

  private async verifyTransferIsValid(
    transferDto: TransferDto,
    user: UserParamDto,
  ) {
    if (transferDto.userReceive === user.username) {
      throw new HttpException(
        MessagesHelper.INVALID_TRANSFER,
        HttpStatus.BAD_REQUEST,
      );
    }
    const accountReceive = await this.userService.findByUsername(
      transferDto.userReceive,
    );
    if (!accountReceive) {
      throw new HttpException(
        MessagesHelper.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    const accountSend = await this.userService.findByUsername(user.username);
    if (accountSend.account.balance < transferDto.value)
      throw new HttpException(
        MessagesHelper.INSUFFICIENT_BALANCE,
        HttpStatus.FORBIDDEN,
      );
    return { accountReceive, accountSend };
  }

  private async formatTransactions(transactions: Transaction[]) {
    return await Promise.all(
      transactions.map(async (transaction) => {
        const { id, value, creditedAccountId, debitedAccountId, createAt } =
          transaction;
        const accountSend = await this.userService.findByAccountId(
          debitedAccountId,
        );
        const accountReceive = await this.userService.findByAccountId(
          creditedAccountId,
        );
        return {
          id,
          cashOut: accountSend.username,
          cashIn: accountReceive.username,
          value,
          createAt,
        };
      }),
    );
  }
}
