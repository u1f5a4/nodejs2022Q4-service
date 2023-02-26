import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

import { LoginAuthDto } from './dto/login.dto';
import { SignupAuthDto } from './dto/signup.dto';
import { JwtService } from './jwt.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(dto: LoginAuthDto) {
    const user = await this.userRepository.findOneBy({ login: dto.login });
    if (!user) return null;
    const isPasswordCorrect = await this.passwordService.compare(
      dto.password,
      user.password,
    );
    if (!isPasswordCorrect) return null;

    const payload = { id: user.id, login: user.login };
    return this.jwtService.getPairTokens(payload);
  }

  async signup(dto: SignupAuthDto) {
    return this.userService.create({
      login: dto.login,
      password: await this.passwordService.hash(dto.password),
    });
  }

  refresh(token: string) {
    const payload = this.jwtService.getPayload(token) as { [key: string]: any };
    delete payload.iat;
    delete payload.exp;

    if (!this.jwtService.verifyRefreshToken(token)) return null;
    else return this.jwtService.getPairTokens(payload);
  }
}
