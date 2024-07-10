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
    companyId?: Types.ObjectId,
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
        companyId = employee.companyId;
      }

      // console.log('Company ID: ' + companyId);

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
          !(await this.employeeExistsForCompany(employee.superiorId, companyId))
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
              companyId.toString(),
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
            !(await this.employeeExistsForCompany(subordinateId, companyId))
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
    // console.log('create function');
    try {
      await this.validateEmployee(createEmployeeDto);
      //Checking if the user is in the company
    } catch (error) {
      // console.log('error -> ', error);
      throw new InternalServerErrorException(error);
    }

    // checking if the user exists in the company
    const user = await this.usersService.getUserById(createEmployeeDto.userId);
    if (user._id == createEmployeeDto.userId)
      throw new InternalServerErrorException('Duplicate user');

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

    return result;
  }

  async findAll() {
    return await this.employeeRepository.findAll();
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    return await this.employeeRepository.findAllInCompany(companyId);
  }

  async employeeExists(id: Types.ObjectId): Promise<boolean> {
    return await this.employeeRepository.employeeExists(id);
  }

  async employeeExistsForCompany(
    id: Types.ObjectId,
    companyId: Types.ObjectId,
  ): Promise<boolean> {
    return await this.employeeRepository.employeeExistsForCompany(
      id,
      companyId,
    );
  }

  async update(id: Types.ObjectId, updateEmployeeDto: UpdateEmployeeDto) {
    // console.log('update function');
    try {
      const companyId = await this.getCompanyIdFromEmployee(id);
      await this.validateEmployee(updateEmployeeDto, companyId);
    } catch (error) {
      // console.log('error -> ', error);
      return `${error}`;
    }
    const previousObject = this.employeeRepository.update(
      id,
      updateEmployeeDto,
    );
    return previousObject;
  }

  async getCompanyIdFromEmployee(employeeId: Types.ObjectId) {
    return this.employeeRepository.getCompanyIdFromEmployee(employeeId);
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    return await this.employeeRepository.remove(id);
  }

  async findById(
    id: Types.ObjectId,
  ): Promise<FlattenMaps<Employee> & { _id: Types.ObjectId }> {
    const result = await this.employeeRepository.findById(id);

    if (result == null) {
      throw new NotFoundException('Employee not found');
    }
    return result;
  }

  async findByIds(
    ids: Types.ObjectId[],
  ): Promise<(FlattenMaps<Employee> & { _id: Types.ObjectId })[]> {
    const result = await this.employeeRepository.findByIds(ids);
    if (result.length === 0) {
      throw new NotFoundException('Employees not found');
    }
    return result;
  }

  async getSuperior(id: Types.ObjectId) {
    const employee = await this.findById(id);
    if (employee.superiorId) {
      return this.findById(employee.superiorId);
    }
    return null;
  }

  async getSubordinates(id: Types.ObjectId) {
    const employee = await this.findById(id);
    if (employee.subordinates) {
      return this.findByIds(employee.subordinates);
    }
    return [];
  }

  async getListOfOtherEmployees(id: Types.ObjectId, companyId: Types.ObjectId) {
    //Return a list of all the employees in the company that is not a superior or subordinate of the employee with the given id
    const currentSuperior = await this.getSuperior(id);
    const currentSubordinates = await this.getSubordinates(id);
    const allEmployees = await this.findAllInCompany(companyId);

    // Creating a list of all employees that does not contain the current superior or current subordinates
    const potentialSuperiors = allEmployees.filter(
      (employee) =>
        employee._id.toString() !== id.toString() &&
        employee._id.toString() !== currentSuperior._id.toString() &&
        !currentSubordinates.some(
          (subordinate) =>
            subordinate._id.toString() !== employee._id.toString(),
        ),
    );

    return potentialSuperiors;
  }
}
