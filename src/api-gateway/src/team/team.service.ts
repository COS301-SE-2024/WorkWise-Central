import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types, FlattenMaps } from 'mongoose';
import { Team } from './entities/team.entity';
import { EmployeeService } from '../employee/employee.service';
import { CompanyService } from '../company/company.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<Team>,
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
    private companyService: CompanyService,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    if (!(await this.companyService.companyIdExists(createTeamDto.companyId))) {
      throw new ConflictException('Company not found');
    }
    if (!(await this.employeeService.findById(createTeamDto.teamLeaderId))) {
      throw new ConflictException('Employee not found');
    }
    for (const employee of createTeamDto.teamMembers) {
      if (!(await this.employeeService.findById(employee))) {
        throw new ConflictException('Employee not found');
      }
    }

    const company = await this.companyService.findById(createTeamDto.companyId,);
    const teamLeader = await this.employeeService.findById(createTeamDto.teamLeaderId);
    const teamMembers = await this.employeeService.findByIds(createTeamDto.teamMembers);

    if (!company || !teamLeader || !teamMembers) {
      throw new ConflictException('Invalid ID given');
    }

    const newRole = new Team(createTeamDto);

    newRole.teamName = createTeamDto.teamName;
    newRole.companyId = createTeamDto.companyId;
    newRole.teamLeaderId = createTeamDto.teamLeaderId;
    newRole.teamMembers = createTeamDto.teamMembers;

    const model = new this.teamModel(newRole);
    const result = await model.save();
    return `${result}`;
  }

  async findAll() {
    try {
      return this.teamModel.find().exec();
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Teams could not be retrieved');
    }
  }

  async findOne(id: string) {
    return this.teamModel.findById(id);
  }

  async teamExists(id: string): Promise<boolean> {
    const result: FlattenMaps<Team> & { _id: Types.ObjectId } =
      await this.teamModel
        .findOne({
          $and: [
            { _id: id },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();
    return result != null;
  }

  async findById(
    identifier: string | Types.ObjectId,
  ): Promise<FlattenMaps<Team> & { _id: Types.ObjectId }> {
    const result: FlattenMaps<Team> & { _id: Types.ObjectId } =
      await this.teamModel
        .findOne({
          $and: [
            { _id: identifier },
            {
              $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            },
          ],
        })
        .lean();

    if (result == null) {
      throw new NotFoundException('Company not found');
    }

    return result;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const teamName = updateTeamDto.teamName;
    const addTeamMember = updateTeamDto.addTeamMember;
    const removeTeamMember = updateTeamDto.removeTeamMember;
    const teamLeaderId = updateTeamDto.teamLeaderId;
    const addJob = updateTeamDto.addJob;
    const removeJob = updateTeamDto.removeJob;

    const previousObject: FlattenMaps<Team> & { _id: Types.ObjectId } =
      await this.teamModel
        .findOneAndUpdate(
          {
            $and: [
              { _id: id },
              {
                $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
              },
            ],
          },
          { $set: { ...updateTeamDto }, updatedAt: new Date() },
        )
        .lean();
    
    if (teamName) {
      await this.teamModel.updateOne(
        { _id: id },
        { $set: { teamName: teamName } }
      );
    }

    if (teamLeaderId) {
      await this.teamModel.updateOne(
        { _id: id },
        { $set: { teamLeaderId: teamLeaderId } }
      );
    }

    if (addTeamMember) {
      await this.teamModel.updateOne(
        { _id: id },
        { $addToSet: { teamMembers: { $each: addTeamMember } } }
      );
    }

    if (removeTeamMember) {
      await this.teamModel.updateOne(
        { _id: id },
        { $pull: { teamMembers: { $in: removeTeamMember } } }
      );
    }

    if (addJob) {
      await this.teamModel.updateOne(
        { _id: id },
        { $addToSet: { jobs: { $each: addJob } } }
      );
    }

    if (removeJob) {
      await this.teamModel.updateOne(
        { _id: id },
        { $pull: { jobs: { $in: removeJob } } }
      );
    }
    
    
    return previousObject;
  }

  async remove(id: string): Promise<boolean> {
    const TeamToDelete = await this.findOne(id);
    
    const result: Document<unknown, NonNullable<unknown>, User> &
      User & { _id: Types.ObjectId } =
      await this.teamModel.findOneAndUpdate(
        {
          $and: [
            { _id: TeamToDelete._id },
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
}
