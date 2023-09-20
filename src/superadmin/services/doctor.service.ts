import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Doctor } from 'src/entities/Doctors';
import { Doctordto } from '../dto/doctor.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor)
    private doctor: typeof Doctor,
  ) {}

  async showDoctors() {
    try {
      const doctors = await this.doctor.findAll();
      const doctorData = doctors.map((doctor) => ({
        id: doctor.id,
        first_name: doctor.first_name,
        email: doctor.email,
      }));
      return doctorData;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async showDoctor(id: string) {
    try {
      return await this.doctor.findOne({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async addDoctors(doctor: Doctordto) {
    try {
      const password = doctor.password;
      const hashedPassword = await bcrypt.hash(password, 10);
      const res = await this.doctor.create({
        ...doctor,
        password: hashedPassword,
      });
      return {
        message: 'Doctor created successfully',
        status: 200,
        res: {
          id: res.id,
          email: res.email,
        },
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async editDoctors(id: string, body: Doctordto) {
    return await this.doctor.update({ ...body }, { where: { id } });
  }

  async deleteDoctor(id: number) {
    return await this.doctor.destroy({ where: { id } });
  }
}
