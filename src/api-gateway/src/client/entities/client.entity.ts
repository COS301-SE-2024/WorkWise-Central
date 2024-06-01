import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
export class clientInfo {
  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: String, required: true, lowercase: true })
  email: string;

  @Prop({ type: address, required: false })
  address: address;
}

@Schema()
export class details {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  clientInfo: clientInfo;
}

@Schema()
export class Client {
  @Prop({ required: true })
  details: details;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
