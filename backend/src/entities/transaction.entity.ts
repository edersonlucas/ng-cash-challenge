import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
