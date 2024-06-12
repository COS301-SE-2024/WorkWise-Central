import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { PickType } from '@nestjs/mapped-types';
import { Job } from '../../job/entities/job.entity';

export class day {
  @Prop({ required: false })
  dayOfWeek: string;

  @Prop({ required: false })
  hours: string;
}

export class availability {
  @Prop({ required: false })
  schedule: day[];
}

export class empCompany {
  @Prop({ required: true })
  companyId: Types.ObjectId;
  @Prop({ required: true })
  companyName: string;
  @Prop({ required: true })
  companyLogo: string;
}

class job extends PickType(Job, ['details']) {
  id: Types.ObjectId;
}

class subordinateEmployee {
  employeeId: Types.ObjectId;
  employeeName: string;
}

class subordinateTeam {
  teamId: Types.ObjectId;
  teamName: string;
}

class superior {
  id: Types.ObjectId;
  name: string;
}

class currentJobAssignment {
  jobId: Types.ObjectId;
  jobDetails: job;
}

@Schema()
export class Employee {
  /*  constructor(createUserDto: any) {
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
    //this.personalInfo.contactInfo.email.toLowerCase();

    this.joinedCompanies = createUserDto.joinedCompanies as Types.ObjectId[];

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
    this.roles = createUserDto.roles;
    if (createUserDto.roles) this.roles = createUserDto.roles;
    this.created_at = new Date();
  }*/

  @ApiProperty()
  @Prop({ required: true })
  userId: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: true })
  company: empCompany;

  @ApiProperty()
  @Prop({ required: true, default: [] })
  Jobs: job[];

  @ApiProperty()
  @Prop({ type: [String], required: true, default: [] })
  skills: string[];

  @ApiProperty()
  @Prop({ required: false, default: [] })
  subordinateEmployees: subordinateEmployee[];

  @ApiProperty()
  @Prop({ required: false, default: [] })
  subordinateTeams: subordinateTeam[];

  @Prop({ type: [String], required: false })
  permissions: string[];

  @ApiProperty()
  @Prop({ required: true, default: 'Generic' })
  role: string;

  @ApiProperty()
  @Prop({ required: true })
  superior: superior;

  @ApiProperty()
  @Prop({ required: false })
  availability: availability;

  @ApiProperty()
  @Prop({ required: false, default: [] })
  public currentJobAssignments: currentJobAssignment[];

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

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
