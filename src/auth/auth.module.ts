import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { Userservice } from './services/user.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SequelizeModule } from '@nestjs/sequelize';
import { SuperAdmin } from 'src/entities/SuperAdmin';
import { JwtModule } from '@nestjs/jwt';
import { Operator } from 'src/entities/Operators';
import { Hospital } from 'src/entities/Hospital';
import { Doctor } from 'src/entities/Doctors';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    SequelizeModule.forFeature([SuperAdmin, Operator, Hospital, Doctor]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_Secret'),
        signOptions: { expiresIn: '8760h' },
      }),
    }),
  ],
  providers: [AuthService, Userservice, EventEmitter2],
  controllers: [AuthController],
})
export class AuthModule {}
