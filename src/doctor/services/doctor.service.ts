import { Injectable, BadRequestException } from '@nestjs/common';
import { QueryTypes, Transaction } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
// import { Operator } from 'src/entities/Operators';
// import { OperatorDto } from '../dto/operatordto';
import { PatientDiagnosis } from 'src/entities/Patient_diagnosis';
// import { PatientRecord } from 'src/entities/Patients_record';
import { PatientResult } from 'src/entities/Patients_results';
import { patientresultdto } from '../dto/patientresDto';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorSService {
  constructor(
    @InjectModel(PatientDiagnosis)
    private patientDiagnosis: typeof PatientDiagnosis,
    @InjectModel(PatientResult)
    private patientResult: typeof PatientResult,
  ) {}

  async showNewPatients() {
    // try {}
    try {
      const patient = await this.patientResult.sequelize.query(
        `SELECT 
        PPD.pr_id as patient_record_id, 
        PPD.pr_complaint as patient_complaint,
        PPD.patient_pic as patient_pic,
        P.p_first_name as first_name, 
        P.p_last_name as last_name, 
        P.p_phone_no as phone_no, 
        P.p_email as email, 
        O.o_first_name as operator_name,
        O.o_last_name as operator_last_name,
        O.o_email as operator_email,
        O.o_phone_no as operator_phone_no,
        H.h_name as hospital_name 
        FROM PatientRecords AS PPD 
        JOIN Patients AS P 
        ON P.p_id = PPD.patientId 
        JOIN Operators AS O
        ON O.o_id = PPD.operator_id
        JOIN Hospitals AS H
        ON H.h_id = O.o_hospital_id
        LEFT JOIN PatientResults AS PR 
        ON PPD.pr_id = PR.patient_record_id 
        WHERE PR.doctors_assessment IS NULL`,
        {
          // replacements: [email],
          type: QueryTypes.SELECT,
        },
      );

      return {
        message: 'Successful',
        status: 200,
        patient,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    // console.log(patient);
  }

  async oneTimePatients(doctor_id: number) {
    try {
      const patientsThatFeauturedOnce =
        (await this.patientResult.sequelize.query(
          `
        SELECT   
        PR.patient_record_id as patient_record_id, 
        PDD.pr_complaint as patient_complaint,
        PDD.patient_pic as patient_pic,
        P.p_first_name as first_name, 
        P.p_last_name as last_name, 
        P.p_phone_no as phone_no, 
        P.p_email as email, 
        O.o_first_name as operator_name,
        O.o_last_name as operator_last_name,
        O.o_email as operator_email,
        O.o_phone_no as operator_phone_no,
        H.h_name as hospital_name, 
        COUNT(PR.patient_record_id) 
        FROM PatientResults AS PR 
        JOIN PatientRecords AS PDD 
        ON PR.patient_record_id = PDD.pr_id
        JOIN Patients AS P 
        ON PDD.patientId = P.p_id 
        JOIN Operators AS O
        ON O.o_id = PDD.operator_id
        JOIN Hospitals AS H 
        ON H.h_id = O.o_hospital_id
        GROUP BY PR.patient_record_id HAVING COUNT( PR.patient_record_id) = 1;
        `,
          {
            // replacements: [yourCountValue],
            type: QueryTypes.SELECT,
          },
        )) as {
          patient_record_id: number;
          p_first_name: string;
          p_last_name: string;
          p_phone_no: string;
          p_email: string;
          COUNT_PR_patient_record_id: number; // Use a different name since it has special characters
        }[];
      // console.log('p1', patientsThatFeauturedOnce);
      const patientsDoctorHasSeen = (await this.patientResult.sequelize.query(
        `SELECT PR.patient_record_id FROM PatientResults AS PR WHERE doctor_id = ? GROUP BY PR.patient_record_id`,
        {
          replacements: [doctor_id], // Provide the value for the placeholder
          type: QueryTypes.SELECT,
        },
      )) as { patient_record_id: number }[];
      // console.log('ph', patientsDoctorHasSeen);

      const patientRecordIdsToRemove = new Set(
        patientsDoctorHasSeen.map((item) => item.patient_record_id),
      );

      // Filter the second array to remove objects with matching patient_record_id.
      const filteredArray = patientsThatFeauturedOnce.filter(
        (item) => !patientRecordIdsToRemove.has(item.patient_record_id),
      );

      return {
        patientsRecords: filteredArray,
        status: 200,
      };

      // Process the results here
    } catch (e) {
      // Handle the error here or log it
      throw new BadRequestException(e.message);
    }
  }

  async inconclusivePatient(doctor_id: number) {
    try {
      const patientsThatFeauturedTwice =
        (await this.patientResult.sequelize.query(
          `
      SELECT  
      PR.patient_record_id as patient_record_id, 
      PDD.pr_complaint as patient_complaint,
      PDD.patient_pic as patient_pic,
      P.p_first_name as first_name, 
      P.p_last_name as last_name, 
      P.p_phone_no as phone_no, 
      P.p_email as email, 
      O.o_first_name as operator_name,
      O.o_last_name as operator_last_name,
      O.o_email as operator_email,
      O.o_phone_no as operator_phone_no,
      H.h_name as hospital_name, 
      COUNT(PR.patient_record_id) 
      FROM PatientResults AS PR 
      JOIN PatientRecords AS PDD 
      ON PR.patient_record_id = PDD.pr_id
      JOIN Patients AS P 
      ON PDD.patientId = P.p_id 
      JOIN Operators AS O
      ON O.o_id = PDD.operator_id
      JOIN Hospitals AS H 
      ON H.h_id = O.o_hospital_id
      GROUP BY PR.patient_record_id
      HAVING
      COUNT( PR.patient_record_id) = 2 AND SUM(PR.doctors_assessment) = 1;
      `,
          {
            // replacements: [yourCountValue],
            type: QueryTypes.SELECT,
          },
        )) as {
          patient_record_id: number;
          p_first_name: string;
          p_last_name: string;
          p_phone_no: string;
          p_email: string;
          COUNT_PR_patient_record_id: number; // Use a different name since it has special characters
        }[];
      const patientsDoctorHasSeen = (await this.patientResult.sequelize.query(
        `SELECT PR.patient_record_id FROM PatientResults AS PR WHERE doctor_id = ? GROUP BY PR.patient_record_id`,
        {
          replacements: [doctor_id],
          type: QueryTypes.SELECT,
        },
      )) as { patient_record_id: number }[];

      const patientRecordIdsToRemove = new Set(
        patientsDoctorHasSeen.map((item) => item.patient_record_id),
      );
      // console.log('PDHS', patientsDoctorHasSeen);
      // console.log('ptft', patientsThatFeauturedTwice);
      const filteredArray = patientsThatFeauturedTwice.filter(
        (item) => !patientRecordIdsToRemove.has(item.patient_record_id),
      );
      // Process the results here
      return {
        patientRecords: filteredArray,
        status: 200,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async givePatientDiagnosis(body: patientresultdto, doctor_id: number) {
    const transaction: Transaction =
      await this.patientResult.sequelize.transaction();
    try {
      const findPatientCount = (await this.patientDiagnosis.sequelize.query(
        `SELECT COUNT(patient_record_id) AS COUNT, SUM(doctors_assessment) AS SUM FROM PatientResults AS PR WHERE patient_record_id = ? GROUP BY patient_record_id`,
        {
          replacements: [body.patient_record_id],
          type: QueryTypes.SELECT,
        },
      )) as {
        COUNT: number;
        SUM: string;
      }[];

      const SUM =
        findPatientCount.length === 0 ? 0 : parseInt(findPatientCount[0].SUM);
      const COUNT =
        findPatientCount.length === 0 ? 0 : findPatientCount[0].COUNT;
      // console.log(findPatientCount[0].COUNT === 2 && SUM === 1);
      if (COUNT === 0) {
        await this.patientResult.create({ ...body, doctor_id });
        return {
          message: 'Patient Results Added successfully',
          status: 200,
        };
      }
      // Patient With single diagnosis
      if (COUNT === 1) {
        const sum = SUM + body.doctors_assessment;
        if (sum === 0) {
          await this.patientResult.create(
            { ...body, doctor_id },
            { transaction },
          );
          await this.patientDiagnosis.create(
            {
              patient_record_id: body.patient_record_id,
              patient_results: 'Negative',
              comments: body.doctor_comment,
              doctor_id,
            },
            { transaction },
          );
          await transaction.commit();
          return {
            message: 'Patient Results Added successfully',
            status: 200,
            diagnosis: 'Negative',
          };
        }
        if (sum === 2) {
          await this.patientResult.create(
            { ...body, doctor_id },
            { transaction },
          );
          await this.patientDiagnosis.create(
            {
              patient_record_id: body.patient_record_id,
              patient_results: 'Positive',
              comments: body.doctor_comment,
              doctor_id,
            },
            { transaction },
          );
          await transaction.commit();
          return {
            message: 'Patient Results Added successfully',
            status: 200,
            diagnosis: 'Postive',
          };
        }
        await this.patientResult.create(
          { ...body, doctor_id },
          { transaction },
        );
        return {
          message: 'Patient Results Added successfully',
          status: 200,
          diagnosis: 'Inconclusive',
        };
      }
      // Patient with inconclusive diagnosis
      if (COUNT === 2 && SUM === 1) {
        // console.log('Hey');
        const sum = SUM + body.doctors_assessment;
        // console.log('s', sum);
        if (sum === 1) {
          await this.patientResult.create(
            { ...body, doctor_id },
            { transaction },
          );
          await this.patientDiagnosis.create(
            {
              patient_record_id: body.patient_record_id,
              patient_results: 'Negative',
              comments: body.doctor_comment,
              doctor_id,
            },
            { transaction },
          );
          await transaction.commit();
          return {
            message: 'Patient Results Added successfully',
            status: 200,
            diagnosis: 'Negative',
          };
        }
        if (sum === 2) {
          await this.patientResult.create(
            { ...body, doctor_id },
            { transaction },
          );
          await this.patientDiagnosis.create(
            {
              patient_record_id: body.patient_record_id,
              patient_results: 'Positive',
              comments: body.doctor_comment,
              doctor_id,
            },
            { transaction },
          );
          await transaction.commit();
          return {
            message: 'Patient Results Added successfully',
            status: 200,
            diagnosis: 'Positive',
          };
        }
      }
    } catch (e) {
      await transaction.rollback();
      throw new BadRequestException(e.message);
    }
  }
}
