import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { ObjectEntityDto } from './objectEntity.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PriceClass } from 'src/entities/utils/hotel.priceclass';

export class HotelDto extends ObjectEntityDto {
  @ApiProperty({ description: 'Number of Rooms in the Hotel', required: true })
  @IsOptional()
  @IsInt()
  numberRooms?: number;

  @ApiProperty({ description: 'Number of stars the Hotel has', required: true })
  @IsOptional()
  @IsInt()
  stars?: number;

  @ApiProperty({ description: 'Price Class the Hotel is in', required: true })
  @IsOptional()
  @IsEnum(PriceClass)
  priceClass?: PriceClass;
}

export class UpdateHotelDto extends PartialType(HotelDto) {}
