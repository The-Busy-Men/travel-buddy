import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { AddressDto, UpdateAddressDto } from 'src/api/dto/address.dto';
import { Address } from 'src/entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async getAllAddresses() {
    return await this.addressRepository.find();
  }

  async getAddressById(id: UUID) {
    return await this.addressRepository.findOneBy({ id: id });
  }

  async createAddress(data: AddressDto) {
    return await this.addressRepository.save({
      streetAddress: data.streetAddress,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      country: data.country,
      addressLine2: data.addressLine2,
      addressType: data.addressType,
    });
  }

  async updateAddress(id: UUID, data: UpdateAddressDto) {
    return await this.addressRepository.update(
      { id: id },
      {
        streetAddress: data.streetAddress,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
        addressLine2: data.addressLine2,
        addressType: data.addressType,
      },
    );
  }

  async deleteAddress(id: UUID) {
    return await this.addressRepository.delete({ id: id });
  }
}
