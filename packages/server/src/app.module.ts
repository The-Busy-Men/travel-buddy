import { Module } from '@nestjs/common';
import { AppController } from './api/controllers/app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import {
  getDBHost,
  getDBName,
  getDBPassword,
  getDBPort,
  getDBUser,
} from './core/configs/env.config';
import { Hotel } from './entities/hotel.entity';
import { AirBnb } from './entities/airbnb.entity';
import { Address } from './entities/address.entity';
import { AirBnbModule } from './features/object/airbnb/airbnb.module';
import { AddressController } from './api/controllers/address.controller';
import { AddressModule } from './features/address/address.module';
import { HotelModule } from './features/object/hotel/hotel.module';
import { HotelController } from './api/controllers/hotel.controller';
import { User } from './entities/user.entity';
import { UserModule } from './features/user/user.module';
import { UserController } from './api/controllers/user.controller';
import { Group } from './entities/group.entity';
import { AuthModule } from './features/auth/auth.module';
import { AuthController } from './api/controllers/auth.controller';
import { GroupModule } from './features/group/group.module';
import { GroupController } from './api/controllers/group.controller';
import { UserGroupRole } from './entities/usergrouprole.entity';
import { PendingApproval } from './entities/approval.entity';
import { ApprovalModule } from './features/object/approvals/approvals.module';
import { ApprovalsController } from './api/controllers/approvals.controller';

console.log({
  port: getDBPort(),
  username: getDBUser(),
  password: getDBPassword(),
  database: getDBName(),
});

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: getDBHost(),
      port: getDBPort(),
      username: getDBUser(),
      password: getDBPassword(),
      database: getDBName(),
      synchronize: true,
      entities: [
        Test,
        Hotel,
        AirBnb,
        Address,
        User,
        Group,
        UserGroupRole,
        PendingApproval,
      ],
    }),
    TypeOrmModule.forFeature([
      Test,
      Hotel,
      AirBnb,
      Address,
      User,
      Group,
      UserGroupRole,
      PendingApproval,
    ]),
    AirBnbModule,
    AddressModule,
    HotelModule,
    UserModule,
    AuthModule,
    GroupModule,
    ApprovalModule,
  ],
  controllers: [
    AppController,
    AddressController,
    HotelController,
    UserController,
    AuthController,
    GroupController,
    ApprovalsController,
  ],
  providers: [
    AppService,
    AirBnbModule,
    AddressModule,
    HotelModule,
    UserModule,
    AuthModule,
    GroupModule,
    ApprovalModule,
  ],
})
export class AppModule {}
