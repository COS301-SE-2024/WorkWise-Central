import {
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';
import { Company } from './entities/company.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('company')
    public readonly companyModel: Model<Company>,
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
  }
  async companyExists(registrationNumber: string): Promise<boolean> {
    const result: FlattenMaps<User> & { _id: Types.ObjectId } =
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

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    console.log(updateCompanyDto);
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
