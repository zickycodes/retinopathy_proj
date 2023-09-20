import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from 'src/entities/Patients';
import { PatientRecord } from 'src/entities/Patients_record';
import { Operator } from 'src/entities/Operators';

@Module({
  imports: [SequelizeModule.forFeature([Patient, PatientRecord, Operator])],
  controllers: [],
  providers: [JwtService],
})
export class HospitalAdminModule {}
