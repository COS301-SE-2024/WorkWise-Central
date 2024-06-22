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

  async validateEmployee(employee: Employee | CreateEmployeeDto | UpdateEmployeeDto) {
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

  if ('companyId' in employee && employee.companyId) {
    if (!(await this.companyService.companyExists(employee.companyId.toString()))) {
      throw new ConflictException('Company not found');
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

  if ('userId' in employee && employee.userId) {
    if (!(await this.usersService.userIdExists(employee.userId.toString()))) {
      throw new ConflictException('User not found');
    }
  }
}
  

  async create(createEmployeeDto: CreateEmployeeDto) {

    await this.validateEmployee(createEmployeeDto);

    const user = await this.usersService.findUserById(createEmployeeDto.userId);
    const company = await this.companyService.findById(createEmployeeDto.companyId,);
    const role = await this.roleService.findById(createEmployeeDto.roleId);

    if (!user || !company || !role) {
      throw new ConflictException('Invalid ID given');
    }

    const newEmployee = new Employee(createEmployeeDto);
    newEmployee.userId = createEmployeeDto.userId;
    newEmployee.roleId = createEmployeeDto.roleId;

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

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<FlattenMaps<Employee> & { _id: Types.ObjectId }> {
    await this.validateEmployee(updateEmployeeDto);
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
