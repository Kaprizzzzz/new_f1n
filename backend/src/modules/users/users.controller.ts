import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('login')
  login(
    @Body() body: { telegramId: string; userName?: string },
  ) {
    return this.service.login(body.telegramId, body.userName);
  }
}
