import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { Public } from 'src/utils/Public.decorator';

import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login.dto';
import { RefreshAuthDto } from './dto/refresh.dto';
import { SignupAuthDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  create(@Body() dto: SignupAuthDto) {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async findAll(@Body() dto: LoginAuthDto) {
    const result = await this.authService.login(dto);
    if (!result)
      throw new HttpException('User not found or wrong password', 403);
    return result;
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  findOne(@Body() { refreshToken }: RefreshAuthDto) {
    return this.authService.refresh(refreshToken);
  }
}
