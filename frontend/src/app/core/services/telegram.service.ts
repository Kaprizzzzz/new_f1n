import { Injectable } from '@angular/core';

declare const Telegram: any;

@Injectable({ providedIn: 'root' })
export class TelegramService {

  init() {
    if (Telegram?.WebApp) {
      Telegram.WebApp.ready();
      Telegram.WebApp.expand();
    }
  }

  get user() {
    return Telegram?.WebApp?.initDataUnsafe?.user ?? null;
  }
}
