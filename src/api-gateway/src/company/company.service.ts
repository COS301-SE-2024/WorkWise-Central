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
import { RoleService } from '../role/role.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>,
    private readonly companyRepository: CompanyRepository,
    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    if (
      (await this.companyRepository.registrationNumberExists(
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
    const result = await newCompanyModel.save();
    return new CreateCompanyResponseDto(`${result.id}`);
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
  async addEmployee(addUserDto: AddUserToCompanyDto): Promise<string> {
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

    // if (newId.joinedCompanies.includes(addUserDto.currentCompany)) {
    //   throw new ConflictException('User is already a member');
    // }
    //
    const resultOfUpdate = await this.companyModel.findByIdAndUpdate(
      { _id: addUserDto.currentCompany },
      {
        $push: { employees: newId._id },
      },
    );

    const currentCompanyId = new Types.ObjectId(addUserDto.currentCompany);

    const updateUser = await this.userModel.findByIdAndUpdate(
      { _id: newId._id },
      { $push: { joinedCompanies: currentCompanyId } },
    );

    console.log(resultOfUpdate);
    console.log(updateUser);

    return `${updateUser.systemDetails.username} added to successfully`;
  }

  update(id: Types.ObjectId, updateCompanyDto: UpdateCompanyDto) {
    const updatedCompany = this.companyRepository.update(id, updateCompanyDto);
    console.log(updatedCompany);
    return true;
  }

  async deleteCompany(id: string): Promise<boolean> {
    await this.companyRepository.delete(id);
    return true;
  }
}
