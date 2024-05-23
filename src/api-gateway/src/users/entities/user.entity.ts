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

    @Prop({ type: Date, required: true })
    dateOfBirth: Date;
    //dateOfBirth: { type: number; default: DateConstructor['now'] };

    @Prop({ required: true })
    email: string;

    @Prop({ type: [String], required: true })
    roles: string[];

    @Prop({ required: false })
    public created_at: Date;

    @Prop({ required: false })
    public updated_at: Date;

    @Prop({ required: false })
    public deleted_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
