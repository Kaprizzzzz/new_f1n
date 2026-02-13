import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from '../transactions/transaction.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  telegramId: string;

  @Column({ nullable: true })
  userName: string;

  @Column({ unique: true })
  referralCode: string;

  @Column({ nullable: true })
  referredBy: string;

  @OneToMany(() => Transaction, (tx) => tx.user)
  transactions: Transaction[];
}
