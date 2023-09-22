import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { MulterModule } from '@nestjs/platform-express';
import { Patient } from 'src/entities/Patients';
import { PatientRecord } from 'src/entities/Patients_record';
import { Operator } from 'src/entities/Operators';
import { HospitalController } from './controller/hospitaladmin.controller';
import { OperatorService } from './services/operator.service';
import { PatientRecordService } from './services/patients_record.service';
import { PatientService } from './services/patients.service';

@Module({
  imports: [
    MulterModule.register({
      // dest: './uploads',
    }),
    SequelizeModule.forFeature([Patient, PatientRecord, Operator]),
  ],
  controllers: [HospitalController],
  providers: [
    JwtService,
    OperatorService,
    PatientRecordService,
    PatientService,
  ],
})
export class HospitalAdminModule {}
