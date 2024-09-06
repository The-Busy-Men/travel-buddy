import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { AirBnbDto, UpdateAirBnbDto } from 'src/api/dto/airbnb.dto';
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

  async getAirBnbById(id: UUID) {
    return await this.airbnbRepository.findOneBy({ id: id });
  }

  async createAirBnb(data: AirBnbDto) {
    return await this.airbnbRepository.save({
      name: data.name,
      description: data.description,
      owners: data.owners,
      active: data.active,
      rating: data.rating,
      address: { id: data.addressId },
      hostName: data.hostName,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      isShared: data.isShared,
    });
  }

  async updateAirBnb(id: UUID, data: UpdateAirBnbDto) {
    return await this.airbnbRepository.update(
      { id: id },
      {
        name: data.name,
        description: data.description,
        owners: data.owners,
        active: data.active,
        rating: data.rating,
        address: { id: data.addressId },
        hostName: data.hostName,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        isShared: data.isShared,
      },
    );
  }

  async deleteAirBnb(id: UUID) {
    return await this.airbnbRepository.delete({ id: id });
  }
}
