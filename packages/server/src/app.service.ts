import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getData() {
    return [
      { name: 'test', id: 1 },
      { name: 'test', id: 2 },
      { name: 'test', id: 3 },
      { name: 'test', id: 4 },
    ];
  }
}
