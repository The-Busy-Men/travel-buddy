import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AirBnb } from 'src/entities/airbnb.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AirBnbService {
  constructor(
    @InjectRepository(AirBnb)
    private readonly airbnbRepository: Repository<AirBnb>,
  ) {}

  async getAllAirBnbs() {
    return await this.airbnbRepository.findAndCount();
  }
}
