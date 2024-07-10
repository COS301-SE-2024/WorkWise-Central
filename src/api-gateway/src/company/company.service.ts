import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateCompanyDto,
  CreateCompanyResponseDto,
} from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { FlattenMaps, Types } from 'mongoose';
import { Company } from './entities/company.entity';
import { JoinedCompany } from '../users/entities/user.entity';
import { AddUserToCompanyDto } from './dto/add-user-to-company.dto';
import { CompanyRepository } from './company.repository';
import { ValidationResult } from '../auth/entities/validationResult.entity';
import { EmployeeService } from '../employee/employee.service';
import { RoleService } from '../role/role.service';
import { UsersService } from '../users/users.service';
import { DeleteEmployeeFromCompanyDto } from './dto/delete-employee-in-company.dto';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const inputValidated = await this.companyCreateIsValid(createCompanyDto);
    if (!inputValidated.isValid) {
      throw new ConflictException(inputValidated.message);
    }
    //Create Company
    const createdCompany = await this.companyRepository.save(
      new Company(createCompanyDto),
    );

    //Create Default role in company
    await this.roleService.createDefaultRoles(createdCompany._id);

    //Assign Owner to user
    const ownerRoleId = (
      await this.roleService.findOneInCompany('Owner', createdCompany._id)
    )._id;

    const employee = await this.employeeService.create({
      userId: createCompanyDto.userId,
      companyId: createdCompany._id,
      superiorId: null,
      roleId: ownerRoleId,
    });

    const user = await this.usersService.getUserById(createCompanyDto.userId);
    const newJoinedCompany = new JoinedCompany(
      employee._id,
      createdCompany._id,
      createdCompany.name,
    );
    user.joinedCompanies.push(newJoinedCompany);
    await this.usersService.updateUser(user._id, {
      joinedCompanies: user.joinedCompanies,
      currentEmployee: employee._id,
    });

    createdCompany.employees.push(employee._id);
    await this.update(user._id, createdCompany.id, {
      employees: createdCompany.employees,
    });

    return new CreateCompanyResponseDto(createdCompany);
  }

  async companyRegNumberExists(registerNumber: string): Promise<boolean> {
    return this.companyRepository.registrationNumberExists(registerNumber);
  }

  async companyVatNumberExists(registerNumber: string): Promise<boolean> {
    return this.companyRepository.VatNumberExists(registerNumber);
  }

  async companyIdExists(id: Types.ObjectId): Promise<boolean> {
    return this.companyRepository.idExists(id);
  }

  getAllCompanies() {
    const fieldsToPopulate = ['employees'];
    return this.companyRepository.findAll(fieldsToPopulate);
  }

  async getAllEmployees(companyId: Types.ObjectId) {
    try {
      return this.employeeService.findAllInCompany(companyId);
    } catch (e) {
      throw e;
    }
  }

  async getCompanyById(
    identifier: Types.ObjectId,
  ): Promise<FlattenMaps<Company> & { _id: Types.ObjectId }> {
    const result = await this.companyRepository.findById(identifier);

    if (result == null) {
      throw new ConflictException('Company not found');
    }

    return result;
  }

  async getByEmailOrName(
    identifier: string,
  ): Promise<FlattenMaps<Company> & { _id: Types.ObjectId }> {
    const result = await this.companyRepository.findByEmailOrName(identifier);

    if (result == null) {
      throw new ConflictException('Client not found');
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
      throw new ConflictException('Company not found');
    }

    return result;
  }

  //TODO:Add authorization for endpoint
  //For now, I assume the person is authorised
  async addEmployee(addUserDto: AddUserToCompanyDto) {
    //Add validation
    const inputValidated = await this.addUserValidation(addUserDto); //TODO: Add more validation later
    if (!inputValidated.isValid) {
      throw new ConflictException(inputValidated.message);
    }

    const company = await this.getCompanyById(addUserDto.currentCompany);
    const companyName = company.name;

    const user = await this.usersService.getUserByUsername(
      addUserDto.newUserUsername,
    );
    //Ask about superiorId
    //CreateEmployee and link them to the company
    let addedEmployee: Employee & { _id: Types.ObjectId };
    if (addUserDto.roleId) {
      addedEmployee = await this.employeeService.create({
        companyId: addUserDto.currentCompany,
        userId: user._id,
        roleId: addUserDto.roleId,
      });
    } else {
      const defaultRole = await this.roleService.findOneInCompany(
        'Worker',
        addUserDto.currentCompany,
      );

      addedEmployee = await this.employeeService.create({
        companyId: addUserDto.currentCompany,
        userId: user._id,
        roleId: defaultRole._id,
      });
    }

    const joinedCompany: JoinedCompany = {
      companyId: addUserDto.currentCompany,
      employeeId: addedEmployee._id,
      companyName: companyName,
    };
    user.joinedCompanies.push(joinedCompany);

    const updatedUser = await this.usersService.updateUser(user._id, {
      joinedCompanies: user.joinedCompanies,
    });

    company.employees.push(addedEmployee._id);
    await this.update(user._id, company._id, { employees: company.employees });
    //TODO: UPdate
    console.log(updatedUser);
    return joinedCompany;
  }

  async update(
    userId: Types.ObjectId,
    companyId: Types.ObjectId,
    updateCompanyDto: UpdateCompanyDto,
  ) {
    const inputValidated = await this.companyUpdateIsValid(updateCompanyDto);
    if (!inputValidated.isValid) {
      throw new ConflictException(inputValidated.message);
    }

    if (!(await this.usersService.userIsInCompany(userId, companyId)))
      throw new UnauthorizedException('User not in company');

    const updatedCompany = await this.companyRepository.update(
      companyId,
      updateCompanyDto,
    );
    console.log(updatedCompany);
    return updatedCompany;
  }

  async deleteCompany(
    userId: Types.ObjectId,
    companyId: Types.ObjectId,
  ): Promise<boolean> {
    const user = await this.usersService.getUserById(userId);
    let empId: Types.ObjectId;
    for (const joinedCompany of user.joinedCompanies) {
      if (joinedCompany.companyId.equals(companyId)) {
        empId = joinedCompany.employeeId;
      }
    }
    const emp = await this.employeeService.findById(empId);
    const role = await this.roleService.findById(emp.roleId);

    if (role.roleName !== 'Owner') {
      throw new UnauthorizedException('Only the owner can perform this action');
    }

    const usersInCompany =
      await this.usersService.getAllUsersInCompany(companyId);

    for (const user of usersInCompany) {
      const newJoinedCompanies: JoinedCompany[] = [];

      for (const joinedCompany of user.joinedCompanies) {
        if (joinedCompany.companyId !== companyId) {
          //Create new list, without company
          newJoinedCompanies.push(joinedCompany);
        } else {
          //Delete the employee in Employee Table
          await this.employeeService.remove(joinedCompany.employeeId);
        }
      }
      await this.usersService.updateUser(user._id, {
        joinedCompanies: newJoinedCompanies,
      });
    }
    await this.companyRepository.delete(companyId);
    return true;
  }

  async addUserValidation(addUserToCompanyDto: AddUserToCompanyDto) {
    if (addUserToCompanyDto.currentCompany) {
      const idExists = await this.companyIdExists(
        addUserToCompanyDto.currentCompany,
      );
      if (!idExists) {
        return new ValidationResult(false, 'Company not found');
      }
    }

    if (addUserToCompanyDto.adminId) {
      const isAllowedToAssign = await this.employeeIsInCompany(
        addUserToCompanyDto.currentCompany,
        addUserToCompanyDto.adminId,
      );
      if (!isAllowedToAssign) {
        return new ValidationResult(false, 'User not allowed to assign');
      }
    }

    if (addUserToCompanyDto.newUserUsername) {
      const usernameExists = await this.usersService.usernameExists(
        addUserToCompanyDto.newUserUsername,
      );
      if (!usernameExists) {
        return new ValidationResult(false, 'Username not found');
      }

      const userJoinedCompanies = (
        await this.usersService.getUserByUsername(
          addUserToCompanyDto.newUserUsername,
        )
      ).joinedCompanies;

      for (const userJoinedCompany of userJoinedCompanies) {
        if (userJoinedCompany.companyId == addUserToCompanyDto.currentCompany) {
          return new ValidationResult(false, 'User already in Company');
        }
      }
    }

    return new ValidationResult(true);
  }

  async companyIsValid(company: Company) {
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

    return new ValidationResult(true);
  }

  async companyCreateIsValid(company: CreateCompanyDto) {
    if (!company) return new ValidationResult(false, `Company is null`);

    if (!(await this.usersService.userIdExists(company.userId))) {
      return new ValidationResult(false, `User not found`);
    }

    if (await this.companyVatNumberExists(company.vatNumber)) {
      return new ValidationResult(
        false,
        `Company with ${company.vatNumber} already exists`,
      );
    }

    if (await this.companyRegNumberExists(company.registrationNumber)) {
      return new ValidationResult(
        false,
        `Company with ${company.registrationNumber} already exists`,
      );
    }

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
    return new ValidationResult(true);
  }

  async companyUpdateIsValid(company: UpdateCompanyDto) {
    if (!company) return new ValidationResult(false, `Company is null`);

    if (company.registrationNumber) {
      if (!(await this.companyRegNumberExists(company.registrationNumber))) {
        return new ValidationResult(
          false,
          `Company with ${company.registrationNumber} does not exist`,
        );
      }
    }

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

    return new ValidationResult(true);
  }

  async getCompanyWithEmployee(employeeId: Types.ObjectId) {
    return this.companyRepository.findCompanyWithEmployee(employeeId);
  }

  async companyDeleteIsValid(deleteEmployeeDto: DeleteEmployeeFromCompanyDto) {
    let valid = await this.employeeService.employeeExistsForCompany(
      deleteEmployeeDto.employeeToDeleteId,
      deleteEmployeeDto.companyId.toString(),
    );
    if (!valid) return new ValidationResult(false, 'Employee ID is invalid');

    valid = await this.employeeService.employeeExistsForCompany(
      deleteEmployeeDto.adminId,
      deleteEmployeeDto.companyId.toString(),
    );
    if (!valid) return new ValidationResult(false, 'Admin ID is invalid');

    valid = await this.companyIdExists(deleteEmployeeDto.companyId);
    if (!valid) return new ValidationResult(false, 'Company ID is invalid');

    return new ValidationResult(true);
  }

  async deleteEmployee(
    userId: Types.ObjectId,
    deleteEmployee: DeleteEmployeeFromCompanyDto,
  ) {
    const valid = await this.companyDeleteIsValid(deleteEmployee);
    const employeeToDelete = await this.employeeService.findById(
      deleteEmployee.employeeToDeleteId,
    );

    if (!valid) throw new ConflictException(valid.message);

    if (
      !(await this.usersService.userIsInSameCompanyAsEmployee(
        userId,
        deleteEmployee.employeeToDeleteId,
      ))
    )
      throw new UnauthorizedException('Only the owner can perform this action');

    if (!userId.equals(deleteEmployee.adminId))
      throw new UnauthorizedException('Inconsistent Admin ID is invalid');

    let user = await this.usersService.getUserById(userId);
    const emp = await this.employeeService.findById(
      deleteEmployee.employeeToDeleteId,
    );
    const role = await this.roleService.findById(emp.roleId);

    if (role.roleName !== 'Owner') {
      throw new UnauthorizedException('Only the owner can perform this action');
    }

    await this.employeeService.remove(deleteEmployee.employeeToDeleteId);

    user = await this.usersService.getUserById(employeeToDelete.userId);
    user.joinedCompanies.filter((x) => x.employeeId !== employeeToDelete._id);
    const update = { joinedCompanies: user.joinedCompanies };
    await this.usersService.updateUser(user._id, update);

    return true;
  }

  async getAllCompanyNames() {
    return await this.companyRepository.findAllNames();
  }
}
