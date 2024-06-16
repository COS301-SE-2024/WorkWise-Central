import { Global, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Email } from './entities/email.entity';
import { User } from '../users/entities/user.entity';

@Global()
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcome() {
    const welcomeEmail = new Email();
    await this.mailerService.sendMail({
      from: welcomeEmail.sender,
      to: welcomeEmail.recipient,
      subject: welcomeEmail.subject,
      text: welcomeEmail.body,
    });
  }

  async sendUserConfirmation(user: User, token: string) {
    const url = `example.com/auth/confirm?token=${token}`; //TODO:confirm

    const result = await this.mailerService.sendMail({
      to: user.personalInfo.contactInfo.email,
      from: '"Support Team" <support@workwise.com>',
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.personalInfo.firstName,
        surname: user.personalInfo.surname,
        url,
      },
    });
    console.log('sendUserConfirmation');
    console.log(result);
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
    console.log('sendUserConfirmation');
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
