import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Operator } from 'src/entities/Operators';
import { OperatorDto } from '../dto/operatordto';
import * as bcrypt from 'bcrypt';
import { PatientDto } from '../dto/patientdto';
import { PatientRecord } from 'src/entities/Patients_record';
import { Patient } from 'src/entities/Patients';
import { PatientRecordDto } from '../dto/patientsrecorddto';

@Injectable()
export class HospitalAdminService {
  constructor(
    @InjectModel(Operator)
    private operator: typeof Operator,
    @InjectModel(Patient)
    private patient: typeof Patient,
    @InjectModel(PatientRecord)
    private patientRecord: typeof PatientRecord,
  ) {}

  // Operators Logic
  async showOperators() {
    try {
      const operator = await this.operator.findAll();
      const operatorData = operator.map((operator) => ({
        id: operator.id,
        first_name: operator.first_name,
        email: operator.email,
      }));
      return operatorData;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async showOperator(id: string) {
    try {
      return await this.operator.findOne({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async addOperators(operator: OperatorDto) {
    try {
      const password = operator.password;
      const hashedPassword = await bcrypt.hash(password, 10);
      const res = await this.operator.create({
        ...operator,
        password: hashedPassword,
      });
      return {
        message: 'Operator created successfully',
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

  async editOperators(id: string, body: OperatorDto) {
    return await this.operator.update({ ...body }, { where: { id } });
  }

  async deleteOperator(id: number) {
    return await this.operator.destroy({ where: { id } });
  }

  // Patients Logic

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

  // Patients Record Logic
  async addRecord(patient_record: PatientRecordDto) {
    try {
      // const password = operator.password;
      // const hashedPassword = await bcrypt.hash(password, 10);
      const res = await this.patientRecord.create({
        ...patient_record,
      });
      return {
        message: 'Patients Record created successfully',
        status: 200,
        res: {
          id: res.id,
          // email: res.email,
        },
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async editRecord(id: number) {
    return await this.patientRecord.destroy({ where: { id } });
  }

  async deleteRecord(id: number) {
    return await this.patientRecord.destroy({ where: { id } });
  }
}
