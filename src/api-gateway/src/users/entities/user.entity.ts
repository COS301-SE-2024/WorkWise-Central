import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { ApiHideProperty } from '@nestjs/swagger';

@Schema()
export class User {
  @ApiHideProperty()
  @Prop({ required: true, unique: true })
  user_UUID: string;

  @ApiHideProperty()
  @Prop({ required: true, unique: true })
  displayName: string;

  @ApiHideProperty()
  @Prop({ required: true })
  name: string;

  @ApiHideProperty()
  @Prop({ required: true })
  surname: string;

  @ApiHideProperty()
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @ApiHideProperty()
  @Prop({ required: true })
  password: string;

  @ApiHideProperty()
  @Prop({ type: Date, required: true })
  dateOfBirth: Date;
  //dateOfBirth: { type: number; default: DateConstructor['now'] };

  @ApiHideProperty()
  @Prop({ type: [String], required: true })
  roles: string[];

  @ApiHideProperty()
  @Prop({
    required: false,
    default:
      'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp',
  })
  profilePicture: string; //Will be a base64 string

  @ApiHideProperty()
  @Prop({ required: true, default: 'Rather Not Say' })
  gender: string;

  @ApiHideProperty()
  @Prop({ required: false, default: 'English' })
  preferred_Language: string;

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

UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
