import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
})
export class TransactionsModule {}
