import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateEmployeeDto, createEmployeeResponseDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types, FlattenMaps } from 'mongoose';
import { Employee } from './entities/employee.entity';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { RoleService } from '../role/role.service';
import { JobService } from '../job/job.service';
import { TeamService } from '../team/team.service';                                         
import { User } from '../users/entities/user.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private companyService: CompanyService,
    private roleService: RoleService,
    @Inject(forwardRef(() => JobService)) 
    private jobService: JobService,
    private teamService: TeamService,
  ) {}

  async validateEmployee(employee: Employee | CreateEmployeeDto | UpdateEmployeeDto, companyId?: string) {
    if (!companyId && !('companyId' in employee)) //Potentially not neccesarry
    {
      if (employee.roleId) {
        if (!(await this.roleService.roleExists(employee.roleId.toString()))) {
          throw new ConflictException('Role not found');
        }
      }

      if (employee.superiorId) {
        if (!(await this.employeeExists(employee.superiorId.toString()))) {
          throw new ConflictException('Superior not found');
        }
      }

      if ('currentJobAssignments' in employee && employee.currentJobAssignments) {
        for (const jobId of employee.currentJobAssignments) {
          if (!(await this.jobService.jobExists(jobId.toString()))) {
            throw new ConflictException(`Job assignment ${jobId.toString()} not found`);
          }
        }
      }

      if ('subordinates' in employee && employee.subordinates) {
        for (const subordinateId of employee.subordinates) {
          if (!(await this.employeeExists(subordinateId.toString()))) {
            throw new ConflictException(`Subordinate ${subordinateId.toString()} not found`);
          }
        }
      }

      if ('subordinateTeams' in employee && employee.subordinateTeams) {
        for (const teamId of employee.subordinateTeams) {
          if (!(await this.teamService.teamExists(teamId.toString()))) {
              throw new ConflictException(`Subordinate team ${teamId.toString()} not found`);
            }
          }
      }
    }
    else
    {
      if (!companyId && 'companyId' in employee && employee.companyId)
      {
        companyId = employee.companyId.toString();
      }

      console.log('Company ID: ' + companyId);

      if (employee.roleId) {
        if (!(await this.roleService.roleExistsInCompany(employee.roleId.toString(), companyId))) {
          throw new ConflictException('Role not found');
        }
      }

      if (employee.superiorId) {
        if (!(await this.employeeExistsForCompany(employee.superiorId.toString(), companyId))) {
          throw new ConflictException('Superior not found');
        }
      }

      if ('currentJobAssignments' in employee && employee.currentJobAssignments) {
        for (const jobId of employee.currentJobAssignments) {
          if (!(await this.jobService.jobExistsInCompany(jobId.toString(), companyId))) {
            throw new ConflictException(`Job assignment ${jobId.toString()} not found`);
          }
        }
      }

      if ('subordinates' in employee && employee.subordinates) {
        for (const subordinateId of employee.subordinates) {
          if (!(await this.employeeExistsForCompany(subordinateId.toString(), companyId))) {
            throw new ConflictException(`Subordinate ${subordinateId.toString()} not found`);
          }
        }
      }

      if ('subordinateTeams' in employee && employee.subordinateTeams) {
        for (const teamId of employee.subordinateTeams) {
          if (!(await this.teamService.teamExistsInCompany(teamId.toString(), companyId))) {
            throw new ConflictException(`Subordinate team ${teamId.toString()} not found`);
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
      await this.validateEmployee(createEmployeeDto)
    }
    catch (error) { 
      console.log('error -> ', error);
      return `${error}`;
    }

    const newEmployee = new Employee(createEmployeeDto);
    newEmployee.userId = createEmployeeDto.userId;
    newEmployee.companyId = createEmployeeDto.companyId;
    if (createEmployeeDto.roleId)
    {
      newEmployee.roleId = createEmployeeDto.roleId;
    }
    if (createEmployeeDto.superiorId)
    {
      newEmployee.superiorId = createEmployeeDto.superiorId;
    }
    
    const model = new this.employeeModel(newEmployee);
    const result = await model.save();
    return `${result}`;
  }

  async findAll() {
    try {
      return this.employeeModel.find().exec();
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Employees could not be retrieved');
    }
  }

  async findAllInCompany(companyId: string) {
    try {
      const filter = companyId ? { companyId: companyId } : {};
      return this.employeeModel.find(filter).exec();
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Employees could not be retrieved');
    }
  }

  async findOne(id: string) {
    return this.employeeModel.findById(id);
  }

  async employeeExists(id: string): Promise<boolean> {
    const result: FlattenMaps<Employee> & { _id: Types.ObjectId } =
      await this.employeeModel
        .findOne({
          $and: [
            { _id: id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();

    console.log('employeeExists -> ', result);
    return result == null;
  }

  async employeeExistsForCompany(id: string, companyId: string): Promise<boolean> {
    const result: FlattenMaps<Employee> & { _id: Types.ObjectId } =
      await this.employeeModel
        .findOne({
          $and: [
            { _id: new Types.ObjectId(id) },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();
    if (result != null && result.companyId.toString() == companyId)
      return true;
    return false;  
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    console.log('update function');
    try {
      const companyId = await this.getCompanyIdFromEmployee(id);
      await this.validateEmployee(updateEmployeeDto, companyId.toString())
    }
    catch (error) { 
      console.log('error -> ', error);
      return `${error}`;
    }

    const previousObject: FlattenMaps<Employee> & { _id: Types.ObjectId } =
      await this.employeeModel
        .findOneAndUpdate(
          {
            $and: [
              { _id: id },
              {
                $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
              },
            ],
          },
          { $set: { ...updateEmployeeDto }, updatedAt: new Date() },
        )
        .lean();
    
    return previousObject;
  }

  async getCompanyIdFromEmployee(employeeId: string){
  const result = await this.employeeModel
    .findOne(
      { _id: new Types.ObjectId(employeeId) },
      { companyId: 1, _id: 0 }
    )
    .lean();

  return result ? result.companyId : null;
}

  async remove(id: string): Promise<boolean> {
    const employeeToDelete = await this.findOne(id);

    const result: Document<unknown, NonNullable<unknown>, User> &
      User & { _id: Types.ObjectId } =
      await this.employeeModel.findOneAndUpdate(
        {
          $and: [
            { _id: employeeToDelete._id },
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
  async findById(
    identifier: string | Types.ObjectId,
  ): Promise<FlattenMaps<Employee> & { _id: Types.ObjectId }> {
    const result: FlattenMaps<Employee> & { _id: Types.ObjectId } =
      await this.employeeModel
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

  async findByIds(
  identifiers: (string | Types.ObjectId)[]
  ): Promise<(FlattenMaps<Employee> & { _id: Types.ObjectId })[]> {
    const ids = identifiers.map(id => new Types.ObjectId(id));
    
    const result: (FlattenMaps<Employee> & { _id: Types.ObjectId })[] = await this.employeeModel
      .find({
        $and: [
          { _id: { $in: ids } },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();

    if (result.length === 0) {
      throw new NotFoundException('Employees not found');
    }

    return result;
  }

  

}
