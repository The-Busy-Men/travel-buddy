import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from 'src/features/user/user.service';
import { CreateUserDto } from '../dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('all')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
