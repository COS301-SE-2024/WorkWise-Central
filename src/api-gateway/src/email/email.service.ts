import { Global, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserConfirmation } from '../users/entities/user-confirmation.entity';
import { InviteToJoin } from '../admin/entities/invite-to-join.entity';
import { Types } from 'mongoose';
import { EmailInfoDto, PasswordResetDto } from './dto/emailInfo.dto';

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
    const url = `example.com/auth/confirm?token=${encodeURIComponent(token)}`; //TODO:confirm

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

  async sendGoodbye(details: EmailInfoDto, token?: string) {
    //?const url = `example.com/auth/confirm?token=${token}`; //TODO:confirm
    console.log(token);
    const ourEmail = '<support@workwise.com>';
    const result = await this.mailerService.sendMail({
      to: details.emailAddress,
      from: `"Support Team" ${ourEmail}`,
      subject: 'Farewell from WorkWise',
      template: './goodbye',
      context: {
        name: details.name,
        ourEmail: ourEmail,
      },
    });
    console.log(result);
  }

  async sendResetPasswordRequest(resetDto: PasswordResetDto, token: string) {
    const serverUrl = `http://localhost:5173`; //TODO:Point to Deployment
    const url = `${serverUrl}/new-password?uId=${encodeURIComponent(resetDto.userId.toString())}&tok=${encodeURIComponent(token)}`;
    console.log(token);
    const ourEmail = '<support@workwise.com>';
    const result = await this.mailerService.sendMail({
      to: resetDto.emailAddress,
      from: `"Support Team" ${ourEmail}`,
      subject: 'Password Reset',
      template: './password-reset',
      context: {
        name: resetDto.name,
        ourEmail: ourEmail,
        resetUrl: url,
      },
    });
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
  async sendInvite(inviteDto: InviteToJoin, inviteId: Types.ObjectId, hasAccount: boolean) {
    const subject = `Invite to Join ${inviteDto.companyName}`;
    // const newUserLink = `https://tuksui.sharpsoftwaresolutions.net/?inviteId=${encodeURIComponent(inviteId.toString())}`;//TODO:Point to Deployment
    // const existingUserLink = `https://tuksui.sharpsoftwaresolutions.net/?inviteId=${encodeURIComponent(inviteId.toString())}`;

    const tempUrl = `http://localhost:5173`;
    const newUserLink = `${tempUrl}/?inviteId=${encodeURIComponent(inviteId.toString())}`;
    const existingUserLink = `${tempUrl}/company-invites?inviteId=${encodeURIComponent(inviteId.toString())}`;

    if (hasAccount) {
      const result = await this.mailerService.sendMail({
        to: inviteDto.emailBeingInvited,
        from: '"Support Team" <support@workwise.com>',
        subject: subject,
        template: './inviteExistingToCompany',
        context: {
          companyName: inviteDto.companyName,
          userName: 'there',
          roleName: inviteDto.roleName,
          supportEmail: 'support@workwise.com',
          url: existingUserLink,
        },
      });
      console.log(result);
    } else {
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
        },
      });
      console.log(result);
    }
  }

  async sendClientPortalLink(
    clientId: Types.ObjectId,
    clientEmail: string,
    clientName: string,
    clientSurname: string,
    companyName: string,
    jobTitle: string,
  ) {
    const serverUrl = `http://localhost:5173`; //TODO: Point to Deployment <!-- https://tuksui.sharpsoftwaresolutions.net?clientid=clientid-->
    const url = `${serverUrl}/client-portal?cId=${encodeURIComponent(clientId.toString())}`;
    const ourEmail = '<support@workwise.com>';

    const result = await this.mailerService.sendMail({
      to: clientEmail,
      from: `"Support Team" ${ourEmail}`,
      subject: 'New Job Alert',
      template: './client-portal',
      context: {
        name: clientName,
        surname: clientSurname,
        companyName: companyName,
        jobTitle: jobTitle,
        link: url,
      },
    });
    console.log(result);
  }
}
