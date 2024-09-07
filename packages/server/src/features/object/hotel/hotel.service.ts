import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { HotelDto, UpdateHotelDto } from 'src/api/dto/hotel.dto';
import { Hotel } from 'src/entities/hotel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private readonly airbnbRepository: Repository<Hotel>,
  ) {}

  async getAllHotels() {
    return await this.airbnbRepository.find({ relations: ['address'] });
  }

  async getHotelById(id: UUID) {
    return await this.airbnbRepository.findOneBy({ id: id });
  }

  async createHotel(data: HotelDto) {
    return await this.airbnbRepository.save({
      name: data.name,
      description: data.description,
      owners: data.owners,
      active: data.active,
      rating: data.rating,
      address: { id: data.addressId },
      numberRooms: data.numberRooms,
      stars: data.stars,
      priceClass: data.priceClass,
    });
  }

  async updateHotel(id: UUID, data: UpdateHotelDto) {
    return await this.airbnbRepository.update(
      { id: id },
      {
        name: data.name,
        description: data.description,
        owners: data.owners,
        active: data.active,
        rating: data.rating,
        address: { id: data.addressId },
        numberRooms: data.numberRooms,
        stars: data.stars,
        priceClass: data.priceClass,
      },
    );
  }

  async deleteHotel(id: UUID) {
    return await this.airbnbRepository.delete({ id: id });
  }
}
