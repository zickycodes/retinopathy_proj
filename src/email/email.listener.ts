import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
// import { EmailEvent } from './events/emailevents';
import { EmailEvent } from './email.event';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailListener {
  constructor(private mailerService: MailerService) {}
  @OnEvent('welcome-email')
  async handleSignupEvent(event: EmailEvent) {
    const { email } = event;
    // console.log(email);
    // console.log(event);
    await this.mailerService.sendMail({
      to: email,
      from: 'godsgiftuduak2@gmail.com',
      subject: 'Signup succeeded!',
      html: `<h4>You are welcome to Art & Rebellion</h4>
              <p>You are specially welcomed to Art & Rebellion where Art is the air we breathe</p>
        `,
    });
  }

  @OnEvent('send-otp')
  async sendEmailOtp(event: EmailEvent) {
    const { email, token } = event;
    // console.log(email, token);
    // Use the mailer service to send the email here...
    await this.mailerService.sendMail({
      to: email,
      from: 'godsgiftuduak2@gmail.com',
      subject: 'One time OTP!',
      html: `Here is your one time otp${token}`,
    });
  }
}
