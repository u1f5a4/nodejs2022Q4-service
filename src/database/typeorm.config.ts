import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get('DB_HOST'),
    port: +config.get('DB_PORT'),
    username: config.get('POSTGRES_USER'),
    password: config.get('POSTGRES_PASSWORD'),
    database: config.get('POSTGRES_DB'),
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/**/*.js'],
    synchronize: false,
  }),
};
