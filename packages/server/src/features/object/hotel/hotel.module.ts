import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelController } from 'src/api/controllers/hotel.controller';
import { HotelService } from './hotel.service';
import { Hotel } from 'src/entities/hotel.entity';
import { AuthModule } from 'src/features/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel]), AuthModule],
  controllers: [HotelController],
  providers: [HotelService],
  exports: [HotelService],
})
export class HotelModule {}
