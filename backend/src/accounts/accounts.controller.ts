import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { UserDecorator } from 'src/decorators';
import { UserParamDto } from 'src/dto';
import { AccountsService } from './accounts.service';

@UseGuards(JwtGuard)
@Controller()
export class AccountsController {
  constructor(private accountService: AccountsService) {}
  @Get('/balance')
  async getBalance(@UserDecorator() user: UserParamDto) {
    const { balance } = await this.accountService.findAccountById(
      user.accountId,
    );
    return { balance };
  }
}
