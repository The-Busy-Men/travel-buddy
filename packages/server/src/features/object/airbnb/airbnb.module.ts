import { Module } from '@nestjs/common';
import { AirBnbController } from 'src/api/controllers/airbnb.controller';
import { AirBnbService } from './airbnb.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirBnb } from 'src/entities/airbnb.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AirBnb])],
  controllers: [AirBnbController],
  providers: [AirBnbService],
})
export class AirBnbModule {}
