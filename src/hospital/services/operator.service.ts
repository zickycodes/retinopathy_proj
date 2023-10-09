import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Operator } from 'src/entities/Operators';
import { OperatorDto } from '../dto/operatordto';
import { QueryTypes } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { EditOperatorDto } from '../dto/editoperatordto';
import { EmailListener } from 'src/email/services/email.listener';
// import { PatientDto } from '../dto/patientdto';
// import { PatientRecord } from 'src/entities/Patients_record';
// import { Patient } from 'src/entities/Patients';
// import { PatientRecordDto } from '../dto/patientsrecorddto';

@Injectable()
export class OperatorService {
  constructor(
    @InjectModel(Operator)
    private operator: typeof Operator,
    private emailListener: EmailListener,
  ) {}

  // Operators Logic
  async showOperators(hospital_id: number) {
    try {
      const operator = (await this.operator.sequelize.query(
        `SELECT O.o_id AS op_id, O.o_email AS email, O.o_first_name AS first_name, O.o_last_name AS last_name, O.o_phone_no AS phone_no FROM Hospitals AS H JOIN Operators AS O ON H.h_id = O.o_hospital_id WHERE H.h_id = ?`,
        { replacements: [hospital_id], type: QueryTypes.SELECT },
      )) as {
        op_id: number;
        first_name: number;
        last_name: string;
        phone_no: string;
        name: string;
        email: string;
      }[];
      const operatorData = operator.map((operator) => ({
        id: operator.op_id,
        first_name: operator.first_name,
        last_name: operator.last_name,
        phone_no: operator.phone_no,
        email: operator.email,
      }));
      return operatorData;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async showOperator(id: number) {
    try {
      const {
        o_email,
        o_id,
        o_first_name,
        o_last_name,
        o_phone_no,
        o_hospital_id,
      } = await this.operator.findOne({
        where: {
          o_id: id,
        },
      });
      // console.log(o_id, o_first_name, o_last_name);
      return {
        // o_id: operator ? operator.o_id : null,
        // o_first_name: operator ? operator.o_first_name : null,
        // o_last_name: operator ? operator.o_last_name : null,
        // o_phone_no: operator ? operator.o_phone_no : null,
        o_email,
        o_first_name,
        o_last_name,
        o_phone_no,
        o_id,
        o_hospital_id,
        status: 200,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async addOperators(operator: OperatorDto) {
    try {
      const { o_email } = operator;
      const opera = await this.operator.findOne({ where: { o_email } });
      if (opera) {
        throw new BadRequestException('Operator already exists');
      }
      const password = operator.o_password;
      const hashedPassword = await bcrypt.hash(password, 10);
      const res = await this.operator.create({
        ...operator,
        o_password: hashedPassword,
      });
      await this.emailListener.handleOperator(o_email, password);
      return {
        message: 'Operator created successfully',
        status: 200,
        res: {
          id: res.o_id,
          email: res.o_email,
        },
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async editOperators(id: number, body: EditOperatorDto) {
    try {
      await this.operator.update({ ...body }, { where: { o_id: id } });
      return {
        message: `Operator's details updated successfully`,
        status: 200,
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async deleteOperator(id: number) {
    try {
      await this.operator.destroy({ where: { o_id: id } });
      return {
        message: `Operator deleted successfully`,
        status: 204,
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
