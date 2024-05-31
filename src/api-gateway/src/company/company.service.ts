import {
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  CreateCompanyDto,
  createCompanyResponseDto,
} from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';
import { Company } from './entities/company.entity';
import { User } from '../users/entities/user.entity';
import { AddUserToCompanyDto } from './dto/add-user-to-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('company')
    private readonly companyModel: Model<Company>,

    @InjectModel('user')
    private readonly userModel: Model<User>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    if (
      (await this.companyExists(createCompanyDto.registrationNumber)) == false
    ) {
      throw new ConflictException(
        `Company with ${createCompanyDto.registrationNumber} already
         exists,please enter another one or sign in`,
      );
    }
    createCompanyDto.created_at = new Date();
    const newCompany = new this.companyModel(createCompanyDto);
    const result = await newCompany.save();
    return new createCompanyResponseDto(`${result.id}`);
  }
  async companyExists(id: string | Types.ObjectId): Promise<boolean> {
    const result: FlattenMaps<User> & { _id: Types.ObjectId } =
      await this.companyModel
        .findOne({
          $and: [
            {
              $or: [{ registrationNumber: id }, { _id: id }],
            },
            {
              $or: [{ deleted_at: null }, { deleted_at: { $exists: false } }],
            },
          ],
        })
        .lean();

    //console.log('companyExists -> ', result);
    return result == null;
  }

  findAll() {
    try {
      return this.companyModel.find().exec();
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Users could not be retrieved');
    }
  }

  async findOne(
    identifier: string,
  ): Promise<FlattenMaps<Company> & { _id: Types.ObjectId }> {
    const result: FlattenMaps<Company> & { _id: Types.ObjectId } =
      await this.companyModel
        .findOne({
          $and: [
            {
              $or: [{ _id: identifier }, { registrationNumber: identifier }],
            },
            {
              $or: [{ deleted_at: null }, { deleted_at: { $exists: false } }],
            },
          ],
        })
        .lean();

    if (result == null) {
      throw new NotFoundException('Company not found');
    }

    return result;
  }
  //TODO:Add authorization for endpoint
  //For now, I assume the person is authorised
  async addEmployee(addUserDto: AddUserToCompanyDto) {
    //Add validation
    if (await this.companyExists(addUserDto.currentCompany)) {
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

    if (newId.joinedCompanies.includes(addUserDto.currentCompany)) {
      throw new ConflictException('User is already a member');
    }
    //
    this.companyModel.findByIdAndUpdate(
      { _id: addUserDto.adminId },
      {
        $push: { employees: newId._id },
      },
    );

    return 'User added successfully';

    /*    const newCompany = new this.userModel(addUserDto.newEmployee);
    const result = await newCompany.save();
    return new createCompanyResponseDto(`${result.id}`);*/
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    console.log(updateCompanyDto);
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
