import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username', nullable: false, unique: true })
  username: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column()
  accountId: string;
}
