import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
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
    private jobService: JobService,
    private teamService: TeamService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    if (
      !(await this.usersService.userIdExists(
        createEmployeeDto.userId.toString(),
      ))
    ) {
      throw new ConflictException('User not found');
    }

    if (
      !(await this.companyService.companyExists(
        createEmployeeDto.companyId.toString(),
      ))
    ) {
      throw new ConflictException('Company not found');
    }

    if (
      !(await this.roleService.roleExists(
        createEmployeeDto.roleId.toString(),
      ))
    ) {
      throw new ConflictException('Role not found');
    }

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
    if (!(await this.roleService.roleExists(updateEmployeeDto.roleId.toString(),))){
      throw new ConflictException('Role not found');
    }
    if (!(await this.employeeExists(updateEmployeeDto.superiorId.toString(),))){
      throw new ConflictException('Employee not found');
    }
    if (!(await this.jobService.jobExists(updateEmployeeDto.addJobId.toString(),))){
      throw new ConflictException('Job not found');
    }
    if (!(await this.employeeExists(updateEmployeeDto.addSubordinateId.toString(),))){
      throw new ConflictException('Employee not found');
    }
    if (!(await this.teamService.teamExists(updateEmployeeDto.addTeamId.toString(),))){
      throw new ConflictException('Team not found');
    }
    if (!(await this.jobService.jobExists(updateEmployeeDto.removeJobId.toString(),))){
      throw new ConflictException('Job not found');
    }
    if (!(await this.employeeExists(updateEmployeeDto.removeSubordinateId.toString(),))){
      throw new ConflictException('Employee not found');
    }
    if (!(await this.teamService.teamExists(updateEmployeeDto.removeTeamId.toString(),))){
      throw new ConflictException('Team not found');
    }

    const role = await this.roleService.findById(updateEmployeeDto.roleId);
    const superior = await this.employeeModel.findById(updateEmployeeDto.superiorId);
    const addJob = await this.jobService.findJobById(updateEmployeeDto.addJobId.toString());
    const addSubordinate = await this.employeeModel.findById(updateEmployeeDto.addSubordinateId);
    const addTeam = await this.teamService.findById(updateEmployeeDto.addTeamId);
    const removeJob = await this.jobService.findJobById(updateEmployeeDto.removeJobId.toString());
    const removeSubordinate = await this.employeeModel.findById(updateEmployeeDto.removeSubordinateId);
    const removeTeam = await this.teamService.findById(updateEmployeeDto.removeTeamId);

    if (!role || !superior || !addJob || !addSubordinate || !addTeam || !removeJob || !removeSubordinate || !removeTeam) {
      throw new ConflictException('Invalid ID given');
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
    
    if (addJob) {
      await this.employeeModel.updateOne(
        { _id: id },
        { $addToSet: { jobs: addJob._id } }
      );
    }
    if (addSubordinate) {
      await this.employeeModel.updateOne(
        { _id: id },
        { $addToSet: { subordinates: addSubordinate._id } }
      );
      await this.employeeModel.updateOne(
        { _id: addSubordinate._id },
        { $set: { superior: id } }
      );
    }
    if (addTeam) {
      await this.employeeModel.updateOne(
        { _id: id },
        { $addToSet: { teams: addTeam._id } }
      );
    }
    if (removeJob) {
      await this.employeeModel.updateOne(
        { _id: id },
        { $pull: { jobs: removeJob._id } }
      );
    }
    if (removeSubordinate) {
      await this.employeeModel.updateOne(
        { _id: id },
        { $pull: { subordinates: removeSubordinate._id } }
      );
      await this.employeeModel.updateOne(
        { _id: removeSubordinate._id },
        { $unset: { superior: "" } }
      );
    }
    if (removeTeam) {
      await this.employeeModel.updateOne(
        { _id: id },
        { $pull: { teams: removeTeam._id } }
      );
    }
    
    return previousObject;
  }

  async remove(id: string): Promise<boolean> {
    const employeeToDelete = await this.findOne(id);
    //const removeFromCompany = await this.companyService.remove(id);
    //const removeFromUser = await this.usersService.softDelete();

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

  async removeAllWithUserId(id: string): Promise<boolean> {
    const employeesToDelete = await this.employeeModel.updateMany(
      {
        userId: id,
      },
      { $set: { deletedAt: new Date() } },
    );
    //const removeFromCompany = await this.companyService.remove(id);
    //const removeFromUser = await this.usersService.softDelete();
    console.log(employeesToDelete);
    if (employeesToDelete == null) {
      throw new InternalServerErrorException('Internal server Error');
    }
    return true;
  }
}
