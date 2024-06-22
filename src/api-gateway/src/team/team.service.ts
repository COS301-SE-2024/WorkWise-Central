import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types, FlattenMaps } from 'mongoose';
import { Team } from './entities/team.entity';
import { EmployeeService } from '../employee/employee.service';
import { CompanyService } from '../company/company.service';
import { User } from '../users/entities/user.entity';
import { JobService } from 'src/job/job.service';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<Team>,
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    @Inject(forwardRef(() => JobService))
    private jobService: JobService,
  ) {}

  async validateTeam(team: Team | CreateTeamDto | UpdateTeamDto) {
    if ('companyId' in team && team.companyId)
    {
      if (!(await this.companyService.companyExists(team.companyId.toString()))) {
        throw new ConflictException('Company not found');
      }
    }
  
  if ('teamMembers' in team && team.teamMembers) {
    for (const memberId of team.teamMembers) {
      if (!(await this.employeeService.employeeExists(memberId.toString()))) {
        throw new ConflictException(`Team member ${memberId.toString()} not found`);
      }
    }
  }

  if ('teamLeaderId' in team && team.teamLeaderId) {
    if (!(await this.employeeService.employeeExists(team.teamLeaderId.toString()))) {
      throw new ConflictException('Team leader not found');
    }
  }

  if ('currentJobAssignments' in team && team.currentJobAssignments) {
    for (const jobId of team.currentJobAssignments) {
      if (!(await this.jobService.jobExists(jobId.toString()))) {
        throw new ConflictException(`Job assignment ${jobId.toString()} not found`);
      }
    }
  }
}

  async create(createTeamDto: CreateTeamDto) {
    await this.validateTeam(createTeamDto)

    const company = await this.companyService.findById(createTeamDto.companyId,);
    const teamLeader = await this.employeeService.findById(createTeamDto.teamLeaderId);
    const teamMembers = await this.employeeService.findByIds(createTeamDto.teamMembers);

    if (!company || !teamLeader || !teamMembers) {
      throw new ConflictException('Invalid ID given');
    }

    const newRole = new Team(createTeamDto);

    newRole.teamName = createTeamDto.teamName;
    newRole.companyId = createTeamDto.companyId;
    newRole.teamLeaderId = createTeamDto.teamLeaderId;
    newRole.teamMembers = createTeamDto.teamMembers;

    const model = new this.teamModel(newRole);
    const result = await model.save();
    return `${result}`;
  }

  async findAll() {
    try {
      return this.teamModel.find().exec();
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Teams could not be retrieved');
    }
  }

  async findOne(id: string) {
    return this.teamModel.findById(id);
  }

  async teamExists(id: string): Promise<boolean> {
    const result: FlattenMaps<Team> & { _id: Types.ObjectId } =
      await this.teamModel
        .findOne({
          $and: [
            { _id: id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();
    return result != null;
  }

  async findById(
    identifier: string | Types.ObjectId,
  ): Promise<FlattenMaps<Team> & { _id: Types.ObjectId }> {
    const result: FlattenMaps<Team> & { _id: Types.ObjectId } =
      await this.teamModel
        .findOne({
          $and: [
            { _id: identifier },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();

    if (result == null) {
      throw new NotFoundException('Company not found');
    }

    return result;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    await this.validateTeam(updateTeamDto)

    const previousObject: FlattenMaps<Team> & { _id: Types.ObjectId } =
      await this.teamModel
        .findOneAndUpdate(
          {
            $and: [
              { _id: id },
              {
                $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
              },
            ],
          },
          { $set: { ...updateTeamDto }, updatedAt: new Date() },
        )
        .lean();
    return previousObject;
  }

  async remove(id: string): Promise<boolean> {
    const TeamToDelete = await this.findOne(id);
    
    const result: Document<unknown, NonNullable<unknown>, User> &
      User & { _id: Types.ObjectId } =
      await this.teamModel.findOneAndUpdate(
        {
          $and: [
            { _id: TeamToDelete._id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        },
        { $set: { deletedAt: new Date() } },
      );

    if (result == null) {
      throw new InternalServerErrorException('Internal server Error');
    }
    return true;
  }
}
