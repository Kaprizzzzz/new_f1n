import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionType } from '../../common/enums/transaction-type.enum';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Post()
  create(
    @Body()
    body: {
      telegramId: string;
      amount: number;
      type: TransactionType;
      category: string;
    },
  ) {
    return this.service.createTransaction(
      body.telegramId,
      body.amount,
      body.type,
      body.category,
    );
  }

  @Get()
  list(@Query('telegramId') telegramId: string) {
    return this.service.getUserTransactions(telegramId);
  }
}
