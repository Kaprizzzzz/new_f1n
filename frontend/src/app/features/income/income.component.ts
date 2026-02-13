import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { TelegramService } from '../../core/services/telegram.service';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent {

  @Input() active = false;
  @Output() open = new EventEmitter<void>();

  categories = ['Salary', 'Motherlode', 'Bonus'];
  showModal = false;
  amount = 0;
  selectedCategory = '';

  constructor(
    private api: ApiService,
    private telegram: TelegramService
  ) {}

  toggle() {
    this.open.emit();
  }

  select(cat: string) {
    this.selectedCategory = cat;
    this.showModal = true;
  }

  save() {
    const user = this.telegram.user;
    if (!user) return;

    this.api.addTransaction({
      telegramId: user.id,
      amount: this.amount,
      type: 'income',
      category: this.selectedCategory,
    }).subscribe();

    this.amount = 0;
    this.showModal = false;
  }
}
