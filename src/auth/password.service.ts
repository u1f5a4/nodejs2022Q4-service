import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  constructor(private readonly configService: ConfigService) {}

  hash(password: string) {
    return bcrypt.hash(password, Number(this.configService.get('CRYPT_SALT')));
  }

  compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
