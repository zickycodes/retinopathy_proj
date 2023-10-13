import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperAdmin } from 'src/entities/SuperAdmin';
import { Doctor } from 'src/entities/Doctors';
import { InjectModel } from '@nestjs/sequelize';
import { Operator } from 'src/entities/Operators';
import { Hospital } from 'src/entities/Hospital';
import { SignUpDto } from '../dto/signupdto';
import * as bcrypt from 'bcrypt';
import { QueryInterface, QueryTypes } from 'sequelize';
// import { User } from 'src/entities/User';

@Injectable()
export class Userservice {
  constructor(
    @InjectModel(SuperAdmin)
    private superAdminModel: typeof SuperAdmin,
    @InjectModel(Doctor)
    private doctor: typeof Doctor,
    @InjectModel(Operator)
    private operator: typeof Operator,
    @InjectModel(Hospital)
    private hospitaladmin: typeof Hospital,
  ) {}
  // async createUser(userDetails: SignUpDto) {
  //   const password = userDetails.password;
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const res = await this.userModel.create({
  //     ...userDetails,
  //     password: hashedPassword,
  //   });
  //   return res;
  // }
  async findOne(userdetail: any, identity: string): Promise<any> {
    try {
      if (identity === 'admin') {
        // console.log('ksh');
        const user = await this.superAdminModel.findOne({
          where: {
            email: userdetail.email,
            // password: userdetail.password,
          },
        });
        // console.log(user);
        return {
          role: 'admin',
          password: user ? user.password : null,
          user: user ? user : null,
          id: user ? user.id : null,
          email: user ? user.email : null,
        };
      }

      if (identity === 'hospital-admin') {
        const hospitaladmin = (await this.hospitaladmin.sequelize.query(
          `SELECT H.h_id AS id, H.h_name as name, H.h_email AS email, H.h_password AS password, O.o_id AS op_id FROM Hospitals AS H JOIN Operators AS O ON H.h_id = O.o_hospital_id WHERE H.h_email = ?`,
          { replacements: [userdetail.email], type: QueryTypes.SELECT },
        )) as {
          password: string;
          op_id: number;
          id: number;
          email: string;
          name: string;
        }[];

        return {
          role: 'hospital-admin',
          password: hospitaladmin[0] ? hospitaladmin[0].password : null,
          op_id: hospitaladmin[0] ? hospitaladmin[0].op_id : null,
          hos_id: hospitaladmin[0] ? hospitaladmin[0].id : null,
          email: hospitaladmin[0] ? hospitaladmin[0].email : null,
          user: hospitaladmin[0] ? hospitaladmin[0] : null,
          name: hospitaladmin[0] ? hospitaladmin[0].name : null,
        };
      }

      if (identity === 'operator') {
        const operator = (await this.hospitaladmin.sequelize.query(
          `SELECT O.o_id AS op_id, O.o_email AS email, O.o_first_name AS name, O.o_password AS password, H.h_id AS hos_id FROM Hospitals AS H JOIN Operators AS O ON H.h_id = O.o_hospital_id WHERE O.o_email = ?`,
          { replacements: [userdetail.email], type: QueryTypes.SELECT },
        )) as {
          password: string;
          op_id: number;
          hos_id: number;
          email: string;
          name: string;
        }[];
        return {
          role: 'operator',
          name: operator[0].name,
          password: operator[0].password,
          email: operator[0].email,
          op_id: operator[0].op_id,
          hos_id: operator[0].hos_id,
          user: operator ? operator : null,
        };
      }

      if (identity === 'doctor') {
        // console.log('hfh');
        const user = await this.doctor.findOne({
          where: {
            d_email: userdetail.email,
            // password: userdetail.password,
          },
        });
        return {
          role: 'doctor',
          user: user ? user : null,
          password: user ? user.d_password : null,
          id: user ? user.d_id : null,
          email: user ? user.d_email : null,
          name: user ? user.d_first_name : null,
        };
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async createUser(userDetails: SignUpDto, identity: string) {
    try {
      const password = userDetails.password;
      const hashedPassword = await bcrypt.hash(password, 10);

      if (identity === 'admin') {
        // console.log('ksh');

        const res = await this.superAdminModel.create({
          ...userDetails,
          password: hashedPassword,
        });
        return res;
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  // async findOneAndUpdate(
  //   useridentifier: number | string,
  //   userdetails: any,
  // ): Promise<any> {
  //   // console.log(id);
  //   // console.log(userdetails);
  //   // console.log('useridentifier', useridentifier);
  //   const password = userdetails.password ? userdetails.password : null;
  //   let hashedPassword;
  //   if (password) {
  //     hashedPassword = await bcrypt.hash(password, 10);
  //     return await this.userModel.update(
  //       {
  //         ...userdetails,
  //         password: hashedPassword,
  //       },
  //       { where: { id: useridentifier } },
  //     );
  //   } else {
  //     return await this.userModel.update(
  //       {
  //         ...userdetails,
  //       },
  //       { where: { id: useridentifier } },
  //     );
  //   }
  // }
}
