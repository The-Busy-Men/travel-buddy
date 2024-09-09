import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsArray,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UserRoles } from 'src/entities/utils/role.types';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password for the user',
    example: 'StrongPassword123!',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'First name of the user', example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Address UUID (optional)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  addressId?: string;

  @ApiProperty({
    description: 'Group UUIDs that the user belongs to (optional)',
    example: ['987e6543-e21b-11d3-a789-426614174111'],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  groupIds?: string[];

  @ApiProperty({ description: 'Is the user active?', example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserRolesDto {
  @IsArray()
  @IsEnum(UserRoles, { each: true })
  @IsOptional()
  roles?: UserRoles[];
}
