import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
    @Prop({ required: true })
    user_UUID: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    surname: string;

    @Prop({ required: false })
    password: string;

    @Prop({ type: Number, required: true })
    dateOfBirth: number;
    //dateOfBirth: { type: number; default: DateConstructor['now'] };

    @Prop({ required: true })
    email: string;

    @Prop({ type: [String], required: true })
    roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
