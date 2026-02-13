import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = 'https://8539-45-89-90-142.ngrok-free.app';

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(private http: HttpClient) {}

  login(telegramId: string, userName?: string) {
    return this.http.post(`${API}/users/login`, {
      telegramId,
      userName
    });
  }

  addTransaction(data: any) {
    return this.http.post(`${API}/transactions`, data);
  }

  getTransactions(telegramId: string) {
    return this.http.get<any[]>(`${API}/transactions`, {
      params: { telegramId }
    });
  }
}
