import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AirBnbService } from 'src/features/object/airbnb/airbnb.service';

@ApiTags('AirBnb')
@Controller('airbnb')
export class AirBnbController {
  constructor(private readonly airbnbService: AirBnbService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get All AirBnbs and the count' })
  getAllAirBnbs() {
    return this.airbnbService.getAllAirBnbs();
  }
}
