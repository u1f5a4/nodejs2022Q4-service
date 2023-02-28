import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as JService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: JService,
    private readonly configService: ConfigService,
  ) {}

  private readonly accessOptions = {
    secret: this.configService.get<string>('JWT_SECRET_KEY'),
    expiresIn: this.configService.get<string>('TOKEN_EXPIRE_TIME'),
  };

  private readonly refreshOptions = {
    secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
    expiresIn: this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
  };

  getPayload(token: string) {
    return this.jwtService.decode(token, { json: true });
  }

  async getPairTokens(payload: { [key: string]: string | number }) {
    return {
      accessToken: await this.genereateAccessToken(payload),
      refreshToken: await this.generateRefreshToken(payload),
    };
  }

  // === Access Token ===
  private genereateAccessToken(payload: { [key: string]: string | number }) {
    return this.jwtService.signAsync(payload, this.accessOptions);
  }

  async verifyAccessToken(token: string) {
    try {
      await this.jwtService.verifyAsync(token, this.accessOptions);
      return true;
    } catch {
      return false;
    }
  }

  // === Refresh Token ===
  private generateRefreshToken(payload: { [key: string]: string | number }) {
    return this.jwtService.signAsync(payload, this.refreshOptions);
  }

  async verifyRefreshToken(token: string) {
    try {
      await this.jwtService.verifyAsync(token, this.refreshOptions);
      return true;
    } catch {
      return false;
    }
  }
}
