import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { AirBnbService } from 'src/features/object/airbnb/airbnb.service';
import { AirBnbDto, UpdateAirBnbDto } from '../dto/airbnb.dto';

@ApiTags('AirBnb')
@Controller('airbnb')
export class AirBnbController {
  constructor(private readonly airbnbService: AirBnbService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get All AirBnbs' })
  getAllAirBnbs() {
    return this.airbnbService.getAllAirBnbs();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns AirBnb by Id' })
  getAirBnbById(@Param('id') id: UUID) {
    return this.airbnbService.getAirBnbById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Creates a new AirBnb' })
  createAirBnb(@Body() body: AirBnbDto) {
    return this.airbnbService.createAirBnb(body);
  }

  @Post(':id/update')
  @ApiResponse({
    status: 200,
    description: 'Update an AirBnb by Id',
  })
  @ApiBody({ type: UpdateAirBnbDto })
  updateAirBnb(@Param('id') id: UUID, @Body() body: UpdateAirBnbDto) {
    return this.airbnbService.updateAirBnb(id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete an AirBnb by Id' })
  deleteAirBnb(@Param('id') id: UUID) {
    return this.airbnbService.deleteAirBnb(id);
  }
}
