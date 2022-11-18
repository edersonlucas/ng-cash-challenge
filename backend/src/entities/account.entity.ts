import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
