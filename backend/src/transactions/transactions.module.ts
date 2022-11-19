import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from 'src/accounts/accounts.module';
import { Transaction } from 'src/entities';
import { UsersModule } from 'src/users/users.module';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    AccountsModule,
    UsersModule,
  ],
  providers: [TransactionsService],
  exports: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
