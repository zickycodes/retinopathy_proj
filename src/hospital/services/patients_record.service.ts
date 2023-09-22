import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
// import { Operator } from 'src/entities/Operators';
// import { OperatorDto } from '../dto/operatordto';
// import * as bcrypt from 'bcrypt';
// import { PatientDto } from '../dto/patientdto';
import { PatientRecord } from 'src/entities/Patients_record';
// import { Patient } from 'src/entities/Patients';
import { PatientRecordDto } from '../dto/patientsrecorddto';

@Injectable()
export class PatientRecordService {
  constructor(
    @InjectModel(PatientRecord)
    private patientRecord: typeof PatientRecord,
  ) {}

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

  async editRecord(id: number, body: PatientRecordDto) {
    return await this.patientRecord.update({ ...body }, { where: { id } });
  }

  async deleteRecord(id: number) {
    return await this.patientRecord.destroy({ where: { id } });
  }
}
