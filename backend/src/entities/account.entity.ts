import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from '.';
import { Transaction } from '.';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    name: 'balance',
    nullable: false,
  })
  balance: number;

  @OneToOne(() => User, (user) => user.account)
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.creditedAccount)
  @OneToMany(() => Transaction, (transaction) => transaction.debitedAccount)
  transaction: Transaction;
}
