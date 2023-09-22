import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PatientDto } from '../dto/patientdto';
import { Patient } from 'src/entities/Patients';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient)
    private patient: typeof Patient,
  ) {}

  async showPatients() {
    try {
      const patient = await this.patient.findAll();
      const patientData = patient.map((patient) => ({
        id: patient.id,
        first_name: patient.first_name,
        email: patient.email,
      }));
      return patientData;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async showPatient(id: string) {
    try {
      return await this.patient.findOne({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async addPatients(patient: PatientDto) {
    try {
      // const password = operator.password;
      // const hashedPassword = await bcrypt.hash(password, 10);
      const { email } = patient;
      const pt = this.patient.findOne({ where: { email } });
      if (pt) {
        throw new BadRequestException('Operator already exists');
      }
      const res = await this.patient.create({
        ...patient,
      });
      return {
        message: 'Patients created successfully',
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

  async editPatient(id: string, body: PatientDto) {
    return await this.patient.update({ ...body }, { where: { id } });
  }

  async deletePatient(id: number) {
    return await this.patient.destroy({ where: { id } });
  }
}
