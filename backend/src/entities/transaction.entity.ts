import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { Account } from '.';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'debitedAccountId', referencedColumnName: 'id' }])
  debitedAccount: Account;

  @ManyToOne(() => Account, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'creditedAccountId', referencedColumnName: 'id' }])
  creditedAccount: Account;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    name: 'value',
    nullable: false,
  })
  value: number;

  @Column()
  creditedAccountId: string;

  @Column()
  debitedAccountId: string;

  @CreateDateColumn()
  createAt: Date;
}
