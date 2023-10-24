import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';
import { PatientDiagnosis } from 'src/entities/Patient_diagnosis';
@Injectable()
export class DiagnosisService {
  constructor(
    @InjectModel(PatientDiagnosis)
    private patientDiagnosis: typeof PatientDiagnosis,
  ) {}
  async showNegativeDiagnosedPatient(
    hosID: number,
    page: number,
    // pageSize: number,
  ) {
    try {
      const offset = (page - 1) * 15;
      const patient = await this.patientDiagnosis.sequelize.query(
        `SELECT P.p_first_name, P.p_last_name, PD.patient_record_id, PD.createdAt, PD.comments, PR.patient_pic, O.o_phone_no, O.o_first_name, O.o_last_name FROM PatientDiagnoses AS PD JOIN PatientRecords AS PR ON PD.patient_record_id = PR.pr_id JOIN Patients AS P ON P.p_id = PR.patientId JOIN Operators AS O ON PR.operator_id = O.o_id JOIN Hospitals AS H ON H.h_id = O.o_hospital_id WHERE H.h_id = ? AND PD.patient_results = "Negative" LIMIT 15 OFFSET ?;`,
        {
          replacements: [hosID, offset],
          type: QueryTypes.SELECT,
        },
      );
      return {
        status: 200,
        patients: patient.length !== 0 ? patient : patient,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async showPositiveDiagnosedPatient(hosID: number, page: number) {
    try {
      const offset = (page - 1) * 15;
      const patient = await this.patientDiagnosis.sequelize.query(
        `SELECT P.p_first_name, P.p_last_name, P.p_email, PD.patient_record_id, PD.createdAt, PD.comments, PR.patient_pic, O.o_phone_no, O.o_first_name, O.o_last_name FROM PatientDiagnoses AS PD JOIN PatientRecords AS PR ON PD.patient_record_id = PR.pr_id JOIN Patients AS P ON P.p_id = PR.patientId JOIN Operators AS O ON PR.operator_id = O.o_id JOIN Hospitals AS H ON H.h_id = O.o_hospital_id WHERE H.h_id = ? AND PD.patient_results = "Positive" LIMIT 15 OFFSET ?;`,
        {
          replacements: [hosID, offset],
          type: QueryTypes.SELECT,
        },
      );
      return {
        status: 200,
        patients: patient.length !== 0 ? patient : patient,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async showUndiagnosedPatients(hosID: number, page: number) {
    try {
      const offset = (page - 1) * 15;
      const patient = await this.patientDiagnosis.sequelize.query(
        `SELECT P.p_first_name, P.p_last_name, P.p_email, P.p_email, P.p_phone_no, PR.pr_id, PD.comments, PR.patient_pic, O.o_phone_no, O.o_first_name, O.o_last_name FROM PatientRecords AS PR LEFT JOIN PatientDiagnoses AS PD ON PR.pr_id = PD.patient_record_id JOIN Patients AS P ON PR.patientId = P.p_id JOIN Operators AS O ON PR.operator_id = O.o_id JOIN Hospitals AS H ON H.h_id = O.o_hospital_id WHERE PD.patient_results IS NULL AND H.h_id = ? LIMIT 15 OFFSET ?;`,
        {
          replacements: [hosID, offset],
          type: QueryTypes.SELECT,
        },
      );
      return {
        status: 200,
        patients: patient.length !== 0 ? patient : patient,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
