import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID } from 'crypto';

export class ObjectEntityDto {
  @ApiProperty({ description: 'Name of the Object', required: true })
  @IsString()
  name!: string;

  @ApiProperty({ description: 'Description of the Object', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Owners of the Object', required: true })
  @IsArray()
  owners!: string[];

  @ApiProperty({ description: 'Is the Object active?', required: true })
  @IsBoolean()
  active!: boolean;

  @ApiProperty({
    description: 'Rating of the object',
    required: false,
  })
  @IsOptional()
  @IsInt()
  rating?: number;

  @ApiProperty({ description: 'Amenities of the Object', required: false })
  @IsOptional()
  @IsString()
  amenities?: string;

  @ApiProperty({
    description: 'AddressId of the Object',
    required: false,
    default: 'UUID',
  })
  @IsOptional()
  @IsUUID()
  addressId?: UUID;
}
