import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FlattenMaps } from 'mongoose';
import { Team } from './entities/team.entity';
import { EmployeeService } from '../employee/employee.service';
import { CompanyService } from '../company/company.service';
import { JobService } from '../job/job.service';
import { TeamRepository } from './team.repository';

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
    @Inject(forwardRef(() => TeamRepository))
    private teamRepository: TeamRepository,
  ) {}

  async validateTeam(team: Team | CreateTeamDto | UpdateTeamDto) {
    if ('companyId' in team && team.companyId) {
      if (!(await this.companyService.companyIdExists(team.companyId))) {
        throw new ConflictException('Company not found');
      }
    }

    if ('teamMembers' in team && team.teamMembers) {
      for (const memberId of team.teamMembers) {
        if (!(await this.employeeService.employeeExists(memberId))) {
          throw new ConflictException(
            `Team member ${memberId.toString()} not found`,
          );
        }
      }
    }

    if ('teamLeaderId' in team && team.teamLeaderId) {
      if (!(await this.employeeService.employeeExists(team.teamLeaderId))) {
        throw new ConflictException('Team leader not found');
      }
    }

    if ('currentJobAssignments' in team && team.currentJobAssignments) {
      for (const jobId of team.currentJobAssignments) {
        if (!(await this.jobService.jobExists(jobId.toString()))) {
          throw new ConflictException(
            `Job assignment ${jobId.toString()} not found`,
          );
        }
      }
    }
  }

  async create(createTeamDto: CreateTeamDto) {
    console.log('In the service \n createTeamDto: ', createTeamDto);
    await this.validateTeam(createTeamDto);
    console.log('Validated');

    const company = await this.companyService.getCompanyById(
      createTeamDto.companyId,
    );
    const teamLeader = await this.employeeService.findById(
      createTeamDto.teamLeaderId,
    );
    const teamMembers = await this.employeeService.findByIds(
      createTeamDto.teamMembers,
    );

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
    return this.teamRepository.findAll();
  }

  async findById(
    identifier: string | Types.ObjectId,
  ): Promise<FlattenMaps<Team> & { _id: Types.ObjectId }> {
    const result = await this.teamRepository.findById(identifier);
    if (result == null) {
      throw new NotFoundException('Company not found');
    }
    return result;
  }

  async teamExists(id: Types.ObjectId): Promise<boolean> {
    return await this.teamRepository.teamExists(id);
  }

  async teamExistsInCompany(
    id: Types.ObjectId,
    companyId: Types.ObjectId,
  ): Promise<boolean> {
    return this.teamRepository.teamExistsInCompany(id, companyId);
  }

  async update(id: Types.ObjectId, updateTeamDto: UpdateTeamDto) {
    await this.validateTeam(updateTeamDto);
    return this.teamRepository.update(id, updateTeamDto);
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    return this.teamRepository.remove(id);
  }
}
