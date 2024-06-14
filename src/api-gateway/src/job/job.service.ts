import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FlattenMaps, Model, Types } from 'mongoose';
//import { User } from '../users/entities/user.entity';
import { Job } from './entities/job.entity';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { ClientService } from '../client/client.service';

@Injectable()
export class JobService {
  private authorisedList: string[] = ['owner', 'manager'];

  constructor(
    @InjectModel(Job.name)
    private readonly jobModel: Model<Job>,
    private readonly usersService: UsersService,
    private readonly companyService: CompanyService,
    private readonly clientService: ClientService,
    //@InjectModel('user') private readonly userModel: Model<User>, //Will be used later
  ) {}

  async create(createJobDto: CreateJobDto) {
    const assigner = createJobDto.assignedBy;
    if (await this.usersService.userIdExists(assigner))
      console.log('assignBy is valid');

    if (
      await this.companyService.companyIdExists(
        new Types.ObjectId(createJobDto.companyId),
      )
    )
      console.log('companyId is valid');

    //console.log('done');
    const createdJob = new Job(createJobDto);
    console.log('createdJob', createdJob);
    const newJob = new this.jobModel(createdJob);
    const result = await newJob.save();

    return {
      id: result._id,
      message: `Job: "${result.details.heading}", by "${result.assignedBy} has been created`,
    };
  }

  async authorisedToAssign(userId: Types.ObjectId, companyId: Types.ObjectId) {
    //const user = await this.usersService.findUserById(userId);
    /*    if (!user.joinedCompanies.includes(companyId))
      throw new NotFoundException(
        'User does is not an employee of the company',
      );*/
    /*    const validRolesInCompany = user.roles.filter(
      (role) =>
        role.companyId == companyId && this.authorisedList.includes(role.role),
    );*/

    /*    if (validRolesInCompany.length == 0) {
      throw new UnauthorizedException(
        'User does not have an appropriate role in the company',
      );
    }*/

    const result = await this.companyService.findById(companyId);
    return result.employees.includes(userId);
  }

  async isMember(userId: Types.ObjectId, companyId: Types.ObjectId) {
    const result = await this.companyService.findById(companyId);
    return result.employees.includes(userId);
  }

  async findJobById(
    identifier: string,
  ): Promise<FlattenMaps<Job> & { _id: Types.ObjectId }> {
    const result: FlattenMaps<Job> & { _id: Types.ObjectId } =
      await this.jobModel
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
      throw new NotFoundException('Job not found');
    }

    return result;
  }

  async findAllJobs() {
    try {
      return this.jobModel.find().exec();
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Jobs could not be retrieved');
    }
  }

  async jobExists(id: string): Promise<boolean> {
    const result: FlattenMaps<Job> & { _id: Types.ObjectId } =
      await this.jobModel
        .findOne({
          $and: [
            { _id: id },
            {
              $or: [{ deleted_at: null }, { deleted_at: { $exists: false } }],
            },
          ],
        })
        .lean();

    console.log('jobExists -> ', result);
    return result == null;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    console.log(updateJobDto);
    return `This action updates a #${id} job`;
  }

  async softDelete(id: string): Promise<boolean> {
    const result: Document<unknown, NonNullable<unknown>, Job> &
      Job & { _id: Types.ObjectId } = await this.jobModel.findOneAndUpdate(
      {
        $and: [
          { _id: id },
          {
            $or: [{ deleted_at: null }, { deleted_at: { $exists: false } }],
          },
        ],
      },
      { $set: { deleted_at: new Date() } },
    );

    if (result == null) {
      throw new InternalServerErrorException('Internal server Error');
    }
    return true;
  }
}
