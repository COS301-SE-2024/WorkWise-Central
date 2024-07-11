import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';
import { CreateTeamDto } from '../dto/create-team.dto';

@Schema()
export class Team {
  constructor(createTeamDto: CreateTeamDto) {
    this.companyId = createTeamDto.companyId;
    this.teamName = createTeamDto.teamName;
    this.teamMembers = createTeamDto.teamMembers;
    this.teamLeaderId = createTeamDto.teamLeaderId;
    this.createdAt = new Date();
  }
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  companyId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: String, required: true })
  teamName: string;

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: true })
  teamMembers: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: false })
  teamLeaderId?: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, default: [] })
  currentJobAssignments: Types.ObjectId[];

  @ApiHideProperty()
  @Prop({ required: true, default: new Date() })
  public createdAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public updatedAt?: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public deletedAt?: Date;
}

export class teamApiObject {
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, unique: true })
  id: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  companyId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: String, required: true })
  teamName: string;

  @ApiProperty()
  @Prop({ type: [SchemaTypes.ObjectId], required: true })
  teamMembers: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: false })
  teamLeaderId?: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true, default: [] })
  currentJobAssignments: Types.ObjectId[];

  @ApiHideProperty()
  @Prop({ required: true, default: new Date() })
  public createdAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public updatedAt?: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public deletedAt?: Date;
}

export const TeamSchema = SchemaFactory.createForClass(Team);

export class teamListResponseDto {
  constructor(data: teamApiObject[]) {
    this.data = data;
  }
  data: teamApiObject[];
}

export class teamResponseDto {
  constructor(data: teamApiObject) {
    this.data = data;
  }
  data: teamApiObject;
}

export class BooleanResponseDto {
  data: boolean;
}
