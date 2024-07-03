import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateCompanyDto,
  CreateCompanyResponseDto,
} from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';
import { Company } from './entities/company.entity';
import { User } from '../users/entities/user.entity';
import { AddUserToCompanyDto } from './dto/add-user-to-company.dto';
import { CompanyRepository } from './company.repository';
import { ValidationResult } from '../auth/entities/validationResult.entity';
import { EmployeeService } from '../employee/employee.service';
import { RoleService } from '../role/role.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly companyRepository: CompanyRepository,
    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,
    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    if (
      (await this.companyRegNumberExists(
        createCompanyDto.registrationNumber,
      )) == false
    ) {
      throw new ConflictException(
        `Company with ${createCompanyDto.registrationNumber} already
         exists,please enter another one or sign in`,
      );
    }
    // createCompanyDto.createdAt = new Date();
    const newCompany = new Company(createCompanyDto);
    const newCompanyModel = new this.companyModel(newCompany);

    //Create first role in company
    const allPermissions = this.roleService.getPermissionsArray();

    const createdRole = await this.roleService.create({
      companyId: newCompanyModel._id,
      roleName: 'owner',
      permissionSuite: allPermissions,
    });

    const result = await newCompanyModel.save();

    await this.employeeService.create({
      userId: createCompanyDto.userId,
      companyId: result._id,
      superiorId: null,
      roleId: createdRole._id,
    });

    return new CreateCompanyResponseDto(result);
  }

  async companyRegNumberExists(id: string): Promise<boolean> {
    return this.companyRepository.registrationNumberExists(id);
  }

  async companyIdExists(id: Types.ObjectId): Promise<boolean> {
    return this.companyRepository.idExists(id);
  }

  findAllCompanies() {
    return this.companyRepository.findAll();
  }

  async getCompanyById(
    identifier: string | Types.ObjectId,
  ): Promise<FlattenMaps<Company> & { _id: Types.ObjectId }> {
    const result: FlattenMaps<Company> & { _id: Types.ObjectId } =
      await this.companyRepository.findById(identifier);

    if (result == null) {
      throw new NotFoundException('Company not found');
    }

    return result;
  }

  async getByEmailOrName(identifier: string) {
    const result = await this.companyRepository.findByEmailOrName(identifier);

    if (result == null) {
      throw new NotFoundException('Client not found');
    }
    console.log(result);
    return result;
  }

  async employeeIsInCompany(compId: Types.ObjectId, empId: Types.ObjectId) {
    return await this.companyRepository.employeeExists(compId, empId);
  }

  async getCompanyByRegNumber(
    registrationNumber: string,
  ): Promise<FlattenMaps<Company> & { _id: Types.ObjectId }> {
    const result =
      await this.companyRepository.findByRegistrationNumber(registrationNumber);

    if (result == null) {
      throw new NotFoundException('Company not found');
    }

    return result;
  }

  //TODO:Add authorization for endpoint
  //For now, I assume the person is authorised
  async addEmployee(addUserDto: AddUserToCompanyDto) {
    //Add validation
    if (await this.companyIdExists(addUserDto.currentCompany)) {
      throw new NotFoundException(`Company not found`);
    }

    const newId = await this.userModel
      .findOne({
        'systemDetails.username': addUserDto.newEmployeeUsername,
      })
      .select('_id joinedCompanies');

    console.log(newId);
    if (newId == null) {
      throw new NotFoundException('User not found');
    }

    const resultOfUpdate = await this.companyModel
      .findByIdAndUpdate(
        { _id: addUserDto.currentCompany },
        {
          $push: { employees: newId._id },
        },
      )
      .lean();

    const currentCompanyId = new Types.ObjectId(addUserDto.currentCompany);

    const updateUser = await this.userModel.findByIdAndUpdate(
      { _id: newId._id },
      {
        $push: { joinedCompanies: currentCompanyId, employeeIds: newId._id },
      },
    );

    console.log(resultOfUpdate);
    console.log(updateUser);

    return resultOfUpdate != null;
  }

  async update(id: Types.ObjectId, updateCompanyDto: UpdateCompanyDto) {
    const inputValidated = await this.companyIsValid(updateCompanyDto);
    if (!inputValidated.isValid) {
      throw new NotFoundException(inputValidated.message);
    }

    const updatedCompany = await this.companyRepository.update(
      id,
      updateCompanyDto,
    );
    console.log(updatedCompany);
    return updatedCompany;
  }

  async deleteCompany(id: string): Promise<boolean> {
    await this.companyRepository.delete(id);
    return true;
  }

  async companyIsValid(company: Company | CreateCompanyDto | UpdateCompanyDto) {
    if (!company) return new ValidationResult(false, `Company is null`);
    if (company.inventoryItems) {
      for (const item of company.inventoryItems) {
        //TODO: When inventory is done//

        /* const exists = await this.InventoryService.employeeExists(item);
        if (!exists)
          return new ValidationResult(
            false,
            `Invalid Inventory ID: ${item}`,
          );*/
        if (!Types.ObjectId.isValid(item)) {
          return new ValidationResult(false, 'Invalid ObjectId in Inventory');
        }
      }
    }
    if (company.employees) {
      for (const employee of company.employees) {
        if (!Types.ObjectId.isValid(employee))
          return new ValidationResult(false, 'Employee ID is invalid');

        if (!(await this.employeeService.employeeExists(employee))) {
          return new ValidationResult(
            false,
            'Employee ID Not Found in Company',
          );
        }
      }
    }
  }

  async getAllEmployees(companyId: Types.ObjectId) {
    try {
      return this.employeeService.findAllInCompany(companyId);
    } catch (e) {
      throw e;
    }
  }
}
