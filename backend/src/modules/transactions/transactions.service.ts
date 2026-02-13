import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { User } from '../users/user.entity';
import { TransactionType } from '../../common/enums/transaction-type.enum';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private txRepo: Repository<Transaction>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createTransaction(
    telegramId: string,
    amount: number,
    type: TransactionType,
    category: string,
  ) {
    const user = await this.userRepo.findOne({
      where: { telegramId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const transaction = this.txRepo.create({
      amount,
      type,
      category,
      user, // ✅ НЕ null
    });

    return this.txRepo.save(transaction);
  }

  async getUserTransactions(telegramId: string) {
    return this.txRepo.find({
      where: { user: { telegramId } },
      order: { createdAt: 'DESC' },
    });
  }
}
