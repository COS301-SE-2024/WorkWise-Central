import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { Employee } from '../../employee/entities/employee.entity';
import { currentDate } from '../../utils/Utils';
import { JobStatus } from '../../job/entities/job-status.entity';

export class ContactDetails {
  @Prop({ type: String, required: true, trim: true })
  phoneNumber: string;

  @Prop({
    type: String,
    unique: false,
    index: true,
    required: true,
    lowercase: true,
  })
  email: string;
}

export class Address {
  @Prop({ type: String, required: true })
  street: string;
  @Prop({ type: String, required: true })
  province: string;
  @Prop({ type: String, required: true })
  suburb: string;
  @Prop({ type: String, required: true })
  city: string;
  @Prop({ type: String, required: true })
  postalCode: string;
}

export class AccountDetails {
  @Prop({ type: String, required: false })
  merchantId?: string;
  @Prop({ type: String, required: false })
  merchantKey?: string;
  @Prop({ type: String, required: false })
  passPhrase?: string;
}

@Schema()
export class Company {
  constructor(createCompanyDto: CreateCompanyDto) {
    if (createCompanyDto.name) this.name = createCompanyDto.name;

    if (createCompanyDto.registrationNumber) this.registrationNumber = createCompanyDto.registrationNumber;

    if (createCompanyDto.vatNumber) this.vatNumber = createCompanyDto.vatNumber;
    if (createCompanyDto.type) this.type = createCompanyDto.type;
    if (createCompanyDto.logo) this.logo = createCompanyDto.logo;

    if (createCompanyDto.contactDetails) this.contactDetails = createCompanyDto.contactDetails;

    if (createCompanyDto.address) this.address = createCompanyDto.address;

    this.createdAt = currentDate();
  }

  @ApiProperty()
  @Prop({ required: false, unique: false })
  registrationNumber?: string;

  @ApiProperty()
  @Prop({ required: false, unique: false })
  vatNumber?: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  name: string;

  @ApiProperty()
  @Prop({ required: false })
  type?: string;

  @ApiProperty()
  @Prop({
    type: [SchemaTypes.ObjectId],
    required: true,
    default: [],
    ref: JobStatus.name,
  })
  jobStatuses: Types.ObjectId[] = [];

  @ApiProperty()
  @Prop({
    required: false,
    default: 'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp',
  })
  logo?: string = 'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp';

  @ApiProperty()
  @Prop({ required: true })
  contactDetails: ContactDetails;

  @ApiProperty()
  @Prop({ required: true })
  address: Address;

  @ApiProperty()
  @Prop({ required: true })
  accountDetails: AccountDetails = new AccountDetails();

  @ApiProperty()
  @Prop({ type: Boolean, required: true, default: false })
  private: boolean = false;

  @ApiHideProperty()
  @Prop({ required: false, default: currentDate() })
  public createdAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public updatedAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public deletedAt: Date;
}

export class CompanyApiObject {
  @ApiProperty()
  id: Types.ObjectId;

  @ApiProperty()
  registrationNumber?: string;

  @ApiProperty()
  vatNumber?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type?: string;

  @ApiProperty()
  logo?: string = 'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp';

  @ApiProperty()
  contactDetails: ContactDetails;

  @ApiProperty()
  address: Address;

  @ApiProperty()
  private: boolean;

  @ApiHideProperty()
  public createdAt: Date;

  @ApiHideProperty()
  public updatedAt: Date;

  @ApiHideProperty()
  public deletedAt: Date;
}

export class CompanyApiDetailedObject {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  registrationNumber?: string;

  @ApiProperty()
  vatNumber?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type?: string;

  @ApiProperty()
  logo?: string = 'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp';

  @ApiProperty()
  contactDetails: ContactDetails;

  @ApiProperty()
  address: Address;

  @ApiProperty()
  accountDetails: AccountDetails;

  @ApiProperty()
  private: boolean;

  @ApiHideProperty()
  public createdAt: Date;

  @ApiHideProperty()
  public updatedAt: Date;

  @ApiHideProperty()
  public deletedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);

export class CompanyEmployeesResponseDto {
  constructor(data: Employee & { _id: Types.ObjectId }[]) {
    this.data = data;
  }

  data: Employee & { _id: Types.ObjectId }[];
}

export class CompanyAllResponseDto {
  constructor(data: CompanyApiObject[]) {
    this.data = data;
  }
  data: CompanyApiObject[];
}

export class CompanyAllDetailedResponseDto {
  constructor(data: CompanyApiDetailedObject[]) {
    this.data = data;
  }
  data: CompanyApiDetailedObject[];
}

export class CompanyResponseDto {
  constructor(data: CompanyApiObject) {
    this.data = data;
  }
  data: CompanyApiObject;
}

export class CompanyDetailedResponseDto {
  constructor(data: CompanyApiDetailedObject) {
    this.data = data;
  }
  data: CompanyApiDetailedObject;
}
