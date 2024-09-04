import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post('new-data')
  createTestData(@Body() body: { name: string }) {
    return this.appService.createTestData(body.name);
  }

  @Get('get-test-data')
  getDBTestData() {
    return this.appService.getAllTestData();
  }
}
