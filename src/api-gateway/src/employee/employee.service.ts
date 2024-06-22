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
import { Document, Model, Types } from 'mongoose';
import { Employee } from './entities/employee.entity';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,
    @Inject(forwardRef(() => UsersService))
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

  async findOne(id: string) {
    return this.employeeModel.findById(id);
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    console.log(updateEmployeeDto);
    return `This action updates a #${id} employee`;
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

  async employeeExists(assignedBy: Types.ObjectId) {
    console.log(assignedBy);
    return true; //TODO:Remove
  }
}
