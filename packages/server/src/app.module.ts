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
import { Hotel } from './entities/hotel.entity';
import { AirBnb } from './entities/airbnb.entity';
import { Address } from './entities/address.entity';
import { AirBnbModule } from './features/object/airbnb/airbnb.module';
import { AddressController } from './api/controllers/address.controller';
import { AddressModule } from './features/address/address.module';

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
      entities: [Test, Hotel, AirBnb, Address],
    }),
    TypeOrmModule.forFeature([Test, Hotel, AirBnb, Address]),
    AirBnbModule,
    AddressModule,
  ],
  controllers: [AppController, AddressController],
  providers: [AppService, AirBnbModule, AddressModule],
})
export class AppModule {}
