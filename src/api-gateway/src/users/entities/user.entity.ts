import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';

@Schema()
export class systemDetails {
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true, unique: false })
  password: string;
}
@Schema()
export class contactInfo {
  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: String, required: true, lowercase: true })
  email: string;
}
@Schema()
export class address {
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
@Schema()
export class personalInfo {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  surname: string;

  @ApiHideProperty()
  @Prop({ type: Date, required: true })
  dateOfBirth: Date;

  @ApiHideProperty()
  @Prop({ required: true, default: 'Rather Not Say' })
  gender: string;

  @ApiHideProperty()
  @Prop({ required: true, default: 'English' })
  preferredLanguage: string;

  @ApiHideProperty()
  @Prop({ type: contactInfo, required: false })
  contactInfo: contactInfo;

  @ApiHideProperty()
  @Prop({ type: address, required: false })
  address: address;
}

@Schema()
export class profile {
  @Prop({ type: String, required: true })
  displayName: string;

  @Prop({
    required: false,
    default:
      'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp',
  })
  displayImage: string;
}

@Schema()
export class roles {
  @Prop({ required: true })
  companyId: Types.ObjectId;

  @Prop({ type: String, required: true })
  role: string;

  @Prop({ type: [String], required: true, default: ['read'] })
  permissions: string[];
}

export class day {
  @Prop({ required: false })
  dayOfWeek: string;

  @Prop({ required: false })
  hours: string;
}

@Schema()
export class availability {
  @Prop({ required: false })
  schedule: day[];
}

@Schema()
export class User {
  constructor(createUserDto: CreateUserDto) {
    this.systemDetails = {
      username: createUserDto.username,
      password: createUserDto.password,
    };
    this.personalInfo = {
      address: createUserDto.address,
      contactInfo: createUserDto.contactInfo,
      firstName: createUserDto.personalInfo.firstName,
      surname: createUserDto.personalInfo.surname,
      preferredLanguage: createUserDto.personalInfo.preferredLanguage,
      dateOfBirth: createUserDto.personalInfo.dateOfBirth,
      gender: createUserDto.personalInfo.gender,
    };
    //this.personalInfo.contactInfo.email.toLowerCase();

    this.joinedCompanies = createUserDto.joinedCompanies as Types.ObjectId[];

    if (createUserDto.profile.displayImage != null) {
      this.profile = {
        displayName: createUserDto.profile.displayImage,
        displayImage: createUserDto.profile.displayImage,
      };
    } else {
      this.profile = {
        displayName: createUserDto.profile.displayImage,
        displayImage:
          'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp',
      };
    }

    this.profile.displayName = createUserDto.profile.displayName;
    this.skills = createUserDto.skills;
    this.roles = createUserDto.roles;
    if (createUserDto.roles) this.roles = createUserDto.roles;
    this.created_at = new Date();
  }

  @ApiProperty()
  @Prop({ required: true })
  systemDetails: systemDetails;

  @ApiProperty()
  @Prop({ required: true })
  personalInfo: personalInfo;

  @ApiProperty()
  @Prop({ required: true })
  profile: profile;

  @ApiProperty()
  @Prop({ required: false })
  roles: roles[];

  @ApiProperty()
  @Prop({ type: [mongoose.Types.ObjectId], required: true, default: [] })
  joinedCompanies: mongoose.Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: [String], required: false })
  skills: string[];

  @ApiProperty()
  @Prop({ required: false })
  availability: availability;

  @ApiHideProperty()
  @Prop({ required: false, default: new Date() })
  public created_at: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public updated_at: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public deleted_at: Date;

  @ApiHideProperty()
  @Prop({ type: [Types.ObjectId], required: false, default: [] })
  public currentJobAssignments: Types.ObjectId[];

  @ApiHideProperty()
  @Prop({ type: Types.ObjectId, required: false })
  public currentCompany: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.systemDetails.password = await bcrypt.hash(
      this.systemDetails.password,
      salt,
    );
    next();
  } catch (error) {
    next(error);
  }
});
