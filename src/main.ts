import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { logger } from './logger/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(new LoggerService());
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 4000;
  await app.listen(port);
}
bootstrap();

process.on('uncaughtException', (err, origin) => {
  logger.send('ERROR', `${err.message} ${err.stack} ${origin}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.send('ERROR', `${reason} ${JSON.stringify(promise)}`);
});
