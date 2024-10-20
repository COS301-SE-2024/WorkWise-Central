import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto, UpdateCompanyJobStatuses } from './dto/update-company.dto';
import { FlattenMaps, Types } from 'mongoose';
import { Company, CompanyAccountDetailsObject } from './entities/company.entity';
import { JoinedCompany } from '../users/entities/user.entity';
import { AddUserFromInviteDto, AddUserToCompanyDto } from './dto/add-user-to-company.dto';
import { CompanyRepository } from './company.repository';
import { ValidationResult } from '../auth/entities/validationResult.entity';
import { EmployeeService } from '../employee/employee.service';
import { RoleService } from '../role/role.service';
import { UsersService } from '../users/users.service';
import { DeleteEmployeeFromCompanyDto, LeaveCompanyDto } from './dto/delete-employee-in-company.dto';
import { Employee } from '../employee/entities/employee.entity';
import { FileService } from '../file/file.service';
import { JobService } from '../job/job.service';
import { DeleteCompanyDto } from './dto/delete-company.dto';
import { ClientService } from '../client/client.service';
import { InventoryService } from '../inventory/inventory.service';
import { TeamService } from '../team/team.service';
import { NotificationService } from '../notification/notification.service';
import { Message } from '../notification/entities/notification.entity';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,

    private configService: ConfigService,

    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService,

    @Inject(forwardRef(() => FileService))
    private readonly fileService: FileService,

    @Inject(forwardRef(() => JobService))
    private readonly jobService: JobService,

    @Inject(forwardRef(() => ClientService))
    private readonly clientService: ClientService,

    @Inject(forwardRef(() => InventoryService))
    private readonly inventoryService: InventoryService,

    @Inject(forwardRef(() => TeamService))
    private readonly teamService: TeamService,

    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const inputValidated = await this.companyCreateIsValid(createCompanyDto);
    if (!inputValidated.isValid) throw new ConflictException(inputValidated.message);

    //Save files In Bucket, and store URLs (if provided)
    if (createCompanyDto.logo) {
      console.log('Uploading image');
      const picture = await this.fileService.uploadBase64Image(createCompanyDto.logo);
      if (picture.secure_url != null) {
        console.log('Saving company with a logo');
        createCompanyDto.logo = picture.secure_url;
      } else throw new InternalServerErrorException('file upload failed');
    }
    // else it will be the default value

    //Create Company
    console.log('Create Company');
    const createdCompany = await this.companyRepository.save(new Company(createCompanyDto));

    //Create Default role in company
    console.log('Create Default Role in Company');
    await this.roleService.createDefaultRoles(createdCompany._id);

    //Create Default JobStatuses in company
    this.jobService.createDefaultStatuses(createdCompany._id).then((s) => {
      const arr: Types.ObjectId[] = [];
      for (const status of s) {
        arr.push(status._id);
      }
      this.addJobStatuses(createdCompany._id, arr);
    });

    //Create Default JobPriorityTags in Company
    this.jobService.createDefaultPriorityTags(createdCompany._id);

    //Assign Owner to user
    console.log('Assign Owner to user');
    const ownerRoleId = (await this.roleService.findOneInCompany('Owner', createdCompany._id))._id;
    console.log('ownerRoleId ', ownerRoleId);

    ///
    const user = await this.usersService.getUserById(createCompanyDto.userId);
    ///

    const currentEmployeeId = user.joinedCompanies[0]?.employeeId;

    console.log('Create Employee');
    const employee = await this.employeeService.createOwner({
      currentEmployeeId: currentEmployeeId,
      userId: createCompanyDto.userId,
      companyId: createdCompany._id,
      superiorId: null,
      roleId: ownerRoleId,
      userInfo: {
        firstName: user.personalInfo.firstName,
        surname: user.personalInfo.surname,
        displayImage: user.profile.displayImage,
        displayName: user.profile.displayName,
        username: user.systemDetails.username,
      },
    });

    if (employee == null) {
      this.eradicateCompany(createdCompany._id);
      throw new InternalServerErrorException('Creation Process failed due to Error in API');
    }

    /*    console.log('Add employee to Company');
    const updatedCompany = await this.addNewEmployeeId(createdCompany._id, employee._id);*/

    console.log('Make User JoinedCompany');
    const newJoinedCompany = new JoinedCompany(employee._id, createdCompany._id, createdCompany.name);

    console.log('Perform Update');
    await this.usersService.addJoinedCompany(user._id, newJoinedCompany);

    await this.usersService.updateUser(user._id, {
      currentEmployee: employee._id,
    });

    console.log('Add employee to Company');
    //const updatedCompany: any = await this.addNewEmployeeId(createdCompany._id, employee._id);
    const updatedCompany: any = await this.companyRepository.findById(createdCompany._id);
    updatedCompany.ownerId = newJoinedCompany.employeeId;
    return updatedCompany;
  }

  async companyRegNumberExists(registerNumber: string): Promise<boolean> {
    return this.companyRepository.registrationNumberExists(registerNumber);
  }

  async companyNameExists(name: string): Promise<boolean> {
    return this.companyRepository.nameExists(name);
  }

  async companyVatNumberExists(vatNumber: string): Promise<boolean> {
    return this.companyRepository.VatNumberExists(vatNumber);
  }

  async companyIdExists(id: Types.ObjectId): Promise<boolean> {
    return this.companyRepository.idExists(id);
  }

  getAllCompanies() {
    return this.companyRepository.findAll();
  }

  getAllCompaniesDetailed() {
    const fieldsToPopulate = ['employees', 'inventoryItems'];
    return this.companyRepository.findAll(fieldsToPopulate);
  }

  async getAllEmployees(companyId: Types.ObjectId) {
    try {
      return this.employeeService.findAllInCompany(companyId);
    } catch (e) {
      throw e;
    }
  }

  async getCompanyById(identifier: Types.ObjectId): Promise<FlattenMaps<Company> & { _id: Types.ObjectId }> {
    const result = await this.companyRepository.findById(identifier);

    if (result == null) {
      throw new ConflictException('Company not found');
    }

    return result;
  }
  feat;
  async getCompanyNameById(identifier: Types.ObjectId): Promise<string> {
    const result = await this.companyRepository.findCompanyNameById(identifier);

    if (result == null) {
      throw new ConflictException('Company not found');
    }

    return result;
  }

  async getCompanyAccountDetails(identifier: Types.ObjectId) {
    const company = await this.companyRepository.findById(identifier);
    const result = new CompanyAccountDetailsObject();
    if (company.accountDetails != null) {
      if (company.accountDetails.merchantId != null) {
        result.merchantId = this.decrypt(company.accountDetails.merchantId);
      }
      if (company.accountDetails.merchantKey != null) {
        result.merchantKey = this.decrypt(company.accountDetails.merchantKey);
      }
      if (company.accountDetails.passPhrase != null) {
        result.passPhrase = this.decrypt(company.accountDetails.passPhrase);
      }
    }

    return result;
  }

  async getCompanyByIdDetailed(identifier: Types.ObjectId) {
    const populatedFields = ['employees', 'inventoryItems'];
    const result = await this.companyRepository.findById(identifier, populatedFields);
    if (result == null) {
      throw new ConflictException('Company not found');
    }

    return result;
  }

  async getByEmailOrName(identifier: string) {
    const result = await this.companyRepository.findByEmailOrName(identifier);

    if (result == null) {
      throw new ConflictException('Client not found');
    }
    console.log(result);
    return result;
  }

  async employeeIsInCompany(compId: Types.ObjectId, empId: Types.ObjectId) {
    return await this.employeeService.employeeExistsForCompany(empId, compId);
  }

  async getCompanyByRegNumber(registrationNumber: string): Promise<FlattenMaps<Company> & { _id: Types.ObjectId }> {
    const result = await this.companyRepository.findByRegistrationNumber(registrationNumber);

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

    console.log('addUserDto', addUserDto);
    //Get company and user
    const company = await this.getCompanyById(addUserDto.currentCompany);
    const user = await this.usersService.getUserByUsername(addUserDto.newUserUsername);
    // null checks
    if (company == null || user == null) throw new NotFoundException('User or Company not found');

    //CreateEmployee and link them to the company
    let addedEmployee: Employee & { _id: Types.ObjectId };
    if (addUserDto.roleId) {
      addedEmployee = await this.employeeService.create({
        currentEmployeeId: addUserDto.adminId,
        companyId: company._id,
        userId: user._id,
        roleId: addUserDto.roleId,
        superiorId: addUserDto.superiorId,
        userInfo: {
          firstName: user.personalInfo.firstName,
          surname: user.personalInfo.surname,
          displayImage: user.profile.displayImage,
          displayName: user.profile.displayName,
          username: user.systemDetails.username,
        },
      });
    } else {
      const defaultRole = await this.roleService.findOneInCompany('Worker', company._id);

      addedEmployee = await this.employeeService.create({
        currentEmployeeId: addUserDto.adminId,
        companyId: company._id,
        userId: user._id,
        roleId: defaultRole._id,
        superiorId: addUserDto.superiorId,
        userInfo: {
          firstName: user.personalInfo.firstName,
          surname: user.personalInfo.surname,
          displayImage: user.profile.displayImage,
          displayName: user.profile.displayName,
          username: user.systemDetails.username,
        },
      });

      await this.employeeService.updateUserInfo(addedEmployee._id, {
        //Add user details
        firstName: user.personalInfo.firstName,
        surname: user.personalInfo.surname,
        displayImage: user.profile.displayImage,
        displayName: user.profile.displayName,
        username: user.systemDetails.username,
      });
    }

    const newJoinedCompany: JoinedCompany = {
      companyId: company._id,
      employeeId: addedEmployee._id,
      companyName: company.name,
    };

    const updatedUser = await this.usersService.addJoinedCompany(user._id, newJoinedCompany);
    console.log('Add New Employee ID');
    //await this.addNewEmployeeId(company._id, addedEmployee._id);
    console.log(updatedUser);
    return newJoinedCompany;
  }

  async addEmployeeFromInvite(inviteDto: AddUserFromInviteDto) {
    console.log('addUserDto', inviteDto);
    //Get company and user
    const company = await this.getCompanyById(inviteDto.companyId);
    const user = await this.usersService.getUserById(inviteDto.newUserId);
    const joinedCompany = user.joinedCompanies.find((cmp) => cmp.companyId.toString() === company.toString());
    const currentEmployeeId = joinedCompany.employeeId;
    // null checks
    if (company == null || user == null) throw new NotFoundException('User or Company not found');

    //CreateEmployee and link them to the company
    let addedEmployee: Employee & { _id: Types.ObjectId };
    if (inviteDto.roleId) {
      addedEmployee = await this.employeeService.create({
        currentEmployeeId: currentEmployeeId,
        companyId: company._id,
        userId: user._id,
        roleId: inviteDto.roleId,
        superiorId: inviteDto.superiorId,
        userInfo: {
          firstName: user.personalInfo.firstName,
          surname: user.personalInfo.surname,
          displayImage: user.profile.displayImage,
          displayName: user.profile.displayName,
          username: user.systemDetails.username,
        },
      });
    } else {
      const defaultRole = await this.roleService.findOneInCompany('Worker', company._id);

      addedEmployee = await this.employeeService.create({
        currentEmployeeId: currentEmployeeId,
        companyId: company._id,
        userId: user._id,
        roleId: defaultRole._id,
        superiorId: inviteDto.superiorId,
        userInfo: {
          firstName: user.personalInfo.firstName,
          surname: user.personalInfo.surname,
          displayImage: user.profile.displayImage,
          displayName: user.profile.displayName,
          username: user.systemDetails.username,
        },
      });

      await this.employeeService.updateUserInfo(addedEmployee._id, {
        //Add user details
        firstName: user.personalInfo.firstName,
        surname: user.personalInfo.surname,
        displayImage: user.profile.displayImage,
        displayName: user.profile.displayName,
        username: user.systemDetails.username,
      });
    }

    const newJoinedCompany: JoinedCompany = {
      companyId: company._id,
      employeeId: addedEmployee._id,
      companyName: company.name,
    };

    const updatedUser = await this.usersService.addJoinedCompany(user._id, newJoinedCompany);
    console.log('Add New Employee ID');
    //await this.addNewEmployeeId(company._id, addedEmployee._id);
    console.log(updatedUser);
    return newJoinedCompany;
  }

  async leaveCompany(userId: Types.ObjectId, leaveCompanyDto: LeaveCompanyDto) {
    const user = await this.usersService.getUserById(userId);
    const employee = await this.employeeService.findById(leaveCompanyDto.currentEmployee);
    const company = await this.getCompanyById(leaveCompanyDto.companyToLeaveId);
    if (!employee || !user || !company) throw new NotFoundException('User, Employee or Company not found');
    if (employee.userId.toString() !== user._id.toString())
      throw new ConflictException('Invalid UserId/EmployeeId pair');
    const elem = user.joinedCompanies.find(
      (j) => j.companyId.toString() === leaveCompanyDto.companyToLeaveId.toString(),
    );
    if (!elem) throw new UnauthorizedException('Not in company');
    // Remove from jobs
    this.jobService.removeAllReferencesToEmployee(leaveCompanyDto.currentEmployee);
    // Remove from Employees
    await this.employeeService.remove(leaveCompanyDto.currentEmployee);
    //Inform company
    const employees = await this.employeeService.findAllInCompany(leaveCompanyDto.companyToLeaveId);
    const recipientIds: Types.ObjectId[] = [];
    for (const emp of employees) {
      recipientIds.push(emp.userId);
    }
    const title = `${employee.userInfo.firstName} ${employee.userInfo.surname} has left the ${company.name}`;
    const body = leaveCompanyDto.reason
      ? `The reason provided was: ${leaveCompanyDto.reason}`
      : `No reason was provided`;
    this.notificationService.create({
      recipientIds: recipientIds,
      message: new Message(title, body),
    });
    //Remove from User
    await this.usersService.removeJoinedCompany(userId, leaveCompanyDto.companyToLeaveId);
    return true;
  }

  encrypt(data: string) {
    console.log('In encryption function: ', data);
    const payKey = this.configService.get<string>('PAY_KEY');
    console.log('Secret: ', payKey);

    let ENCRYPTION_KEY = Buffer.from(payKey, 'base64');

    // If the key is not 32 bytes, adjust the length
    if (ENCRYPTION_KEY.length !== 32) {
      ENCRYPTION_KEY = Buffer.concat([ENCRYPTION_KEY], 32); // Pads or truncates to 32 bytes
    }

    console.log('ENCRYPTION_KEY length: ', ENCRYPTION_KEY.length); // Should be 32
    console.log('ENCRYPTION_KEY: ', ENCRYPTION_KEY);

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    console.log('Encrypted data: ', encrypted);

    return iv.toString('hex') + ':' + encrypted;
  }

  decrypt(data: string) {
    const payKey = this.configService.get<string>('PAY_KEY');
    let ENCRYPTION_KEY = Buffer.from(payKey, 'base64');

    // Ensure the key is 32 bytes long, padding or truncating as necessary
    if (ENCRYPTION_KEY.length !== 32) {
      ENCRYPTION_KEY = Buffer.concat([ENCRYPTION_KEY], 32); // Pad or truncate to 32 bytes
    }

    // Split the data into IV and encrypted text
    const textParts = data.split(':');
    const iv = Buffer.from(textParts.shift() as string, 'hex'); // Extract the IV
    const encrypted = Buffer.from(textParts.join(':'), 'hex'); // Extract the encrypted text

    // Create a decipher instance with AES-256-CBC, the encryption key, and IV
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);

    // Decrypt the encrypted text
    decipher.update(encrypted);
    const result = decipher.final('utf8');

    return result;
  }

  async update(userId: Types.ObjectId, companyId: Types.ObjectId, updateCompanyDto: UpdateCompanyDto) {
    const inputValidated = await this.companyUpdateIsValid(userId, companyId, updateCompanyDto);
    if (!inputValidated.isValid) {
      throw new ConflictException(inputValidated.message);
    }

    if (!(await this.usersService.userIsInCompany(userId, companyId)))
      throw new UnauthorizedException('User not in company');

    //Save files In Bucket, and store URLs (if provided)
    if (updateCompanyDto.logo) {
      console.log('Uploading image');
      const picture = await this.fileService.uploadBase64Image(updateCompanyDto.logo);
      if (picture.secure_url != null) {
        updateCompanyDto.logo = picture.secure_url;
      } else throw new InternalServerErrorException('file upload failed');
    }
    console.log('Before encryption: ', updateCompanyDto);

    //checking if accountDetails are being updated and encrypting the details
    if (updateCompanyDto.accountDetails.merchantId) {
      updateCompanyDto.accountDetails.merchantId = this.encrypt(updateCompanyDto.accountDetails.merchantId);
    }

    if (updateCompanyDto.accountDetails.merchantKey) {
      updateCompanyDto.accountDetails.merchantKey = this.encrypt(updateCompanyDto.accountDetails.merchantKey);
    }

    if (updateCompanyDto.accountDetails.passPhrase) {
      updateCompanyDto.accountDetails.passPhrase = this.encrypt(updateCompanyDto.accountDetails.passPhrase);
    }

    console.log('After encryption: ', updateCompanyDto);

    const updatedCompany = await this.companyRepository.update(companyId, updateCompanyDto);
    console.log(updatedCompany);

    //Update All Users' JoinedCompanies
    if (updateCompanyDto.name) await this.usersService.updateJoinedCompanyName(updatedCompany._id, updatedCompany.name);

    return updatedCompany;
  }

  async updateLogo(userId: Types.ObjectId, companyId: Types.ObjectId, file: Express.Multer.File) {
    //TODO: Add more validation
    if (!(await this.usersService.userIsInCompany(userId, companyId))) {
      throw new ConflictException('User not in company');
    }
    //
    const uploadApiResponse = await this.fileService.uploadFile(file);
    if (uploadApiResponse.secure_url) {
      const company = await this.getCompanyById(companyId);
      company.logo = uploadApiResponse.secure_url;
      return await this.companyRepository.save(company);
    } else {
      console.log('Failed to upload image');
      throw new InternalServerErrorException('Upload failed');
    }
  }

  async deleteCompany(userId: Types.ObjectId, deleteCompanyDto: DeleteCompanyDto): Promise<boolean> {
    const user = await this.usersService.getUserById(userId);
    let empId: Types.ObjectId;
    for (const joinedCompany of user.joinedCompanies) {
      if (joinedCompany.companyId.equals(deleteCompanyDto.companyId)) {
        empId = joinedCompany.employeeId;
      }
    }
    const emp = await this.employeeService.findById(empId);
    const role = await this.roleService.findById(emp.role.roleId);

    if (role.roleName !== 'Owner') {
      throw new UnauthorizedException('Only the owner can perform this action');
    }

    const usersInCompany = await this.usersService.getAllUsersInCompanyInternal(deleteCompanyDto.companyId);

    for (const user of usersInCompany) {
      const newJoinedCompanies: JoinedCompany[] = [];

      for (const joinedCompany of user.joinedCompanies) {
        if (joinedCompany.companyId.toString() !== deleteCompanyDto.companyId.toString()) {
          //Create new list, without company
          newJoinedCompanies.push(joinedCompany);
        } else {
          //Delete the employee in Employee Table
          await this.employeeService.remove(joinedCompany.employeeId);
        }
      }
      await this.usersService.updateJoinedCompanies(user._id, {
        joinedCompanies: newJoinedCompanies,
      });
    }
    this.companyRepository.delete(deleteCompanyDto.companyId);
    this.jobService.deleteAllWithCompanyId(deleteCompanyDto.companyId);
    this.jobService.deleteAllTagsAndStatusesInCompany(deleteCompanyDto.companyId);
    this.clientService.deleteAllInCompany(deleteCompanyDto.companyId);
    this.inventoryService.deleteAllInCompany(deleteCompanyDto.companyId);
    this.roleService.deleteAllInCompany(deleteCompanyDto.companyId);
    return true;
  }

  async addUserValidation(addUserToCompanyDto: AddUserToCompanyDto) {
    if (addUserToCompanyDto.currentCompany) {
      const idExists = await this.companyIdExists(addUserToCompanyDto.currentCompany);
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
      const usernameExists = await this.usersService.usernameExists(addUserToCompanyDto.newUserUsername);
      if (!usernameExists) {
        return new ValidationResult(false, 'Username not found');
      }

      const userJoinedCompanies = (await this.usersService.getUserByUsername(addUserToCompanyDto.newUserUsername))
        .joinedCompanies;

      for (const userJoinedCompany of userJoinedCompanies) {
        if (userJoinedCompany.companyId.toString() == addUserToCompanyDto.currentCompany.toString()) {
          return new ValidationResult(false, 'User already in Company');
        }
      }
    }

    return new ValidationResult(true);
  }

  async companyIsValid(company: Company) {
    if (!company) return new ValidationResult(false, `Company is null`);

    return new ValidationResult(true);
  }

  async companyCreateIsValid(company: CreateCompanyDto) {
    if (!company) return new ValidationResult(false, `Company is null`);

    if (!(await this.usersService.userIdExists(company.userId))) {
      return new ValidationResult(false, `User not found`);
    }

    if (company.vatNumber) {
      if (await this.companyVatNumberExists(company.vatNumber)) {
        return new ValidationResult(false, `Company with ${company.vatNumber} already exists`);
      }
    }

    if (company.registrationNumber) {
      if (await this.companyRegNumberExists(company.registrationNumber)) {
        return new ValidationResult(false, `Company with ${company.registrationNumber} already exists`);
      }
    }

    if (await this.companyNameExists(company.name)) {
      return new ValidationResult(false, `Company with ${company.name} already exists`);
    }

    return new ValidationResult(true);
  }

  async companyUpdateIsValid(userId: Types.ObjectId, companyId: Types.ObjectId, company: UpdateCompanyDto) {
    //Validate that all changes made in the Dto are valid/non-breaking
    if (!company) return new ValidationResult(false, `Company is null`);

    if (company.registrationNumber) {
      if (!(await this.companyRegNumberExists(company.registrationNumber))) {
        return new ValidationResult(false, `Company with ${company.registrationNumber} does not exist`);
      }
    }

    //Check that user is in company and has correct rights for this
    if (!(await this.usersService.userIsInCompany(userId, companyId)))
      return new ValidationResult(false, 'User not in company');

    // const user = await this.usersService.getUserById(userId);
    // const joinedCompany = user.joinedCompanies.filter(
    //   (obj) => obj.companyId == companyId,
    // )[0];

    //TODO: Add role-based validation and add Requested Jess function
    /*    const employee = await this.employeeService.findById(
      joinedCompany.employeeId,
    );
    const employeeRole = await this.roleService.findById(employee.roleId);
    if (!employeeRole.permissionSuite.includes('can edit company')) {
      return new ValidationResult(
        false,
        'Employee does not have necessary permissions',
      );
    }*/

    return new ValidationResult(true);
  }

  async companyDeleteIsValid(deleteEmployeeDto: DeleteEmployeeFromCompanyDto) {
    let valid = await this.employeeService.employeeExistsForCompany(
      deleteEmployeeDto.employeeToDeleteId,
      deleteEmployeeDto.companyId,
    );
    if (!valid) return new ValidationResult(false, 'Employee ID is invalid');
    valid = await this.employeeService.employeeExistsForCompany(deleteEmployeeDto.adminId, deleteEmployeeDto.companyId);
    if (!valid) return new ValidationResult(false, 'Admin ID is invalid');

    valid = await this.companyIdExists(deleteEmployeeDto.companyId);
    if (!valid) return new ValidationResult(false, 'Company ID is invalid');

    return new ValidationResult(true);
  }

  async deleteEmployee(userId: Types.ObjectId, deleteEmployee: DeleteEmployeeFromCompanyDto) {
    const valid = await this.companyDeleteIsValid(deleteEmployee);
    const employeeToDelete = await this.employeeService.findById(deleteEmployee.employeeToDeleteId);

    if (!valid) throw new ConflictException(valid.message);

    if (!(await this.usersService.userIsInSameCompanyAsEmployee(userId, deleteEmployee.employeeToDeleteId)))
      throw new UnauthorizedException('Only the owner can perform this action');

    if (!userId.equals(deleteEmployee.adminId)) throw new UnauthorizedException('Inconsistent Admin ID is invalid');

    let user = await this.usersService.getUserById(userId);
    const emp = await this.employeeService.findById(deleteEmployee.employeeToDeleteId);
    const role = await this.roleService.findById(emp.role.roleId);

    if (role.roleName !== 'Owner') {
      throw new UnauthorizedException('Only the owner can perform this action');
    }

    await this.employeeService.remove(deleteEmployee.employeeToDeleteId);

    user = await this.usersService.getUserById(employeeToDelete.userId);
    user.joinedCompanies.filter((x) => x.employeeId.equals(employeeToDelete._id) == false);
    const update = { joinedCompanies: user.joinedCompanies };
    await this.usersService.updateJoinedCompanies(user._id, update);

    return true;
  }

  async getAllCompanyNames() {
    return await this.companyRepository.findAllNames();
  }

  async addJobStatus(companyId: Types.ObjectId, statusId: Types.ObjectId) {
    return await this.companyRepository.addJobStatus(companyId, statusId);
  }

  async addJobStatuses(companyId: Types.ObjectId, statusIds: Types.ObjectId[]) {
    return await this.companyRepository.addJobStatuses(companyId, statusIds);
  }

  async updateCompanyStatuses(
    userId: Types.ObjectId,
    employeeId: Types.ObjectId,
    updateCompanyJobStatuses: UpdateCompanyJobStatuses,
  ) {
    const userExists = await this.usersService.userIdExists(userId);
    if (!userExists) throw new NotFoundException('User not found');

    const employee = await this.employeeService.findById(employeeId);
    if (employee == null) throw new NotFoundException('Employee not found');

    const company = await this.getCompanyById(employee.companyId);
    if (company.jobStatuses.length != updateCompanyJobStatuses.jobStatuses.length)
      throw new BadRequestException('Invalid number of columns');
    const noStat = await this.jobService.getStatusByLabel(employee.companyId, 'No Status');
    if (!noStat) throw new NotFoundException('No Status not found');
    updateCompanyJobStatuses.jobStatuses = updateCompanyJobStatuses.jobStatuses.filter(
      (id) => id.toString() !== noStat._id.toString(),
    );
    updateCompanyJobStatuses.jobStatuses.unshift(noStat._id);
    return this.companyRepository.updateStatuses(employee.companyId, updateCompanyJobStatuses.jobStatuses);
  }

  async findAllStatusesInCompany(userId: Types.ObjectId, companyId: Types.ObjectId) {
    if (!(await this.usersService.userIdExists(userId))) throw new NotFoundException('User not found');
    return this.companyRepository.findAllStatusesInCompany(companyId);
  }

  async internalFindAllStatusesInCompany(companyId: Types.ObjectId) {
    return this.companyRepository.findAllStatusesInCompany(companyId);
  }

  async getCompanyStatusNames(companyId: Types.ObjectId) {
    const statArr = await this.companyRepository.findAllStatusNamesInCompany(companyId);
    console.log(statArr);
    return statArr;
  }

  // async getCompanyAccountDetails(companyId: Types.ObjectId) {
  //   return this.companyRepository.findCompanyAccountDetails(companyId);
  // }

  private eradicateCompany(companyId: Types.ObjectId) {
    this.companyRepository.eradicateCompany(companyId).then((r) => console.log('acknowledged', r.acknowledged));
  }
}
