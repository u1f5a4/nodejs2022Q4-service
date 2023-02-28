import { Controller, Get } from '@nestjs/common';
import { Public } from './utils/Public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  root(): string {
    return 'Hello World!';
  }

  @Public()
  @Get('doc')
  getDoc(): string {
    return 'Hello Doc!';
  }
}
