import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Types, FlattenMaps } from 'mongoose';
import { Team } from './entities/team.entity';
import { EmployeeService } from '../employee/employee.service';
import { CompanyService } from '../company/company.service';
import { JobService } from '../job/job.service';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamService {
  constructor(
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    @Inject(forwardRef(() => JobService))
    private jobService: JobService,
    @Inject(forwardRef(() => TeamRepository))
    private teamRepository: TeamRepository,
  ) {}

  async validateCreateTeam(team: CreateTeamDto) {
    // Check if the company exists
    if (!(await this.companyService.companyIdExists(team.companyId))) {
      throw new ConflictException('Company not found');
    }

    // Check if the team members exist in the company
    for (const memberId of team.teamMembers) {
      if (
        !(await this.employeeService.employeeExistsForCompany(
          memberId,
          team.companyId,
        ))
      ) {
        throw new ConflictException(
          `Team member ${memberId.toString()} not found`,
        );
      }
    }

    // Check if the team leader exists in the company
    if ('teamLeaderId' in team && team.teamLeaderId) {
      if (
        !(await this.employeeService.employeeExistsForCompany(
          team.teamLeaderId,
          team.companyId,
        ))
      ) {
        throw new ConflictException('Team leader not found');
      }
    }

    // Check if the team already exists in the company
    if (
      (await this.findByNameInCompany(team.teamName, team.companyId)) != null
    ) {
      throw new ConflictException('Team already exists');
    }
  }

  async validateUpdateTeam(teamId: Types.ObjectId, team: UpdateTeamDto) {
    // Getting the company ID from the team
    const teamTemp = await this.findById(teamId);
    const companyId = teamTemp.companyId;
    console.log('companyId: ', companyId);
    console.log('one');
    // Check if the team exists in the company
    if ('teamMembers' in team && team.teamMembers) {
      console.log('A');
      for (const memberId of team.teamMembers) {
        console.log('member: ', memberId);
        if (
          !(await this.employeeService.employeeExistsForCompany(
            memberId,
            companyId,
          ))
        ) {
          throw new ConflictException(
            `Team member ${memberId.toString()} not found`,
          );
        }
      }
    }
    console.log('two');
    // Check if the team leader exists in the company
    if ('teamLeaderId' in team && team.teamLeaderId) {
      if (!(await this.employeeService.employeeExists(team.teamLeaderId))) {
        throw new ConflictException('Team leader not found');
      }
    }
    console.log('three');
    // Check if the jobs exist in the company
    if ('currentJobAssignments' in team && team.currentJobAssignments) {
      for (const jobId of team.currentJobAssignments) {
        if (!(await this.jobService.jobExistsInCompany(jobId, companyId))) {
          throw new ConflictException(
            `Job assignment ${jobId.toString()} not found`,
          );
        }
      }
    }
    console.log('four');
    // Check if the team already exists in the company

    if ((await this.findByNameInCompany(team.teamName, companyId)) != null) {
      throw new ConflictException('Team already exists');
    }
  }

  async create(createTeamDto: CreateTeamDto) {
    // console.log('In the service \n createTeamDto: ', createTeamDto);
    await this.validateCreateTeam(createTeamDto);
    // console.log('Validated');

    const newRole = new Team(createTeamDto);
    newRole.teamName = createTeamDto.teamName;
    newRole.companyId = createTeamDto.companyId;
    newRole.teamLeaderId = createTeamDto.teamLeaderId;
    newRole.teamMembers = createTeamDto.teamMembers;
    console.log('New team created');

    return await this.teamRepository.save(newRole);
  }

  async findAll() {
    return this.teamRepository.findAll();
  }

  async findById(
    identifier: Types.ObjectId,
  ): Promise<FlattenMaps<Team> & { _id: Types.ObjectId }> {
    const result = await this.teamRepository.findById(identifier);
    return result;
  }

  async findByNameInCompany(name: string, companyId: Types.ObjectId) {
    const result = await this.teamRepository.findByNameInCompany(
      name,
      companyId,
    );
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
    console.log(
      'In update service.\n id: ',
      id,
      '\n updateDTO: ',
      updateTeamDto,
    );
    await this.validateUpdateTeam(id, updateTeamDto);
    console.log('validate complete');
    return this.teamRepository.update(id, updateTeamDto);
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    return this.teamRepository.remove(id);
  }
}
