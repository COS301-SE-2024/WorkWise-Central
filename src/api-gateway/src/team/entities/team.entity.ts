import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
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
  @Prop({ required: true })
  companyId: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: false })
  teamName: string;

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], required: false, default: [] })
  teamMembers: Types.ObjectId[];

  @ApiProperty()
  @Prop({ required: false })
  teamLeaderId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], required: true, default: [] })
  currentJobAssignments: Types.ObjectId[];

  @ApiHideProperty()
  @Prop({ required: true, default: new Date() })
  public createdAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public updatedAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public deletedAt: Date;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
