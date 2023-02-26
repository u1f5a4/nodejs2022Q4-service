import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule as JModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import { UserModule } from 'src/user/user.module';
import { PasswordService } from './password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

const JwtModule = JModule.registerAsync({
  useFactory: () => ({
    secret: 'Use only jwt.service.ts',
  }),
});

@Module({
  imports: [
    JwtModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, PasswordService],
  exports: [JwtService],
})
export class AuthModule {}
