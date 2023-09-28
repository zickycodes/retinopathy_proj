import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SequelizeModule } from '@nestjs/sequelize';
import configuration from './config';
// import { User } from './entities/User';
import { MailerModule } from '@nestjs-modules/mailer';
// import { EmailModule } from './email/email.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { SuperAdmin } from './entities/SuperAdmin';
import { Operator } from './entities/Operators';
import { Doctor } from './entities/Doctors';
import { Hospital } from './entities/Hospital';
import { SuperAdminModule } from './superadmin/superadmin.module';
import { HospitalAdminModule } from './hospital/hospital.module';
import { PatientDiagnosis } from './entities/Patient_diagnosis';
import { PatientRecord } from './entities/Patients_record';
import { Patient } from './entities/Patients';
import { PatientResult } from './entities/Patients_results';
import { DoctorModule } from './doctor/doctor.module';
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
        models: [
          SuperAdmin,
          Operator,
          Doctor,
          Hospital,
          PatientDiagnosis,
          PatientRecord,
          Patient,
          PatientResult,
        ],
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
    EventEmitterModule.forRoot(),
    EmailModule,
    AuthModule,
    SuperAdminModule,
    HospitalAdminModule,
    DoctorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
