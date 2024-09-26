import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto, AddTeamMembersDto, RemoveTeamMembersDto, InternalUpdateTeamDto } from './dto/update-team.dto';
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

  async update(id: Types.ObjectId, updateTeamDto: InternalUpdateTeamDto) {
    const validation = await this.validateUpdateTeam(id, updateTeamDto);

    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    const updateDto = new InternalUpdateTeamDto();
    updateDto.teamName = updateTeamDto.teamName;
    updateDto.teamLeaderId = updateTeamDto.teamLeaderId;
    updateDto.currentJobAssignments = updateTeamDto.currentJobAssignments;
    return this.teamRepository.update(id, updateDto);
  }

  async addTeamMembers(id: Types.ObjectId, addTeamMembersDto: AddTeamMembersDto) {
    console.log('In add team members');
    console.log('id: ', id);
    console.log('addTeamMembersDto: ', addTeamMembersDto);
    const team = await this.findById(id);
    if (!team) {
      throw new Error('Team not found');
    }
    console.log('addTeamMembersDto.newTeamMembers: ', addTeamMembersDto.newTeamMembers);
    for (const memberId of addTeamMembersDto.newTeamMembers) {
      if (!(await this.employeeService.employeeExists(memberId))) {
        throw new Error('Employee not found');
      }
      if (team.teamLeaderId == memberId) {
        throw new Error('Employee is already the team leader');
      }
    }
    const newList = team.teamMembers;

    for (const memberId of addTeamMembersDto.newTeamMembers) {
      if (!team.teamMembers.includes(memberId)) {
        newList.push(new Types.ObjectId(memberId));
      }
    }

    console.log('newList: ', newList);

    const updateDto = new InternalUpdateTeamDto();
    updateDto.teamMembers = newList;
    return await this.teamRepository.update(id, updateDto);
  }

  async removeTeamMembers(id: Types.ObjectId, removeTeamMembersDto: RemoveTeamMembersDto) {
    console.log('In remove team members');

    const team = await this.findById(id);
    if (!team) {
      throw new Error('Team not found');
    }

    for (const memberId of removeTeamMembersDto.teamMembersToBeRemoved) {
      if (!(await this.employeeService.employeeExists(memberId))) {
        throw new Error('Employee not found');
      }
      if (team.teamLeaderId == memberId) {
        throw new Error('Employee is the team leader. Please change the team leader first');
      }
    }
    console.log('team.teamMembers: ', team.teamMembers);

    const newList = team.teamMembers;

    for (const memberId of removeTeamMembersDto.teamMembersToBeRemoved) {
      console.log('memberId: ', memberId);
      if (team.teamMembers.map((x) => x.toString()).includes(memberId.toString())) {
        console.log('In if');
        newList.splice(newList.indexOf(memberId), 1);
      }
    }

    console.log('newList: ', newList);

    const updateDto = new InternalUpdateTeamDto();
    updateDto.teamMembers = newList;
    return await this.teamRepository.update(id, updateDto);
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    //Removing the team from all jobs
    await this.jobService.removeAllReferencesToTeam(id);
    //Removing the team from all employees
    await this.removeEmployeeReferences(id);

    //checking if the team exists
    if (!(await this.teamExists(id))) {
      throw new Error('Team not found');
    }
    return this.teamRepository.remove(id);
  }

  async removeEmployeeReferences(employeeId: Types.ObjectId) {
    const listOfTeams = await this.teamRepository.findAllWithEmployeeId(employeeId);

    for (const team of listOfTeams) {
      if (team.teamLeaderId == employeeId) {
        const updateDto = new InternalUpdateTeamDto();
        updateDto.teamLeaderId = null;
        await this.teamRepository.update(team._id, updateDto);
      } else {
        const updateDto = new InternalUpdateTeamDto();
        updateDto.teamMembers = team.teamMembers.filter((x) => x.toString() != employeeId.toString());
        await this.teamRepository.update(team._id, updateDto);
      }
    }
  }
}
