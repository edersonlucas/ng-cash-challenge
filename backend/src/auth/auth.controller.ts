import { LocalGuard } from './guard';
import { AuthService } from './auth.service';
import { CreateUserDto, UserParamDto } from '../dto';
import { Controller, UseGuards, Post, Body, HttpCode } from '@nestjs/common';
import { UserDecorator } from '../decorators';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @UseGuards(LocalGuard)
  @HttpCode(200)
  @Post('login')
  async login(@UserDecorator() user: UserParamDto) {
    return await this.authService.login(user);
  }
}
