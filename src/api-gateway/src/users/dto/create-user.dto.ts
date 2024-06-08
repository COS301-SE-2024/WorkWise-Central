import { Types } from 'mongoose';
import { Prop } from '@nestjs/mongoose';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

class contactInfo {
  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: String, required: true, lowercase: true })
  email: string;
}

class address {
  @Prop({ type: String, required: true })
  street: string;
  @Prop({ type: String, required: true })
  suburb: string;
  @Prop({ type: String, required: true })
  city: string;
  @Prop({ type: String, required: true })
  postalCode: string;
  @Prop({ type: String, required: true })
  complex: string;
  @Prop({ type: String, required: true })
  houseNumber: string;
}

class personalInfo {
  @IsString()
  @Prop({ required: true })
  firstName: string;

  @IsString()
  @Prop({ required: true })
  surname: string;

  @IsDate()
  @Prop({ type: Date, required: true })
  dateOfBirth: Date;

  @IsString()
  @Prop({ required: false, default: 'Rather Not Say' })
  gender: string;

  @IsString()
  @Prop({ required: false, default: 'English' })
  preferredLanguage: string;
}

class profile {
  @IsString()
  displayName: string;

  @IsString()
  displayImage?: string;
}

class roles {
  companyId: Types.ObjectId;
  @IsString()
  role: string;
  @IsArray()
  permissions: string[];
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsObject()
  personalInfo: personalInfo;

  @IsNotEmpty()
  @IsObject()
  address: address;

  @IsOptional()
  @IsArray()
  joinedCompanies?: string[] | Types.ObjectId[];

  @IsNotEmpty()
  @IsObject()
  contactInfo: contactInfo;

  @IsNotEmpty()
  @IsObject()
  profile: profile;

  @IsOptional()
  @IsArray()
  skills?: string[];

  @IsOptional()
  @IsArray()
  roles?: roles[];

  @IsOptional()
  @IsString()
  public currentCompany: Types.ObjectId;
}

export class createUserResponseDto {
  response: string;

  constructor(message: string) {
    this.response = message;
  }
}
