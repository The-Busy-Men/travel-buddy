import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { AddressService } from 'src/features/address/address.service';
import { AddressDto, UpdateAddressDto } from '../dto/address.dto';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Gets all Addresses registered' })
  getAllAirBnbs() {
    return this.addressService.getAllAddresses();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns Address by Id' })
  getAirBnbById(@Param('id') id: UUID) {
    return this.addressService.getAddressById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Creates a new Address' })
  createAirBnb(@Body() body: AddressDto) {
    return this.addressService.createAddress(body);
  }

  @Post(':id/update')
  @ApiResponse({
    status: 200,
    description: 'Update an Address by Id',
  })
  @ApiBody({ type: UpdateAddressDto })
  updateAirBnb(@Param('id') id: UUID, @Body() body: UpdateAddressDto) {
    return this.addressService.updateAddress(id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete an Address by Id' })
  deleteAirBnb(@Param('id') id: UUID) {
    return this.addressService.deleteAddress(id);
  }
}
