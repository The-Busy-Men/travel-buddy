import { Controller, Get } from '@nestjs/common';
import { AppService } from '../../app.service';

@Controller('main')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get')
  getHello() {
    console.log('Hello');
    return this.appService.getHello();
  }

  @Get('test-data')
  getTestData() {
    return this.appService.getData();
  }
}
