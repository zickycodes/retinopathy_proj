import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Hospital } from 'src/entities/Hospital';
// import { Doctor } from 'src/entities/Doctors';
import { Hospitaldto } from '../dto/hospital.dto';
import { InjectModel } from '@nestjs/sequelize';
// import { retry } from 'rxjs';

@Injectable()
export class HospitalService {
  constructor(
    @InjectModel(Hospital)
    private hospital: typeof Hospital,
  ) {}

  async showHospitals() {
    try {
      const hospital = await this.hospital.findAll();
      const hospitalData = hospital.map((hospital) => ({
        id: hospital.id,
        name: hospital.name,
        email: hospital.email,
      }));
      return hospitalData;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async showHospital(id: string) {
    try {
      return await this.hospital.findOne({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async addHospital(hospital: Hospitaldto) {
    try {
      const password = hospital.password;
      const hashedPassword = await bcrypt.hash(password, 10);
      const res = await this.hospital.create({
        ...hospital,
        password: hashedPassword,
      });
      return {
        message: 'Hospital created successfully',
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
  async editHospital(id: string, body: Hospitaldto) {
    return await this.hospital.update({ ...body }, { where: { id } });
  }

  async deleteHospital(id: number) {
    return await this.hospital.destroy({ where: { id } });
  }
}
