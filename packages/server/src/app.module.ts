import { Module } from '@nestjs/common';
import { AppController } from './api/controllers/app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import {
  getDBHost,
  getDBName,
  getDBPassword,
  getDBPort,
  getDBUser,
} from './core/configs/env.config';

console.log({
  port: getDBPort(),
  username: getDBUser(),
  password: getDBPassword(),
  database: getDBName(),
});

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: getDBHost(),
      port: getDBPort(),
      username: getDBUser(),
      password: getDBPassword(),
      database: getDBName(),
      synchronize: true,
      entities: [Test],
    }),
    TypeOrmModule.forFeature([Test]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
