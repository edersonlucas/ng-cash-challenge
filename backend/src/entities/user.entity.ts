import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { Account } from './account.entity';
import { hashSync } from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username', nullable: false, unique: true })
  username: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @OneToOne(() => Account, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'accountId', referencedColumnName: 'id' }])
  account: Account;

  @Column()
  accountId: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
