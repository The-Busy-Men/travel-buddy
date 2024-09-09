import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/features/auth/auth.service';

@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    const { email, password } = credentials;

    try {
      const access_token = await this.authService.login(email, password);

      return { access_token: access_token };
    } catch (error) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
