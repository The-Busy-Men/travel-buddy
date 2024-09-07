import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AddressType } from 'src/entities/utils/address.type';

export class AddressDto {
  @ApiProperty({ description: 'Name of the Street', required: true })
  @IsString()
  streetAddress!: string;

  @ApiProperty({ description: 'City where Address is in', required: true })
  @IsString()
  city!: string;

  @ApiProperty({ description: 'State the Address is in', required: true })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ description: 'Postal Code of the Address', required: true })
  @IsString()
  postalCode!: string;

  @ApiProperty({ description: 'Country of the Address', required: true })
  @IsString()
  country!: string;

  @ApiProperty({
    description: 'Second Address line for extra information',
    required: true,
  })
  @IsOptional()
  @IsString()
  addressLine2?: string;

  @ApiProperty({ description: 'Type of the Address', required: true })
  @IsArray()
  addressType!: AddressType[];
}

export class UpdateAddressDto extends PartialType(AddressDto) {}
