import {
  Injectable,
  BadRequestException,
  HttpException,
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';
// import { Operator } from 'src/entities/Operators';
// import { OperatorDto } from '../dto/operatordto';
// import * as bcrypt from 'bcrypt';
// import { PatientDto } from '../dto/patientdto';
import { PatientRecord } from 'src/entities/Patients_record';
// import { Patient } from 'src/entities/Patients';
import { PatientRecordDto } from '../dto/patientsrecorddto';
import { Patient } from 'src/entities/Patients';
// import * as fs from 'fs';
// import * as path from 'path';

@Injectable()
export class PatientRecordService {
  constructor(
    @InjectModel(PatientRecord)
    private patientRecord: typeof PatientRecord,
    @InjectModel(Patient)
    private patient: typeof Patient,
  ) {}

  async addRecord(body: PatientRecordDto, operator_id: number) {
    try {
      const res = await this.patientRecord.create({ ...body, operator_id });
      return {
        res: res,
        message: 'Patients Record added succesfully ',
        status: 200,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async showRecords(hospital_id: number) {
    try {
      const patientRecord = (await this.patientRecord.sequelize.query(
        `SELECT
        PDD.pr_id AS id,
        PDD.patient_pic AS patient_pic,
        PDD.pr_complaint AS patient_complaint,
        PDD.pr_pic_id AS patient_pic_id,
        P.p_first_name AS first_name,
        P.p_last_name AS last_name,
        P.p_phone_no AS phone_no,
        P.p_email AS email,
        O.o_email AS OMAIL,
        O.o_phone_no AS Ophone,
        O.o_id AS OID,
        H.h_id AS HID
    FROM
        PatientRecords AS PDD
    JOIN
        Patients AS P ON PDD.patientId = P.p_id
    JOIN
        Operators AS O ON O.o_id = PDD.operator_id
    JOIN
        Hospitals AS H ON H.h_id = O.o_hospital_id
    WHERE
        H.h_id = ?
    `,
        {
          type: QueryTypes.SELECT,
          replacements: [hospital_id],
        },
      )) as {
        id: number;
        patient_pic: string;
        first_name: string;
        last_name: string;
        phone_no: string;
        patient_complaint: string;
        email: string;
        OMAIL: string;
        Ophone: string;
        OID: number;
        HID: number;
        patient_pic_id: string;
      }[];
      const patientRecordData = patientRecord.map((patient) => ({
        id: patient.id,
        patient_pic: patient.patient_pic,
        patient_first_name: patient.first_name,
        patient_last_name: patient.last_name,
        patient_email: patient.email,
        patientPic: patient.patient_pic,
        pr_complaint: patient.patient_complaint,
        operator_email: patient.OMAIL,
        operator_phone_no: patient.Ophone,
        patient_pic_id: patient.patient_pic_id,
      }));
      return patientRecordData;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async showRecord(id: string) {
    try {
      return await this.patientRecord.findOne({
        where: {
          pr_id: id,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async editRecord(id: any, body: PatientRecordDto, operator_id: number) {
    try {
      await this.patientRecord.update(
        { ...body },
        { where: { pr_id: id, operator_id } },
      );
      return {
        message: 'Records edited successfully',
        status: 200,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteRecord(id: any) {
    try {
      await this.patientRecord.destroy({ where: { pr_id: id } });
      return {
        message: 'Patients deleted successfully',
        status: 204,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  // Patients Record Logic

  // async addRecord(patient_record: PatientRecordDto, filepath: string) {
  //   try {
  //     const patient = await this.patient.findOne({
  //       where: {
  //         id: patient_record.patientId,
  //       },
  //     });

  //     if (!patient) {
  //       throw new HttpException(
  //         {
  //           statusCode: 404,
  //           error: 'Patient does not exist',
  //         },
  //         404,
  //       );
  //     }

  //     if (!filepath) {
  //       throw new HttpException(
  //         {
  //           statusCode: 404,
  //           error: 'File not uploaded',
  //         },
  //         404,
  //       );
  //     }
  //     const res = await this.patientRecord.create({
  //       ...patient_record,
  //       patient_pic: filepath,
  //     });
  //     return {
  //       message: 'Patients Record created successfully',
  //       status: 200,
  //       res: {
  //         res,
  //       },
  //     };
  //   } catch (e) {
  //     throw new BadRequestException(e.message);
  //   }
  // }

  // async editRecord(id: number, body: PatientRecordDto, filePath: string) {
  //   // return await this.patientRecord.update({ ...body }, { where: { id } });
  //   try {
  //     const pR = await this.patientRecord.findOne({ where: { pr_id: id } });
  //     // console.log(filePath);
  //     if (filePath) {
  //       const res = await this.patientRecord.update(
  //         { ...body, patient_pic: filePath },
  //         {
  //           where: {
  //             id,
  //           },
  //         },
  //       );
  //       return {
  //         message: 'Patients Record updated successfully',
  //         status: 200,
  //         res: {
  //           res,
  //         },
  //       };
  //     } else {
  //       const res = await this.patientRecord.update(
  //         { ...body, patient_pic: filePath },
  //         {
  //           where: {
  //             id,
  //           },
  //         },
  //       );
  //       this.clearImage(pR.patient_pic ? pR.patient_pic : null);
  //       return {
  //         message: 'Patients Record updated successfully without file',
  //         status: 200,
  //         res: {
  //           res,
  //         },
  //       };
  //     }
  //   } catch (e) {
  //     throw new BadRequestException(e.message);
  //   }
  // }

  // async deleteRecord(id: number) {
  //   try {
  //     const pR = await this.patientRecord.findOne({ where: { pr_id: id } });
  //     this.clearImage(pR.patient_pic);

  //     return {
  //       message: 'Patients Record deleted successfuly',
  //       status: 200,
  //     };
  //   } catch (e) {
  //     throw new BadRequestException(e.message);
  //   }
  // }

  // clearImage = (filePath) => {
  //   if (filePath === null) {
  //     return;
  //   }
  //   // console.log(process.cwd());
  //   fs.unlink(path.join(process.cwd(), filePath), (err) => console.log(err));
  // };
}
