import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperAdmin } from 'src/entities/SuperAdmin';
import { Doctor } from 'src/entities/Doctors';
import { InjectModel } from '@nestjs/sequelize';
import { Operator } from 'src/entities/Operators';
import { Hospital } from 'src/entities/Hospital';
import { SignUpDto } from '../dto/signupdto';
import * as bcrypt from 'bcrypt';
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
    // console.log(userdetail);
    // console.log(identity);
    // return await this.userModel.sequelize.query(
    //   'SELECT * FROM "Users" WHERE email = ?',
    //   {
    //     replacements: [email],
    //     type: QueryTypes.SELECT,
    //   },
    // );
    try {
      if (identity === 'admin') {
        // console.log('ksh');
        const user = await this.superAdminModel.findOne({
          where: {
            email: userdetail.email,
            // password: userdetail.password,
          },
        });
        return {
          role: 'admin',
          user,
        };
      }

      if (identity === 'hospitaladmin') {
        const user = await this.hospitaladmin.findOne({
          where: {
            email: userdetail.email,
            // password: userdetail.password,
          },
        });
        return {
          role: 'hospitaladmin',
          user,
        };
      }

      if (identity === 'operator') {
        const user = await this.operator.findOne({
          where: {
            email: userdetail.email,
            // password: userdetail.password,
          },
        });
        return {
          role: 'operator',
          user,
        };
      }

      if (identity === 'doctor') {
        // console.log('hfh');
        const user = await this.doctor.findOne({
          where: {
            email: userdetail.email,
            // password: userdetail.password,
          },
        });
        return {
          role: 'doctor',
          user,
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
        console.log('ksh');

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
