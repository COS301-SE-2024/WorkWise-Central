import {
  ConflictException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './entities/employee.entity';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('employee')
    private readonly employeeModel: Model<Employee>,
    private usersService: UsersService,
    private companyService: CompanyService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    if (
      !(await this.usersService.userIdExists(
        createEmployeeDto.userId.toString(),
      ))
    ) {
      throw new ConflictException('User not found');
    }

    const user = await this.usersService.findUserById(createEmployeeDto.userId);
    const company = await this.companyService.findById(
      createEmployeeDto.companyId,
    );

    if (!user || !company) {
      throw new ConflictException('Invalid ID given');
    }
    const newEmployee = new Employee();

    newEmployee.userId = createEmployeeDto.userId;
    newEmployee.role = createEmployeeDto.role;
    const companyObject = await this.companyService.findById(
      createEmployeeDto.companyId,
    );
    newEmployee.company = {
      companyId: companyObject._id,
      companyLogo: companyObject.logo,
      companyName: companyObject.name,
    };
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

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    console.log(updateEmployeeDto);
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
