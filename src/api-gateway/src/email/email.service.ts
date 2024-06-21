import { Global, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserConfirmation } from '../users/entities/user-confirmation.entity';

@Global()
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(userConfirmation: UserConfirmation) {
    console.log('sendUserConfirmation', userConfirmation);
    const tempUrl = 'localhost:3000'; //TODO: Change to deployed url later
    const url = `${tempUrl}/auth/verify?email=${encodeURIComponent(userConfirmation.email)}&token=${userConfirmation.key}`;

    await this.mailerService.sendMail({
      to: userConfirmation.email,
      from: '"Support Team" <support@workwise.com>',
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: userConfirmation.name,
        surname: userConfirmation.surname,
        url,
      },
    });
    // console.log('sendUserConfirmation');
    // console.log(result);
  }

  async sendEmailConfirmation(
    details: { name: string; surname: string; email: string },
    token: string,
  ) {
    const url = `example.com/auth/confirm?token=${token}`; //TODO:confirm

    const result = await this.mailerService.sendMail({
      to: details.email,
      from: '"Support Team" <support@workwise.com>',
      subject: 'Welcome to WorkWise Central!',
      template: './confirmation',
      context: {
        name: details.name,
        surname: details.surname,
        url,
      },
    });
    console.log('sendEmailConfirmation');
    console.log(result);
  }

  async sendMail() {
    const message = `Forgot your password? If you didn't forget your password, please ignore this email!`;

    await this.mailerService.sendMail({
      from: `WorkWise Admin <practicalsix@gmail.com>`,
      to: 'dokuzuku@gmail.com',
      subject: `How to Send Emails with Nodemailer`,
      text: message,
    });
  }
}
