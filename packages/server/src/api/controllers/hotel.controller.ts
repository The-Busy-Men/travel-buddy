import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { HotelService } from 'src/features/object/hotel/hotel.service';
import { HotelDto, UpdateHotelDto } from '../dto/hotel.dto';
import { RolesGuard } from 'src/core/guards/role.guard';
import { Roles } from 'src/core/decorators/role.decorator';

@ApiTags('Hotel')
@UseGuards(RolesGuard)
@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get()
  @Roles('user')
  @ApiResponse({ status: 200, description: 'Get All Hotels' })
  getAllAirBnbs() {
    return this.hotelService.getAllHotels();
  }

  @Get(':id')
  @Roles('user')
  @ApiResponse({ status: 200, description: 'Returns Hotel by Id' })
  getAirBnbById(@Param('id') id: UUID) {
    return this.hotelService.getHotelById(id);
  }

  @Post()
  @Roles('user')
  @ApiResponse({ status: 201, description: 'Creates a new Hotel' })
  createAirBnb(@Body() body: HotelDto) {
    return this.hotelService.createHotel(body);
  }

  @Post(':id/update')
  @Roles('user')
  @ApiResponse({
    status: 200,
    description: 'Update an Hotel by Id',
  })
  @ApiBody({ type: UpdateHotelDto })
  updateAirBnb(@Param('id') id: UUID, @Body() body: UpdateHotelDto) {
    return this.hotelService.updateHotel(id, body);
  }

  @Delete(':id')
  @Roles('user')
  @ApiResponse({ status: 200, description: 'Delete an Hotel by Id' })
  deleteAirBnb(@Param('id') id: UUID) {
    return this.hotelService.deleteHotel(id);
  }
}
