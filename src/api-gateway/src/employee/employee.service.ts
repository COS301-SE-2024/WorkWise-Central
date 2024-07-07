import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FlattenMaps } from 'mongoose';
import { Employee } from './entities/employee.entity';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { RoleService } from '../role/role.service';
import { JobService } from '../job/job.service';
import { TeamService } from '../team/team.service';
import { EmployeeRepository } from './employee.repository';
// import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,

    // @InjectModel(User.name)
    // private readonly userModel: Model<User>,

    @Inject(forwardRef(() => EmployeeRepository))
    private readonly employeeRepository: EmployeeRepository,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly companyService: CompanyService,

    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService,

    @Inject(forwardRef(() => JobService))
    private readonly jobService: JobService,

    private teamService: TeamService,
  ) {}

  async validateEmployee(
    employee: Employee | CreateEmployeeDto | UpdateEmployeeDto,
    companyId?: string,
  ) {
    if (!companyId && !('companyId' in employee)) {
      //Potentially not necessary
      if (employee.roleId) {
        if (!(await this.roleService.roleExists(employee.roleId))) {
          throw new ConflictException('Role not found');
        }
      }

      if (employee.superiorId) {
        if (!(await this.employeeExists(employee.superiorId))) {
          throw new ConflictException('Superior not found');
        }
      }

      if (
        'currentJobAssignments' in employee &&
        employee.currentJobAssignments
      ) {
        for (const jobId of employee.currentJobAssignments) {
          if (!(await this.jobService.jobExists(jobId.toString()))) {
            throw new ConflictException(
              `Job assignment ${jobId.toString()} not found`,
            );
          }
        }
      }

      if ('subordinates' in employee && employee.subordinates) {
        for (const subordinateId of employee.subordinates) {
          if (!(await this.employeeExists(subordinateId))) {
            throw new ConflictException(
              `Subordinate ${subordinateId} not found`,
            );
          }
        }
      }

      if ('subordinateTeams' in employee && employee.subordinateTeams) {
        for (const teamId of employee.subordinateTeams) {
          if (!(await this.teamService.teamExists(teamId))) {
            throw new ConflictException(`Subordinate team ${teamId} not found`);
          }
        }
      }
    } else {
      if (!companyId && 'companyId' in employee && employee.companyId) {
        companyId = employee.companyId.toString();
      }

      console.log('Company ID: ' + companyId);

      if (employee.roleId) {
        if (
          !(await this.roleService.roleExistsInCompany(
            employee.roleId,
            companyId,
          ))
        ) {
          throw new ConflictException('Role not found');
        }
      }

      if (employee.superiorId) {
        if (
          !(await this.employeeExistsForCompany(
            employee.superiorId.toString(),
            companyId,
          ))
        ) {
          throw new ConflictException('Superior not found');
        }
      }

      if (
        'currentJobAssignments' in employee &&
        employee.currentJobAssignments
      ) {
        for (const jobId of employee.currentJobAssignments) {
          if (
            !(await this.jobService.jobExistsInCompany(
              jobId.toString(),
              companyId,
            ))
          ) {
            throw new ConflictException(
              `Job assignment ${jobId.toString()} not found`,
            );
          }
        }
      }

      if ('subordinates' in employee && employee.subordinates) {
        for (const subordinateId of employee.subordinates) {
          if (
            !(await this.employeeExistsForCompany(
              subordinateId.toString(),
              companyId,
            ))
          ) {
            throw new ConflictException(
              `Subordinate ${subordinateId.toString()} not found`,
            );
          }
        }
      }

      if ('subordinateTeams' in employee && employee.subordinateTeams) {
        for (const teamId of employee.subordinateTeams) {
          if (
            !(await this.teamService.teamExistsInCompany(teamId, companyId))
          ) {
            throw new ConflictException(
              `Subordinate team ${teamId.toString()} not found`,
            );
          }
        }
      }
    }

    if ('userId' in employee && employee.userId) {
      if (!(await this.usersService.userIdExists(employee.userId.toString()))) {
        throw new ConflictException('User not found');
      }
    }
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    console.log('create function');
    try {
      await this.validateEmployee(createEmployeeDto);
    } catch (error) {
      console.log('error -> ', error);
      throw new InternalServerErrorException(error);
    }

    const newEmployee = new Employee(createEmployeeDto);
    newEmployee.userId = createEmployeeDto.userId;
    newEmployee.companyId = createEmployeeDto.companyId;
    if (createEmployeeDto.roleId) {
      newEmployee.roleId = createEmployeeDto.roleId;
    }
    if (createEmployeeDto.superiorId) {
      newEmployee.superiorId = createEmployeeDto.superiorId;
    }

    const model = new this.employeeModel(newEmployee);
    const result = await model.save();

    //Adding Employee to User
    const relatedUser = await this.usersService.getUserById(newEmployee.userId);
    relatedUser.employeeIds.push(result._id);
    await this.usersService.updateUser(newEmployee.userId, {
      employeeIds: relatedUser.employeeIds,
    });
    //
    return result;
  }

  async findAll() {
    return this.employeeRepository.findAll();
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    return this.employeeRepository.findAllInCompany(companyId);
  }

  async employeeExists(id: Types.ObjectId): Promise<boolean> {
    return this.employeeRepository.employeeExists(id);
  }

  async employeeExistsForCompany(
    id: string,
    companyId: string,
  ): Promise<boolean> {
    return this.employeeRepository.employeeExistsForCompany(id, companyId);
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    console.log('update function');
    try {
      const companyId = await this.getCompanyIdFromEmployee(id);
      await this.validateEmployee(updateEmployeeDto, companyId.toString());
    } catch (error) {
      console.log('error -> ', error);
      return `${error}`;
    }
    const previousObject = this.employeeRepository.update(
      id,
      updateEmployeeDto,
    );
    return previousObject;
  }

  async getCompanyIdFromEmployee(employeeId: string) {
    return this.employeeRepository.getCompanyIdFromEmployee(employeeId);
  }

  async remove(id: string): Promise<boolean> {
    const result = this.employeeRepository.remove(id);
    return result;
  }

  async findById(
    identifier: string | Types.ObjectId,
  ): Promise<FlattenMaps<Employee> & { _id: Types.ObjectId }> {
    const result = await this.employeeRepository.findById(identifier);
    if (result == null) {
      throw new NotFoundException('Employee not found');
    }
    return result;
  }

  async findByIds(
    identifiers: (string | Types.ObjectId)[],
  ): Promise<(FlattenMaps<Employee> & { _id: Types.ObjectId })[]> {
    const result = await this.employeeRepository.findByIds(identifiers);
    if (result.length === 0) {
      throw new NotFoundException('Employees not found');
    }
    return result;
  }
}
