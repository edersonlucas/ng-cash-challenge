import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }
}
