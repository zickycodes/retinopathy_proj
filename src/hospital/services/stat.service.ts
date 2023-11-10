import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';
// import { PatientDto } from '../dto/patientdto';
import { Patient } from 'src/entities/Patients';
import { Operator } from 'src/entities/Operators';

@Injectable()
export class StatService {
  constructor(
    @InjectModel(Patient)
    private patient: typeof Patient,
    @InjectModel(Operator)
    private operator: typeof Operator,
  ) {}

  async stat(hos_id: number) {
    try {
      const operatorCount = (await this.operator.sequelize.query(
        `SELECT COUNT(*) AS COUNT FROM Operators WHERE Operators.o_hospital_id = ?`,
        { replacements: [hos_id], type: QueryTypes.SELECT },
      )) as { COUNT: number }[];

      const patientCount = (await this.operator.sequelize.query(
        `SELECT COUNT(*) AS COUNT FROM Patients JOIN Operators ON Patients.p_operator_id = Operators.o_id WHERE Operators.o_hospital_id = ?`,
        { replacements: [hos_id], type: QueryTypes.SELECT },
      )) as { COUNT: number }[];

      const patientRecordsCount = (await this.operator.sequelize.query(
        `SELECT COUNT(*) AS COUNT FROM PatientRecords JOIN Operators ON PatientRecords.operator_id = Operators.o_id  WHERE Operators.o_hospital_id = ?`,
        { replacements: [hos_id], type: QueryTypes.SELECT },
      )) as { COUNT: number }[];

      return {
        status: 200,
        operatorCount: operatorCount.length === 0 ? 0 : operatorCount[0].COUNT,
        patientCount: patientCount.length === 0 ? 0 : patientCount[0].COUNT,
        patientRecords:
          patientRecordsCount.length === 0 ? 0 : patientRecordsCount[0].COUNT,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
