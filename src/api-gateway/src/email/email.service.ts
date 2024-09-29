import { forwardRef, Global, Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserConfirmation } from '../users/entities/user-confirmation.entity';
import { InviteToJoin } from '../admin/entities/invite-to-join.entity';
import { Types } from 'mongoose';
import { EmailInfoDto, PasswordResetDto } from './dto/emailInfo.dto';
import { NotificationService } from '../notification/notification.service';
import { Message } from '../notification/entities/notification.entity';

@Global()
@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationService,

    @Inject('GLOBAL_CONFIG') private readonly globalConfig: { serverUrl: string; frontendUrl: string },
  ) {}

  async sendUserConfirmation(userConfirmation: UserConfirmation) {
    console.log('sendUserConfirmation', userConfirmation);
    const url = `${this.globalConfig.serverUrl}auth/verify?email=${encodeURIComponent(userConfirmation.email)}&token=${userConfirmation.key}`;

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

  async sendEmailConfirmation(details: { name: string; surname: string; email: string }, token: string) {
    const url = `${this.globalConfig.serverUrl}auth/confirm?token=${encodeURIComponent(token)}`;

    /*    const user = await this.userService.getUserByEmail(details.email);
    if (user) {
      this.notificationService.create({
        recipientIds: [user._id],
        message: new Message(
          'Please confirm you email address',
          `Please go to your email, and you should have received a confirmation email.`,
        ),
      });
    }*/

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
    //const serverUrl = `http://localhost:5173`;
    const url = `${this.globalConfig.frontendUrl}/new-password?uId=${encodeURIComponent(resetDto.userId.toString())}&tok=${encodeURIComponent(token)}`;
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

  async sendInvite(inviteDto: InviteToJoin, inviteId: Types.ObjectId, hasAccount: boolean, userId?: Types.ObjectId) {
    const subject = `Invite to Join ${inviteDto.companyName}`;
    // const newUserLink = `https://tuksui.sharpsoftwaresolutions.net/?inviteId=${encodeURIComponent(inviteId.toString())}`;//TODO:Point to Deployment
    // const existingUserLink = `https://tuksui.sharpsoftwaresolutions.net/?inviteId=${encodeURIComponent(inviteId.toString())}`;

    const url = this.globalConfig.frontendUrl;
    const newUserLink = `${url}/?inviteId=${encodeURIComponent(inviteId.toString())}`;
    const existingUserLink = `${url}/company-invites?inviteId=${encodeURIComponent(inviteId.toString())}`;

    if (hasAccount) {
      if (userId) {
        this.notificationService.create({
          recipientIds: [userId],
          message: new Message('New invite to Company!', `You have been invited to join ${inviteDto.companyName}`, {
            inviteId: inviteId,
          }),
        });
      }

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
    const url = `${this.globalConfig.frontendUrl}/client-portal?cId=${encodeURIComponent(clientId.toString())}`;
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

  async sendInvoiceClientPortalLink(
    clientId: Types.ObjectId,
    clientEmail: string,
    clientName: string,
    clientSurname: string,
    companyName: string,
    jobTitle: string,
  ) {
    const url = `${this.globalConfig.frontendUrl}/client-portal?cId=${encodeURIComponent(clientId.toString())}`;
    const ourEmail = '<support@workwise.com>';

    const result = await this.mailerService.sendMail({
      to: clientEmail,
      from: `"Support Team" ${ourEmail}`,
      subject: 'Invoice Alert',
      template: './client-portal-invoice',
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
