import { Module } from '@nestjs/common';
import { SuperAdminDocController } from './controller/admin.doctor.controller';
import { SuperAdminHosController } from './controller/admin.hospital.controller';
import { DoctorService } from './services/doctor.service';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from 'src/entities/Doctors';
import { HospitalService } from './services/hospital.service';
import { Hospital } from 'src/entities/Hospital';
@Module({
  imports: [SequelizeModule.forFeature([Doctor, Hospital])],
  controllers: [SuperAdminDocController, SuperAdminHosController],
  providers: [DoctorService, JwtService, HospitalService],
})
export class SuperAdminModule {}
