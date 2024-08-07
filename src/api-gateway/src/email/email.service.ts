import { Global, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserConfirmation } from '../users/entities/user-confirmation.entity';
import { InviteToJoin } from '../admin/entities/invite-to-join.entity';
import { Types } from 'mongoose';

@Global()
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(userConfirmation: UserConfirmation) {
    console.log('sendUserConfirmation', userConfirmation);
    const tempUrl = 'http://localhost:3000'; //TODO: Change to deployed url later
    const url = `${tempUrl}/auth/verify?email=${encodeURIComponent(userConfirmation.email)}&token=${userConfirmation.key}`;

    await this.mailerService.sendMail({
      to: userConfirmation.email,
      from: '"Support Team" <support@workwise.com>',
      subject: 'Welcome to WorkWise Central! Confirm your Email',
      template: './confirmation',
      context: {
        name: userConfirmation.name,
        surname: userConfirmation.surname,
        url: url,
      },
    });
    // console.log('sendUserConfirmation');
    // console.log(result);
  }

  /*  async sendRequestEmail(userRequestToJoin: UserJoinRequest) {  //TODO: Fix
    console.log('userRequestToJoin', userRequestToJoin);
    const tempUrl = 'http://localhost:3000'; //TODO: Change to deployed url later
    const url = `${tempUrl}/auth/verify?email=${encodeURIComponent(userRequestToJoin.companyName)}`;

    await this.mailerService.sendMail({
      //TODO: Add required fields to parameter
      to: userRequestToJoin.companyName, //Change to email
      from: '"Support Team" <support@workwise.com>',
      subject: 'Welcome to WorkWise Central! Confirm your Email',
      template: './confirmation',
      context: {
        name: userRequestToJoin.companyName,
        surname: userRequestToJoin.companyName,
        url: url,
      },
    });
    // console.log('sendUserConfirmation');
    // console.log(result);
  }*/

  async sendEmailConfirmation(details: { name: string; surname: string; email: string }, token: string) {
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
  async sendInvite(inviteDto: InviteToJoin, inviteId: Types.ObjectId) {
    const subject = `Invite to Join ${inviteDto.companyName}`;
    const newUserLink = `https://tuksui.sharpsoftwaresolutions.net/?inviteId=${encodeURIComponent(inviteId.toString())}`;
    const existingUserLink = `https://tuksui.sharpsoftwaresolutions.net/?inviteId=${encodeURIComponent(inviteId.toString())}`;
    const result = await this.mailerService.sendMail({
      to: inviteDto.emailBeingInvited,
      from: '"Support Team" <support@workwise.com>',
      subject: subject,
      template: './inviteToCompany',
      context: {
        companyName: inviteDto.companyName,
        userName: 'there',
        roleName: inviteDto.roleName,
        supportEmail: 'support@workwise.com',
        newUserLink: newUserLink,
        existingUserLink: existingUserLink,
      },
    });
    console.log(result);
  }
}
