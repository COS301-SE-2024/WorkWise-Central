import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
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
  displayImage?: string =
    'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp';
}

@Schema()
export class joinedCompany {
  employeeId: Types.ObjectId;
  companyId: Types.ObjectId;
  companyName: string;
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

    //this.joinedCompanies = createUserDto.joinedCompanies as Types.ObjectId[];

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
    this.createdAt = new Date();
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
  @Prop({ type: [Types.ObjectId], required: false, default: [] })
  joinedCompanies?: Types.ObjectId[] = [];

  @ApiProperty()
  @Prop({ type: [String], required: false, default: [] })
  skills: string[] = [];

  @ApiHideProperty()
  @Prop({ type: Date, required: true, default: new Date() })
  public createdAt: Date = new Date();

  @ApiHideProperty()
  @Prop({ type: Date, required: false })
  public updateAt?: Date;

  @ApiHideProperty()
  @Prop({ type: Date, required: false })
  public deleted_at?: Date;

  @ApiHideProperty()
  @Prop({ type: Types.ObjectId, required: false, ref: 'Employee' })
  public currentEmployee?: Types.ObjectId;

  /*  @ApiHideProperty()
  @Prop({
    type: [{ type: Types.ObjectId, required: true, ref: 'Employee' }],
    default: [],
  })
  public employeeIds: Types.ObjectId[] = [];*/

  @ApiHideProperty()
  @Prop({
    type: [{ type: Types.ObjectId, required: true, ref: 'Employee' }],
    default: [],
  })
  public employeeIds: Types.ObjectId[] = [];
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
