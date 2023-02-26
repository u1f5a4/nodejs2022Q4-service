import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { LoggerService } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const message = JSON.stringify({
      method: request.method,
      url: request.url,
      body: request.body,
      query: request.query,
      params: request.params,
    });

    this.logger.verbose(message);

    return next.handle();
  }
}
