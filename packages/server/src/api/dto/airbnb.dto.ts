import { IsBoolean, IsInt, IsString } from 'class-validator';
import { ObjectEntityDto } from './objectEntity.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class AirBnbDto extends ObjectEntityDto {
  @ApiProperty({ description: 'Name of the AirBnb Host', required: true })
  @IsString()
  hostName!: string;

  @ApiProperty({ description: 'Bedrooms in the AirBnb', required: true })
  @IsInt()
  bedrooms!: number;

  @ApiProperty({ description: 'Bathrooms in the AirBnb', required: true })
  @IsInt()
  bathrooms!: number;

  @ApiProperty({ description: 'Is the AirBnb shared?', required: true })
  @IsBoolean()
  isShared!: boolean;
}

export class UpdateAirBnbDto extends PartialType(AirBnbDto) {}
