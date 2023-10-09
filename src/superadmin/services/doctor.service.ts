import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Doctor } from 'src/entities/Doctors';
import { Doctordto } from '../dto/doctor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { EditDoctordto } from '../dto/editdoctor..dto';
// import { EmailEvent } from 'src/email/events/emailevents';
import { EmailListener } from 'src/email/services/email.listener';
// import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor)
    private doctor: typeof Doctor,
    private emailListener: EmailListener,
  ) {}

  async showDoctors() {
    try {
      const doctors = await this.doctor.findAll();
      const doctorData = doctors.map((doctor) => ({
        id: doctor.d_id,
        first_name: doctor.d_first_name,
        last_name: doctor.d_last_name,
        phone_no: doctor.d_phone_no,
        address: doctor.d_address,
        email: doctor.d_email,
      }));
      return doctorData;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async showDoctor(id: string) {
    try {
      return await this.doctor.findOne({
        where: {
          d_id: id,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async addDoctors(doctor: Doctordto) {
    try {
      const { d_email } = doctor;
      const doc = await this.doctor.findOne({ where: { d_email } });
      // console.log(doc);
      if (doc) {
        throw new BadRequestException('Doctor already exist');
      }
      const password = doctor.d_password;
      const hashedPassword = await bcrypt.hash(password, 10);
      const res = await this.doctor.create({
        ...doctor,
        d_password: hashedPassword,
      });
      // this.eventEmitter.emit('welcome-email', new EmailEvent(email, password));
      await this.emailListener.handleSignupEvent(d_email, password);
      return {
        message: 'Doctor created successfully',
        status: 200,
        res: {
          id: res.d_id,
          email: res.d_email,
        },
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async editDoctors(id: string, body: EditDoctordto) {
    try {
      // 'Doctor has been deleted successfully',
      // console.log(body);
      await await this.doctor.update({ ...body }, { where: { d_id: id } });
      return {
        data: {
          message: 'Doctor detail has been updated successfully',
        },
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async deleteDoctor(id: number) {
    try {
      // 'Doctor has been deleted successfully',
      await this.doctor.destroy({ where: { d_id: id } });
      return {
        message: {
          data: 'Doctor has been deleted successfully',
        },
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
