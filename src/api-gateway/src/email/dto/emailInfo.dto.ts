import { Types } from 'mongoose';

export class EmailInfoDto {
  name: string;
  emailAddress: string;
}

export class PasswordResetDto {
  constructor(name: string, emailAddress: string, userId: Types.ObjectId) {
    this.name = name;
    this.emailAddress = emailAddress;
    this.userId = userId;
  }

  name: string;
  emailAddress: string;
  userId: Types.ObjectId;
}
