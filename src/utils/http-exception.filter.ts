import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import { LoggerService } from 'src/logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    const message = JSON.stringify({
      statusCode: status,
      name: exception.name,
      message: exception.message,
      method: request.method,
      url: request.url,
      body: request.body,
      query: request.query,
      params: request.params,
    });

    if (status >= 500) this.logger.error(message, 'none');
    if (status >= 400) this.logger.warn(message);

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
