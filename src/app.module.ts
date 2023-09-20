import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configuration from './config';
// import { User } from './entities/User';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { SuperAdmin } from './entities/SuperAdmin';
import { Operator } from './entities/Operators';
import { Doctor } from './entities/Doctors';
import { Hospital } from './entities/Hospital';
import { SuperAdminModule } from './superadmin/superadmin.module';
import { HospitalAdminModule } from './hospital/hospital.module';
// import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<any> => ({
        dialect: 'mysql',
        host: configService.get('MYSQL_Host'),
        port: parseInt(configService.get('MYSQL_PORT'), 10),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DB'),
        models: [SuperAdmin, Operator, Doctor, Hospital],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          secure: false,
          auth: {
            user: configService.get('Mailer_User'),
            pass: configService.get('Mailer_Pass'),
          },
        },
      }),
    }),
    EmailModule,
    AuthModule,
    SuperAdminModule,
    HospitalAdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
