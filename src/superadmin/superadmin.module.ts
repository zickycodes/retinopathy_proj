import { Module } from '@nestjs/common';
import { SuperAdminDocController } from './controller/admin.doctor.controller';
import { SuperAdminHosController } from './controller/admin.hospital.controller';
import { DoctorService } from './services/doctor.service';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from 'src/entities/Doctors';
import { HospitalService } from './services/hospital.service';
import { Hospital } from 'src/entities/Hospital';
// import { EventEmitter2 } from '@nestjs/event-emitter';
import { EmailListener } from 'src/email/services/email.listener';
import { OperatorService } from 'src/hospital/services/operator.service';
import { Operator } from 'src/entities/Operators';
@Module({
  imports: [SequelizeModule.forFeature([Doctor, Hospital, Operator])],
  controllers: [SuperAdminDocController, SuperAdminHosController],
  providers: [
    DoctorService,
    JwtService,
    HospitalService,
    EmailListener,
    OperatorService,
  ],
})
export class SuperAdminModule {}
