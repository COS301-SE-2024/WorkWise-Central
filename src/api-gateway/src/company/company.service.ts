import {
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
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

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('company')
    private readonly companyModel: Model<Company>,

    @InjectModel(User.name)
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
    // createCompanyDto.created_at = new Date();
    const newCompany = new Company(createCompanyDto);
    const newCompanyModel = new this.companyModel(newCompany);
    const result = await newCompanyModel.save();
    return new CreateCompanyResponseDto(`${result.id}`);
  }

  async companyExists(id: string): Promise<boolean> {
    const result: FlattenMaps<User> & { _id: Types.ObjectId } =
      await this.companyModel
        .findOne({
          $and: [
            { registrationNumber: id },
            {
              $or: [{ deleted_at: null }, { deleted_at: { $exists: false } }],
            },
          ],
        })
        .lean();

    //console.log('companyExists -> ', result);
    return result == null;
  }

  async companyIdExists(id: Types.ObjectId): Promise<boolean> {
    const result: FlattenMaps<User> & { _id: Types.ObjectId } =
      await this.companyModel
        .findOne({
          $and: [
            { _id: id },
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
      return this.companyModel.find().lean().exec();
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Users could not be retrieved');
    }
  }

  async findById(
    identifier: string | Types.ObjectId,
  ): Promise<FlattenMaps<Company> & { _id: Types.ObjectId }> {
    const result: FlattenMaps<Company> & { _id: Types.ObjectId } =
      await this.companyModel
        .findOne({
          $and: [
            { _id: identifier },
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

  async findByEmailOrName(identifier: string) {
    const regex = `*${identifier}*`;
    const searchTerm = new RegExp(regex, 'i');

    const result = await this.companyModel
      .find({
        $and: [
          {
            $or: [{ private: false }, { private: { $exists: false } }],
          },
          {
            $or: [
              { name: { $regex: searchTerm } },
              { 'contactDetails.email': { $regex: searchTerm } },
            ],
          },
          {
            $or: [{ deleted_at: null }, { deleted_at: { $exists: false } }],
          },
        ],
      })
      .lean();

    if (result == null) {
      throw new NotFoundException('Client not found');
    }
    console.log(result);
    return result;
  }

  async findByRegistrationNumber(
    registrationNumber: string,
  ): Promise<FlattenMaps<Company> & { _id: Types.ObjectId }> {
    const result: FlattenMaps<Company> & { _id: Types.ObjectId } =
      await this.companyModel
        .findOne({
          $and: [
            { registrationNumber: registrationNumber },
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

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    console.log(updateCompanyDto);
    return `This action updates a #${id} company`;
  }

  async remove(id: string) {
    return `This action removes a #${id} company`;
  }
}
