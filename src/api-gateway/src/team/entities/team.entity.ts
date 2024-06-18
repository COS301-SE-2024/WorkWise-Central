import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { CreateTeamDto } from '../dto/create-team.dto';

@Schema()
export class Team {
  constructor(createTeamDto: CreateTeamDto) {
    // this.superiorId = createTeamDto.superiorId;
    // this.roleId = createTeamDto.roleId;
    this.userId = createTeamDto.userId;
    this.companyId = createTeamDto.companyId;
    this.createdAt = new Date();
  }

  @ApiProperty()
  @Prop({ required: false })
  roleId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], required: true, default: [] })
  currentJobAssignments: Types.ObjectId[];
   
  @ApiProperty()
  @Prop({ required: false })
  superiorId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], required: false, default: [] })
  subordinates: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], required: false, default: [] })
  subordinateTeams: Types.ObjectId[];

  @ApiProperty()
  @Prop({ required: true })
  userId: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: true })
  companyId: Types.ObjectId;

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
