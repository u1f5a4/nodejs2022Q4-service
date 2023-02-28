import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Logger, logger } from './logger';

@Injectable()
export class LoggerService extends ConsoleLogger {
  logger: Logger;
  useConsole: boolean;

  constructor() {
    super();
    this.logger = logger;
    this.useConsole = this.logger.whereToWrite.includes('console');
  }

  log(message: string) {
    if (this.useConsole) super.log(message);
    this.logger.send('LOG', message);
  }

  error(message: string, trace: string) {
    if (this.useConsole) super.error(message, trace);
    this.logger.send('ERROR', `${message} ${trace}}`);
  }

  warn(message: string) {
    if (this.useConsole) super.warn(message);
    this.logger.send('WARN', message);
  }

  debug(message: string) {
    if (this.useConsole) super.debug(message);
    this.logger.send('DEBUG', message);
  }

  verbose(message: string) {
    if (this.useConsole) super.verbose(message);
    this.logger.send('VERBOSE', message);
  }
}
