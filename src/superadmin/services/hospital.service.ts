import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Hospital } from 'src/entities/Hospital';
// import { Doctor } from 'src/entities/Doctors';
import { Hospitaldto } from '../dto/hospital.dto';
import { InjectModel } from '@nestjs/sequelize';
import { EditHospitaldto } from '../dto/edithospital.dto';
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
        phone_no: hospital.admin_contact_info,
        state: hospital.state,
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
      const { email } = hospital;
      const hos = this.hospital.findOne({ where: { email } });
      if (hos) {
        throw new BadRequestException('Hospital already exist');
      }
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
  async editHospital(id: string, body: EditHospitaldto) {
    return await this.hospital.update({ ...body }, { where: { id } });
  }

  async deleteHospital(id: number) {
    try {
      await this.hospital.destroy({ where: { id } });
      return {
        data: 'Hospital has been deleted successfully',
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
