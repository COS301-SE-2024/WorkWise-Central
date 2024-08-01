import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { Company } from '../../company/entities/company.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { currentDate } from '../../utils/Utils';

export class SystemDetails {
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true, unique: false })
  password: string;
}

export class ContactInfo {
  @Prop({ type: String, required: true, unique: true })
  phoneNumber: string;

  @Prop({ type: String, unique: true, required: true, lowercase: true })
  email: string;
}

export class Address {
  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  street: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  province: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  suburb: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  city: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  postalCode: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  complex?: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  houseNumber?: string;
}

export class PersonalInfo {
  @ApiProperty()
  @Prop({ type: String, required: true })
  firstName: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  surname: string;

  @ApiProperty()
  @Prop({ type: Date, required: true })
  dateOfBirth: Date;

  @ApiProperty()
  @Prop({ type: String, required: true, default: 'Rather Not Say' })
  gender: string = 'Rather Not Say';

  @ApiProperty()
  @Prop({ type: String, required: true, default: 'English' })
  preferredLanguage: string;

  @ApiProperty()
  @Prop({ type: ContactInfo, required: false })
  contactInfo: ContactInfo;

  @ApiProperty({ type: () => Address })
  @Prop({ type: Address, required: false })
  address: Address;
}

export class Profile {
  @Prop({ type: String, required: true })
  displayName: string;

  @Prop({
    type: String,
    required: false,
    default:
      'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp',
  })
  displayImage?: string =
    'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp';
}

export class JoinedCompany {
  constructor(
    employeeId: Types.ObjectId,
    companyId: Types.ObjectId,
    companyName: string,
  ) {
    this.employeeId = employeeId;
    this.companyId = companyId;
    this.companyName = companyName;
  }

  @Prop({ type: SchemaTypes.ObjectId, ref: Employee.name })
  employeeId: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: Company.name })
  companyId: Types.ObjectId;
  @Prop({ type: String })
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

    if (createUserDto.profile.displayImage != null) {
      this.profile = {
        displayName: createUserDto.profile.displayImage,
        //This must be a URL from Storage bucket
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
    this.createdAt = currentDate();
    //this.deletedAt = new Date(); //logically deleted until confirmed
  }

  @ApiProperty()
  @Prop({ required: true })
  systemDetails: SystemDetails;

  @ApiProperty({ type: PersonalInfo })
  @Prop({ required: true })
  personalInfo: PersonalInfo;

  @ApiProperty()
  @Prop({ required: true })
  profile: Profile;

  @ApiProperty()
  @Prop({
    type: [JoinedCompany],
    required: true,
    ref: Company.name,
    default: [],
  })
  joinedCompanies: JoinedCompany[] = [];

  @ApiProperty()
  @Prop({ type: [String], required: false, default: [] })
  skills: string[] = [];

  @ApiProperty()
  @Prop({ type: [String], required: false, default: [] })
  deviceIds?: string[] = [];

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: false, ref: Employee.name })
  public currentEmployee?: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: Boolean, required: false, default: false })
  public isValidated?: boolean = false;

  @ApiHideProperty()
  @Prop({ type: Date, required: true, default: currentDate() })
  public createdAt: Date = currentDate();

  @ApiHideProperty()
  @Prop({ type: Date, required: false })
  public updatedAt?: Date;

  @ApiHideProperty()
  @Prop({ type: Date, required: false })
  public deletedAt?: Date;
}

export class UserApiObject extends OmitType(User, ['deviceIds', 'deletedAt']) {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiHideProperty()
  public createdAt: Date = new Date();
}

export class UserApiDetailedObject {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  systemDetails: SystemDetails;

  @ApiProperty({ type: PersonalInfo })
  @Prop({ required: true })
  personalInfo: PersonalInfo;

  @ApiProperty()
  profile: Profile;

  @ApiProperty()
  joinedCompanies: JoinedCompany[] = [];

  @ApiProperty()
  skills: string[] = [];

  @ApiProperty()
  public currentEmployee?: Employee;

  @ApiProperty()
  @Prop({ type: [String], required: false, default: [] })
  deviceIds: string[];

  @ApiProperty()
  public isValidated?: boolean = false;

  @ApiHideProperty()
  public createdAt: Date = currentDate();

  @ApiHideProperty()
  public updatedAt?: Date;
}

export class SignInUserDto {
  constructor(
    access_token: string,
    id: Types.ObjectId,
    user: UserApiObject = null,
  ) {
    this.access_token = access_token;
    this.id = id;
    this.user = user;
  }

  access_token: string;
  id: Types.ObjectId;
  user?: UserApiObject;
}

export class UserResponseDto {
  constructor(data: UserApiObject) {
    this.data = data;
  }
  data: UserApiObject;
}

export class UserAllResponseDto {
  constructor(data: UserApiObject[]) {
    this.data = data;
  }
  data: UserApiObject[];
}

export const userEmployeeFields: string[] = ['currentEmployee'];

export const userJoinedCompaniesField = {
  path: 'joinedCompanies',
  populate: [
    {
      path: 'employeeId',
      model: Employee.name,
    },
    {
      path: 'companyId',
      model: Company.name,
    },
  ],
};

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
