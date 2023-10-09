import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Hospital } from 'src/entities/Hospital';
// import { Doctor } from 'src/entities/Doctors';
import { Hospitaldto } from '../dto/hospital.dto';
import { InjectModel } from '@nestjs/sequelize';
import { EditHospitaldto } from '../dto/edithospital.dto';
import { EmailListener } from 'src/email/services/email.listener';
import { OperatorDto } from 'src/hospital/dto/operatordto';
import { OperatorService } from 'src/hospital/services/operator.service';
// import { EmailEvent } from 'src/email/events/emailevents';
// import { EventEmitter2 } from '@nestjs/event-emitter';
// import { retry } from 'rxjs';

@Injectable()
export class HospitalService {
  constructor(
    @InjectModel(Hospital)
    private hospital: typeof Hospital,
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
    try {
      const { h_email } = hospital;
      const hos = await this.hospital.findOne({ where: { h_email } });
      // console.log('hos', hos);
      if (hos) {
        throw new BadRequestException('Hospital already exists');
      }
      const password = hospital.h_password;
      const hashedPassword = await bcrypt.hash(password, 10);
      const res = await this.hospital.create({
        ...hospital,
        h_password: hashedPassword,
      });
      await this.operatorService.addOperators({
        ...operator,
        o_hospital_id: res.h_id,
      });
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
}
