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
      const user = await this.usersService.findOne(dto, identity);
      // console.log('user', user);
      if (user === null) {
        const res = await this.usersService.createUser(dto, identity);
        // this.eventEmitter.emit('welcome-email', new EmailEvent(dto.email, 400));
        return {
          message: 'User created sucessfully',
          status: 200,
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
      const { role, user } = await this.usersService.findOne(dto, identity);
      // console.log('user', user);
      if (user) {
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (isMatch) {
          const payload = { email: user.email, sub: user.id, role };
          const access_token = this.jwtService.sign(payload);
          const refreshToken = this.jwtService.sign(payload);
          // await this.userService.findOneAndUpdate(user.id, { refreshToken });
          return {
            access_token,
            refreshToken,
            id: user.id,
            role,
          };
        } else {
          throw new HttpException(
            {
              statusCode: 402,
              error: 'Incorrect password',
            },
            402,
          );
        }
      } else {
        throw new NotFoundException('User not found');
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
