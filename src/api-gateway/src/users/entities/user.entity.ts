import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//import * as bcrypt from 'bcrypt';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

@Schema()
export class systemDetails {
  @Prop({ required: true, lowercase: true })
  email: string;
  @Prop({ required: true, unique: false })
  password: string;
  @Prop({ required: true, unique: true })
  username: string;
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
  @Prop({ type: String, required: false })
  street: string;
  @Prop({ type: String, required: false })
  suburb: string;
  @Prop({ type: String, required: false })
  city: string;
  @Prop({ type: String, required: false })
  postalCode: string;
  @Prop({ type: String, required: false })
  complex: string;
  @Prop({ type: String, required: false })
  houseNumber: string;
}
@Schema()
export class personalInfo {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true, unique: false })
  surname: string;

  @ApiHideProperty()
  @Prop({ type: Date, required: true })
  dateOfBirth: Date;

  @ApiHideProperty()
  @Prop({ required: true, default: 'Rather Not Say' })
  gender: string;

  @ApiHideProperty()
  @Prop({ required: false, default: 'English' })
  preferred_Language: string;

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
  @Prop({ type: String, required: false })
  role: string;

  @Prop({ type: [String], required: false })
  permissions: string[];
}

@Schema()
export class availability {
  @Prop({ required: false })
  schedule: any[]; //Todo: Ask thando
}

@Schema()
export class User {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  user_UUID: string;

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
  roles: roles;

  @ApiProperty()
  @Prop({ type: [mongoose.Types.ObjectId], required: false })
  joinedCompanies: mongoose.Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: [String], required: false })
  skills: string[];

  @ApiHideProperty()
  @Prop({ required: false, default: new Date() })
  public created_at: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public updated_at: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public deleted_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

/*UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});*/
