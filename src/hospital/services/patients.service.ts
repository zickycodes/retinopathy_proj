import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';
import { PatientDto } from '../dto/patientdto';
import { Patient } from 'src/entities/Patients';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient)
    private patient: typeof Patient,
  ) {}

  async showPatients(hos_id: number) {
    try {
      const patient = (await this.patient.sequelize.query(
        `SELECT P.p_id AS id, P.p_first_name AS first_name, P.p_last_name AS last_name, P.p_phone_no AS phone_no, P.p_email AS email FROM Patients AS P JOIN Operators AS O ON O.o_id = P.p_operator_id JOIN Hospitals AS H ON H.h_id = O.o_hospital_id WHERE H.h_id = ?`,
        {
          replacements: [hos_id],
          type: QueryTypes.SELECT,
        },
      )) as {
        id: number;
        first_name: string;
        last_name: string;
        phone_no: string;
        email: string;
      }[];
      const patientData = patient.map((patient) => ({
        id: patient.id,
        first_name: patient.first_name,
        last_name: patient.last_name,
        phone_no: patient.phone_no,
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
          p_id: id,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async addPatients(patient: PatientDto, p_operator_id: number) {
    try {
      // const password = operator.password;
      // const hashedPassword = await bcrypt.hash(password, 10);
      const { p_email } = patient;
      const pt = await this.patient.findOne({ where: { p_email } });
      // console.log('pt', pt);
      if (pt) {
        throw new BadRequestException('Patients already exists');
      }
      // console.log(patient);
      const res = await this.patient.create({
        ...patient,
        p_operator_id,
      });
      return {
        message: 'Patients created successfully',
        status: 200,
        res: {
          id: res.p_id,
          email: res.p_email,
        },
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async editPatient(id: string, body: PatientDto) {
    try {
      await this.patient.update({ ...body }, { where: { p_id: id } });
      return {
        message: 'Patients updated successfully',
        status: 200,
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async deletePatient(id: number) {
    try {
      await this.patient.destroy({ where: { p_id: id } });
      return {
        message: 'Patients deleted successfully',
        status: 204,
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
