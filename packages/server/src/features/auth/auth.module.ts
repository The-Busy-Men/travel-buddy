import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'; // Assuming you have JWT Strategy
import { PassportModule } from '@nestjs/passport';
import { getJwtKey } from 'src/core/configs/env.config';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: getJwtKey(), // Use environment variables for security
      signOptions: { expiresIn: '1h' }, // Set token expiration time
    }),
  ],
  providers: [AuthService, JwtStrategy], // Add JwtStrategy
  exports: [AuthService, JwtModule], // Export JwtModule to be used elsewhere
})
export class AuthModule {}
