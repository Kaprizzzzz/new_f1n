import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async login(telegramId: string, userName?: string) {
    let user = await this.repo.findOne({ where: { telegramId } });

    if (!user) {
      user = this.repo.create({
        telegramId,
        userName,
        referralCode: Math.random().toString(36).slice(2, 8).toUpperCase(),
      });
      await this.repo.save(user);
    }

    return user;
  }
}
