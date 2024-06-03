import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';

class address {
  @ApiProperty()
  @Prop({ type: String, required: true })
  street: string;
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
  @Prop({ type: String, required: true })
  complex: string;
  @ApiProperty()
  @Prop({ type: String, required: true })
  houseNumber: string;
}

export class details {
  @ApiProperty()
  @Prop({ required: true })
  heading: string;

  @ApiProperty()
  @Prop({ required: true })
  description: string;

  @ApiProperty()
  @Prop({ required: false })
  notes: string;

  @ApiProperty()
  @Prop({ required: true })
  address: address;
}

export class clientFeedback {
  @ApiProperty()
  @Prop({ required: false, default: 10 })
  jobRating: number;

  @ApiProperty()
  @Prop({ required: false, default: 10 })
  customerServiceRating: number;

  @ApiProperty()
  @Prop({ required: false, default: 10 })
  comments: string;
}

export class CreateJobDto {
  @ApiProperty()
  @Prop({ required: true })
  clientId: string;

  @ApiProperty()
  @Prop({ required: true })
  companyId: string;

  @ApiProperty()
  @Prop({ required: true })
  assignedBy: string;

  @ApiProperty()
  @Prop({ required: true })
  scheduledDateTime: Date;

  @ApiProperty()
  @Prop({ required: false, default: 'Not Started' })
  status: string;

  @ApiProperty()
  @Prop({ required: false })
  inventoryUsed: [string]; //TODO: Convert to ObjectId

  @ApiProperty()
  @Prop({ required: true })
  details: details;

  @ApiProperty()
  @Prop({ required: false })
  clientFeedback: clientFeedback;

  @ApiProperty()
  @Prop({ type: [String], required: true, default: [] })
  imagesTaken: string[];
}
