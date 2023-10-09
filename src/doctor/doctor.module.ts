import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DoctorSService } from './services/doctor.service';
import { DoctorController } from './controllers/doctor.controller';
import { PatientDiagnosis } from 'src/entities/Patient_diagnosis';
import { PatientResult } from 'src/entities/Patients_results';
import { DiagnosisInterceptor } from 'src/interceptors/diagnosis.interceptor';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [SequelizeModule.forFeature([PatientDiagnosis, PatientResult])],
  providers: [DoctorSService, DiagnosisInterceptor, JwtService],
  controllers: [DoctorController],
})
export class DoctorModule {}
