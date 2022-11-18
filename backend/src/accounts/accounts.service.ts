import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
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
}
