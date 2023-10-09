// import * as nodemailer from 'nodemailer';
// import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
// import { EmailEvent } from '../events/emailevents';
// import { EmailEvent } from './events/emailevents';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailListener {
  constructor(private mailerService: MailerService) {}
  // @OnEvent('welcome-email')
  async handleSignupEvent(email, password) {
    // const { email, password } = event;
    // console.log('email', email);
    // console.log(event);
    await this.mailerService.sendMail({
      to: email,
      from: 'godsgiftuduak2@gmail.com',
      subject: 'Signup succeeded!',
      html: `<h4>You are welcome to the Retina Pal Project, as a Doctor</h4>
              <p>This are your Login Details: 
              email: ${email}
              <br>
              password: ${password}
              </p>
        `,
    });
  }

  // @OnEvent('welcome-email-hospital')
  async handleSignupEventHos(email, password) {
    // const { email, password } = event;
    // console.log(email);
    // console.log(event);
    await this.mailerService.sendMail({
      to: email,
      from: 'godsgiftuduak2@gmail.com',
      subject: 'Signup succeeded!',
      html: `<h4>As a Hospital you are welcome to the Retina Pal Project</h4>
              <p>This are your Login Details:
              email: ${email}
              <br>
              password: ${password}
              </p>
        `,
    });
  }

  async handleOperator(email, password) {
    // const { email, password } = event;
    // console.log(email);
    // console.log(event);
    await this.mailerService.sendMail({
      to: email,
      from: 'godsgiftuduak2@gmail.com',
      subject: 'Signup succeeded!',
      html: `<h4>As an Operator you are welcome to the Retina Pal Project</h4>
              <p>This are your Login Details:
              email: ${email}
              <br>
              password: ${password}
              </p>
        `,
    });
  }

  // @OnEvent('send-otp')
  // async sendEmailOtp(event: EmailEvent) {
  //   const { email, token } = event;
  //   // console.log(email, token);
  //   // Use the mailer service to send the email here...
  //   await this.mailerService.sendMail({
  //     to: email,
  //     from: 'godsgiftuduak2@gmail.com',
  //     subject: 'One time OTP!',
  //     html: `Here is your one time otp${token}`,
  //   });
  // }
}
