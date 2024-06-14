import { Types } from 'mongoose';
import { Prop } from '@nestjs/mongoose';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ContactInfo {
  @ApiProperty()
  @IsString()
  @Transform(({ value }) =>
    value.startsWith('0') ? `+27${value.slice(1)}` : value,
  )
  @IsPhoneNumber(null)
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;
}

class Address {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  suburb: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(20)
  postalCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  complex: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(255)
  houseNumber: string;
}

class PersonalInfo {
  @IsString()
  @MaxLength(255)
  @Prop({ required: true })
  firstName: string;

  @IsString()
  @MaxLength(255)
  @Prop({ required: true })
  surname: string;

  @IsDateString()
  @Prop({ type: Date, required: true })
  dateOfBirth: Date;

  @IsString()
  @MaxLength(30)
  @Prop({ required: false, default: 'Rather Not Say' })
  gender: string;

  @IsString()
  @MaxLength(30)
  @Prop({ required: false, default: 'English' })
  preferredLanguage: string;
}

class Profile {
  @IsString()
  @MaxLength(35)
  displayName: string;

  @IsOptional()
  @IsString()
  displayImage?: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PersonalInfo)
  personalInfo: PersonalInfo;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ContactInfo)
  contactInfo: ContactInfo;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => Profile)
  profile: Profile;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  skills?: string[] = [];

  @IsOptional()
  @IsMongoId()
  public currentCompany?: Types.ObjectId;
}

export class createUserResponseDto {
  response: string;

  constructor(message: string) {
    this.response = message;
  }
}
