import { Injectable, BadRequestException } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
// import { Operator } from 'src/entities/Operators';
// import { OperatorDto } from '../dto/operatordto';
import { PatientDiagnosis } from 'src/entities/Patient_diagnosis';
// import { PatientRecord } from 'src/entities/Patients_record';
import { PatientResult } from 'src/entities/Patients_results';
import { patientresultdto } from '../dto/diagnosis.dto';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(PatientDiagnosis)
    private patientDiagnosis: typeof PatientDiagnosis,
    @InjectModel(PatientResult)
    private patientResult: typeof PatientResult,
  ) {}

  async showNewPatients() {
    // try {}
    const patient = await this.patientResult.sequelize.query(
      'SELECT * FROM PatientRecords AS PPD LEFT JOIN PatientResults AS PR ON PPD.id = PR.patient_record_id WHERE PR.doctors_assessment IS NULL',
      {
        // replacements: [email],
        type: QueryTypes.SELECT,
      },
    );
  }

  async oneTimePatients(id) {
    try {
      const patientsThatFeauturedOnce =
        await this.patientResult.sequelize.query(
          `
        SELECT PR.patient_record_id, P.first_name, P.last_name, P.phone_no, P.email, COUNT(PR.patient_record_id) FROM PatientResults AS PR JOIN PatientRecords AS PPR ON PR.patient_record_id = PPR.id JOIN Patients AS P ON PPR.patientId = P.id GROUP BY PR.patient_record_id HAVING COUNT( PR.patient_record_id) = 1;
        `,
          {
            // replacements: [yourCountValue],
            type: QueryTypes.SELECT,
          },
        );

      const patientsDoctorHasSeen = await this.patientResult.sequelize.query(
        `SELECT PR.patient_record_id FROM PatientResults AS PR WHERE doctor_id = ? GROUP BY PR.patient_record_id`,
        {
          replacements: [id],
          type: QueryTypes.SELECT,
        },
      );

      // Process the results here
    } catch (e) {
      // Handle the error here or log it
      throw new BadRequestException(e.message);
    }
  }

  async inconclusivePatient(id) {
    try {
      const patientsThatFeauturedTwice =
        await this.patientResult.sequelize.query(
          `
          SELECT PR.patient_record_id, P.first_name, P.last_name, P.phone_no, P.email, COUNT(PR.patient_record_id) 
          FROM PatientResults AS PR 
          JOIN PatientRecords AS PPR 
          ON 
          PR.patient_record_id = PPR.id 
          JOIN Patients AS P 
          ON 
          PPR.patientId = P.id 
          GROUP BY PR.patient_record_id 
          HAVING 
          COUNT( PR.patient_record_id) = 2 AND SUM(PR.doctors_assessment) = 1;
        `,
          {
            // replacements: [id],
            type: QueryTypes.SELECT,
          },
        );
      const patientsDoctorHasSeen = await this.patientResult.sequelize.query(
        `SELECT PR.patient_record_id FROM PatientResults AS PR WHERE doctor_id = ? GROUP BY PR.patient_record_id`,
        {
          replacements: [id],
          type: QueryTypes.SELECT,
        },
      );
      // Process the results here
    } catch (error) {
      // Handle the error here or log it
      console.error('Error in InconclusivePatients:', error);
      throw error; // Rethrow the error if needed
    }
  }

  async givePatientDiagnosis(body: patientresultdto) {
    try {
      const findPatientCount = this.patientDiagnosis.sequelize.query(
        `SELECT COUNT(patient_record_id) FROM PatientResults AS PR WHERE patient_record_id = ? GROUP BY patient_record_id`,
        {
          replacements: [body.patient_record_id],
          type: QueryTypes.SELECT,
        },
      );
      // if(findPatientCount ==) {

      // }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
