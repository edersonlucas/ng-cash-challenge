import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../entities';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create() {
    const createAccount = {
      id: uuid(),
      balance: 100,
    };
    const account = this.accountRepository.create(createAccount);
    return await this.accountRepository.save(account);
  }

  async cashSend(id: string, value: number) {
    const accountSend = await this.findAccountById(id);
    accountSend.balance = Number(accountSend.balance) - value;
    accountSend.balance = Number(accountSend.balance.toFixed(2));
    return await this.accountRepository.save(accountSend);
  }

  async cashReceived(id: string, value: number) {
    const accountReceive = await this.findAccountById(id);
    accountReceive.balance = Number(accountReceive.balance) + value;
    accountReceive.balance = Number(accountReceive.balance.toFixed(2));
    return await this.accountRepository.save(accountReceive);
  }

  async findAccountById(id: string) {
    const account = await this.accountRepository.findOneBy({ id });
    return account;
  }
}
