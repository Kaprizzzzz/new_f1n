import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeComponent } from '../income/income.component';
import { ExpenseComponent } from '../expense/expense.component';
import { SavingComponent } from '../saving/saving.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, IncomeComponent, ExpenseComponent, SavingComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  active: 'none' | 'income' | 'expense' | 'saving' = 'none';

  toggle(type: any) {
    this.active = this.active === type ? 'none' : type;
  }
}
