import { Controller, Get, Res } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { Types } from 'mongoose';

const temp = new User({
  username: 'johndoe',
  password: 'password123',
  personalInfo: {
    firstName: 'John',
    surname: 'Doe',
    dateOfBirth: new Date(),
    gender: 'Male',
    preferredLanguage: 'English',
  },
  address: {
    street: 'Main Street',
    suburb: 'Suburbia',
    city: 'Cityville',
    postalCode: '12345',
    complex: 'Complexity',
    houseNumber: '1A',
  },
  // joinedCompanies: [new Types.ObjectId('60d5ecb44b93ac2eda842f41')],
  contactInfo: {
    phoneNumber: '+1234567890',
    email: 'dokuzuku@gmail.com',
  },
  profile: {
    displayName: 'John',
    displayImage: 'profile.jpg',
  },
  skills: ['JavaScript'],
  currentCompany: new Types.ObjectId('60d5ecb44b93ac2eda842f41'),
});

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  async sendMail(@Res() response: any) {
    const mail = await this.emailService.sendUserConfirmation(temp, 'abcd');
    //const mail = '';
    console.log(mail);
    return response.status(200).json({
      message: 'success',
      mail,
    });
  }

  /*  @Get()
  async sendMailer(@Res() response: any) {
    const mail = await this.emailService.sendMail();

    return response.status(200).json({
      message: 'success',
      mail,
    });
  }*/
}
