import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './entities/test.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Test) private readonly testRepository: Repository<Test>,
  ) {}
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

  createTestData(name: string) {
    return this.testRepository.save({ name: name });
  }

  getAllTestData() {
    return this.testRepository.find();
  }
}
