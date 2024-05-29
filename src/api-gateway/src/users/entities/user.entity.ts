import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  user_UUID: string;

  @Prop({ required: true, unique: true })
  displayName: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Date, required: true })
  dateOfBirth: Date;
  //dateOfBirth: { type: number; default: DateConstructor['now'] };

  @Prop({ type: [String], required: true })
  roles: string[];

  @Prop({ required: false })
  profilePicture: string; //Will be a base64 string

  @Prop({ required: false })
  public created_at: Date;

  @Prop({ required: false })
  public updated_at: Date;

  @Prop({ required: false })
  public deleted_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.email, this.password);
  } catch (error) {
    next(error);
  }
});
