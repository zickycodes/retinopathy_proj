import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Operator } from 'src/entities/Operators';
import { OperatorDto } from '../dto/operatordto';
import * as bcrypt from 'bcrypt';
// import { PatientDto } from '../dto/patientdto';
// import { PatientRecord } from 'src/entities/Patients_record';
// import { Patient } from 'src/entities/Patients';
// import { PatientRecordDto } from '../dto/patientsrecorddto';

@Injectable()
export class OperatorService {
  constructor(
    @InjectModel(Operator)
    private operator: typeof Operator,
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
      const { email } = operator;
      const opera = await this.operator.findOne({ where: { email } });
      if (opera) {
        throw new BadRequestException('Operator already exists');
      }
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
}
