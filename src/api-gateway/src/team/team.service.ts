import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Types } from 'mongoose';
import { Team } from './entities/team.entity';
import { EmployeeService } from '../employee/employee.service';
import { CompanyService } from '../company/company.service';
import { JobService } from '../job/job.service';
import { TeamRepository } from './team.repository';
import { ValidationResult } from '../auth/entities/validationResult.entity';

@Injectable()
export class TeamService {
  constructor(
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
    @Inject(forwardRef(() => CompanyService))
    private companyService: CompanyService,
    @Inject(forwardRef(() => JobService))
    private jobService: JobService,
    @Inject(forwardRef(() => TeamRepository))
    private teamRepository: TeamRepository,
  ) {}

  async validateCreateTeam(team: CreateTeamDto) {
    // Check if the company exists
    if (!(await this.companyService.companyIdExists(team.companyId))) {
      return new ValidationResult(false, `Company not found`);
    }

    // Check if the team members exist in the company
    for (const memberId of team.teamMembers) {
      if (!(await this.employeeService.employeeExistsForCompany(memberId, team.companyId))) {
        return new ValidationResult(false, `Team member not found`);
      }
    }

    // Check if the team leader exists in the company
    if ('teamLeaderId' in team && team.teamLeaderId) {
      if (!(await this.employeeService.employeeExistsForCompany(team.teamLeaderId, team.companyId))) {
        return new ValidationResult(false, `Team leader not found`);
      }
    }

    // Check if the team already exists in the company
    if ((await this.findByNameInCompany(team.teamName, team.companyId)) != null) {
      return new ValidationResult(false, `Team already exists`);
    }

    return new ValidationResult(true, `All good`);
  }

  async validateUpdateTeam(teamId: Types.ObjectId, team: UpdateTeamDto) {
    // Check if the team exists
    if (!(await this.teamExists(teamId))) {
      return new ValidationResult(false, `Team not found`);
    }

    // Getting the company ID from the team
    const teamTemp = await this.findById(teamId);
    const companyId = teamTemp.companyId;

    // Check if the team exists in the company
    if ('teamMembers' in team && team.teamMembers) {
      for (const memberId of team.teamMembers) {
        if (!(await this.employeeService.employeeExistsForCompany(memberId, companyId))) {
          return new ValidationResult(false, `Team member not found`);
        }
      }
    }
    // Check if the team leader exists in the company
    if ('teamLeaderId' in team && team.teamLeaderId) {
      if (!(await this.employeeService.employeeExists(team.teamLeaderId))) {
        return new ValidationResult(false, `Team leader not found`);
      }
    }
    // Check if the jobs exist in the company
    if ('currentJobAssignments' in team && team.currentJobAssignments) {
      for (const jobId of team.currentJobAssignments) {
        if (!(await this.jobService.jobExistsInCompany(jobId, companyId))) {
          return new ValidationResult(false, `Job assignment not found`);
        }
      }
    }
    // Check if the team already exists in the company
    if ((await this.findByNameInCompany(team.teamName, companyId)) != null) {
      return new ValidationResult(false, `Team already exists`);
    }

    return new ValidationResult(true, `All good`);
  }

  async create(createTeamDto: CreateTeamDto) {
    const validation = await this.validateCreateTeam(createTeamDto);

    if (!validation.isValid) {
      throw new Error(validation.message);
    }

    const newRole = new Team(createTeamDto);
    newRole.teamName = createTeamDto.teamName;
    newRole.companyId = createTeamDto.companyId;
    newRole.teamLeaderId = createTeamDto.teamLeaderId;
    newRole.teamMembers = createTeamDto.teamMembers;

    return await this.teamRepository.save(newRole);
  }

  async findAll() {
    return this.teamRepository.findAll();
  }

  async findById(identifier: Types.ObjectId) {
    const result = await this.teamRepository.findById(identifier);
    return result;
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    return this.teamRepository.findAllInCompany(companyId);
  }
  async detailedFindAllInCompany(companyId: Types.ObjectId) {
    return this.teamRepository.detailedFindAllInCompany(companyId, ['teamMembers', 'teamLeaderId']);
  }

  async findByNameInCompany(name: string, companyId: Types.ObjectId) {
    //checking if the company exists
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('Company not found');
    }

    const result = await this.teamRepository.findByNameInCompany(name, companyId);
    return result;
  }

  async teamExists(id: Types.ObjectId): Promise<boolean> {
    return await this.teamRepository.teamExists(id);
  }

  async teamExistsInCompany(id: Types.ObjectId, companyId: Types.ObjectId): Promise<boolean> {
    //checking if the company exists
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('Company not found');
    }
    return this.teamRepository.teamExistsInCompany(id, companyId);
  }

  async update(id: Types.ObjectId, updateTeamDto: UpdateTeamDto) {
    const validation = await this.validateUpdateTeam(id, updateTeamDto);

    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    return this.teamRepository.update(id, updateTeamDto);
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    //checking if the team exists
    if (!(await this.teamExists(id))) {
      throw new Error('Team not found');
    }
    return this.teamRepository.remove(id);
  }
}
