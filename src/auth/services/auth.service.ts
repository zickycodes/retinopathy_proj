import {
  Injectable,
  HttpException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Userservice } from './user.service';
import { LoginDto } from '../dto/logindto';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from '../dto/signupdto';
import { EventEmitter2 } from '@nestjs/event-emitter';
// import { EmailEvent } from 'src/email/email.event';
import { JwtService } from '@nestjs/jwt';
// import { AnyCnameRecord } from 'dns';

// import { UsersService } from 'au'

@Injectable()
export class AuthService {
  constructor(
    private usersService: Userservice,
    private readonly eventEmitter: EventEmitter2,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignUpDto, identity) {
    try {
      const { user } = await this.usersService.findOne(dto, identity);
      // console.log(user);
      // console.log(user === null);
      if (user === null) {
        // console.log('user', user);
        // console.log('dto', dto);
        // console.log(identity);
        const res = await this.usersService.createUser(dto, identity);
        // this.eventEmitter.emit('welcome-email', new EmailEvent(dto.email, 400));
        return {
          message: 'User created sucessfully',
          status: 201,
          res: {
            id: res.id,
            email: res.email,
          },
        };
      } else {
        throw new HttpException(
          {
            status: 400,
            error: 'User already exists',
          },
          400,
        );
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async login(dto: LoginDto, identity: string) {
    try {
      const { role, user, op_id, hos_id, password, id, email, name } =
        await this.usersService.findOne(dto, identity);

      // console.log('user', user);
      if (user) {
        const isMatch = await bcrypt.compare(dto.password, password);
        if (isMatch) {
          const payload = { email, sub: id, role, hos_id, op_id };
          const access_token = this.jwtService.sign(payload);
          const refreshToken = this.jwtService.sign(payload);
          return {
            access_token,
            refreshToken,
            id,
            op_id: op_id ? op_id : null,
            name: name,
            hos_id: hos_id ? hos_id : null,
            role,
          };
        } else {
          throw new BadRequestException('Incorrect Password');
        }
      } else {
        throw new NotFoundException('User not found');
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
