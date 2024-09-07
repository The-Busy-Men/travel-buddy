import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { HotelService } from 'src/features/object/hotel/hotel.service';
import { HotelDto, UpdateHotelDto } from '../dto/hotel.dto';

@ApiTags('Hotel')
@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get All Hotels' })
  getAllAirBnbs() {
    return this.hotelService.getAllHotels();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns Hotel by Id' })
  getAirBnbById(@Param('id') id: UUID) {
    return this.hotelService.getHotelById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Creates a new Hotel' })
  createAirBnb(@Body() body: HotelDto) {
    return this.hotelService.createHotel(body);
  }

  @Post(':id/update')
  @ApiResponse({
    status: 200,
    description: 'Update an Hotel by Id',
  })
  @ApiBody({ type: UpdateHotelDto })
  updateAirBnb(@Param('id') id: UUID, @Body() body: UpdateHotelDto) {
    return this.hotelService.updateHotel(id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete an Hotel by Id' })
  deleteAirBnb(@Param('id') id: UUID) {
    return this.hotelService.deleteHotel(id);
  }
}
