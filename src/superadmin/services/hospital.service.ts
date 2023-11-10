import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Hospital } from 'src/entities/Hospital';
// import { Doctor } from 'src/entities/Doctors';
import { Hospitaldto } from '../dto/hospital.dto';
import { InjectModel } from '@nestjs/sequelize';
import { EditHospitaldto } from '../dto/edithospital.dto';
import { EmailListener } from 'src/email/services/email.listener';
// import { OperatorDto } from 'src/hospital/dto/operatordto';
import { OperatorService } from 'src/hospital/services/operator.service';
import { QueryTypes, Transaction } from 'sequelize';
import { Doctor } from 'src/entities/Doctors';
import { Operator } from 'src/entities/Operators';
// import { EmailEvent } from 'src/email/events/emailevents';
// import { EventEmitter2 } from '@nestjs/event-emitter';
// import { retry } from 'rxjs';

@Injectable()
export class HospitalService {
  constructor(
    @InjectModel(Hospital)
    private hospital: typeof Hospital,
    @InjectModel(Doctor)
    private doctor: typeof Doctor,
    @InjectModel(Operator)
    private operator: typeof Operator,
    private emailListener: EmailListener,
    private operatorService: OperatorService,
  ) {}

  async showHospitals() {
    try {
      const hospital = await this.hospital.findAll();
      const hospitalData = hospital.map((hospital) => ({
        id: hospital.h_id,
        name: hospital.h_name,
        email: hospital.h_email,
        phone_no: hospital.h_admin_contact_info,
        state: hospital.h_state,
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
          h_id: id,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async addHospital(hospital: Hospitaldto, operator: any) {
    const transaction: Transaction =
      await this.hospital.sequelize.transaction();
    try {
      const { h_email } = hospital;
      const hos = await this.hospital.findOne({
        where: { h_email },
        transaction,
      });
      if (hos) {
        throw new BadRequestException('Hospital already exists');
      }
      const password = hospital.h_password;
      const hashedPassword = await bcrypt.hash(password, 10);
      const res = await this.hospital.create(
        {
          ...hospital,
          h_password: hashedPassword,
        },
        { transaction },
      );
      await this.operatorService.addOperators(
        {
          ...operator,
          o_hospital_id: res.h_id,
        },
        transaction,
      );

      await transaction.commit();

      // this.eventEmitter.emit(
      //   'welcome-email-hospital',
      //   new EmailEvent(email, password),
      // );
      this.emailListener.handleSignupEventHos(h_email, password);
      return {
        message: 'Hospital created successfully',
        status: 200,
        res: {
          id: res.h_id,
          email: res.h_email,
        },
      };
    } catch (e) {
      await transaction.rollback();
      throw new BadRequestException(e.message);
    }
  }
  async editHospital(id: string, body: EditHospitaldto) {
    return await this.hospital.update({ ...body }, { where: { h_id: id } });
  }

  async deleteHospital(id: number) {
    try {
      await this.hospital.destroy({ where: { h_id: id } });
      return {
        data: 'Hospital has been deleted successfully',
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async showDiagnosis(id: number) {
    try {
      const data = await this.hospital.sequelize.query(
        `SELECT PD.patient_results  AS results, COUNT(PD.patient_results) AS COUNT FROM PatientDiagnoses AS PD JOIN PatientRecords AS PR ON PD.patient_record_id = PR.pr_id JOIN Operators AS O ON O.o_id = PR.operator_id JOIN Hospitals AS H ON H.h_id = O.o_hospital_id WHERE H.h_id = ? GROUP BY PD.patient_results`,
        { replacements: [id], type: QueryTypes.SELECT },
      );
      return {
        data: data.length !== 0 ? data : null,
        status: 200,
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async stats() {
    try {
      const doctorsCount = await this.doctor.count();
      const hospitalsCount = await this.hospital.count();
      const operatorsCount = await this.operator.count();
      return {
        status: 200,
        doctorsCount,
        hospitalsCount,
        operatorsCount,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async averageWaitingTime(month: number, year: number) {
    try {
      const averageWaitingTime = await this.hospital.sequelize.query(
        `SELECT 
      MONTH(PatientRecords.updatedAt) as 'Month', 
      YEAR(PatientRecords.updatedAt) as 'Year',
      AVG((DATEDIFF(PatientRecords.updatedAt, PatientDiagnoses.createdAt) * 24)) as 'AverageTimeDifferenceInHours'
  FROM 
      PatientRecords
  INNER JOIN 
      PatientDiagnoses ON PatientRecords.pr_id = PatientDiagnoses.patient_record_id
  WHERE 
      MONTH(PatientRecords.updatedAt) = ? AND 
      YEAR(PatientRecords.updatedAt) = ?
  GROUP BY 
      Month, Year;`,
        {
          replacements: [month, year],
          type: QueryTypes.SELECT,
        },
      );
      return {
        status: 200,
        averageWaitingTime:
          averageWaitingTime.length === 0
            ? 'No records'
            : averageWaitingTime[0],
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
