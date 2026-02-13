import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { TelegramService } from '../../core/services/telegram.service';

@Component({
  selector: 'app-saving',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saving.component.html',
  styleUrls: ['./saving.component.scss']
})
export class SavingComponent implements OnInit {

  @Input() active = false;
  @Output() open = new EventEmitter<void>();

  income = 0;
  expense = 0;
  transactions: any[] = [];

  constructor(
    private api: ApiService,
    private telegram: TelegramService
  ) {}

  ngOnInit() {
    const user = this.telegram.user;
    if (!user) return;

    this.api.getTransactions(user.id)
      .subscribe(tx => {
        this.transactions = tx;

        this.income = tx
          .filter(t => t.type === 'income')
          .reduce((a, b) => a + +b.amount, 0);

        this.expense = tx
          .filter(t => t.type === 'expense')
          .reduce((a, b) => a + +b.amount, 0);
      });
  }

  toggle() {
    this.open.emit();
  }
}
