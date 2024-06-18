import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { Team } from './entities/team.entity';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private readonly TeamModel: Model<Team>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private companyService: CompanyService,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    // if (
    //   !(await this.usersService.userIdExists(
    //     createTeamDto.userId.toString(),
    //   ))
    // ) {
    //   throw new ConflictException('User not found');
    // }

    // const user = await this.usersService.findUserById(createTeamDto.userId);
    // const company = await this.companyService.findById(
    //   createTeamDto.companyId,
    // );

    // if (!user || !company) {
    //   throw new ConflictException('Invalid ID given');
    // }
    // const newTeam = new Team();

    // newTeam.userId = createTeamDto.userId;
    // newTeam.role = createTeamDto.role;
    // const companyObject = await this.companyService.findById(
    //   createTeamDto.companyId,
    // );
    // newTeam.company = {
    //   companyId: companyObject._id,
    //   companyLogo: companyObject.logo,
    //   companyName: companyObject.name,
    // };
    // const model = new this.TeamModel(newTeam);
    // const result = await model.save();
    // return `${result}`;
  }

  async findAll() {
    try {
      return this.TeamModel.find().exec();
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Teams could not be retrieved');
    }
  }

  async findOne(id: string) {
    return this.TeamModel.findById(id);
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    console.log(updateTeamDto);
    return `This action updates a #${id} Team`;
  }

  async remove(id: string): Promise<boolean> {
    const TeamToDelete = await this.findOne(id);
    //const removeFromCompany = await this.companyService.remove(id);
    //const removeFromUser = await this.usersService.softDelete();

    const result: Document<unknown, NonNullable<unknown>, User> &
      User & { _id: Types.ObjectId } =
      await this.TeamModel.findOneAndUpdate(
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

  async removeAllWithUserId(id: string): Promise<boolean> {
    const TeamsToDelete = await this.TeamModel.updateMany(
      {
        userId: id,
      },
      { $set: { deletedAt: new Date() } },
    );
    //const removeFromCompany = await this.companyService.remove(id);
    //const removeFromUser = await this.usersService.softDelete();
    console.log(TeamsToDelete);
    if (TeamsToDelete == null) {
      throw new InternalServerErrorException('Internal server Error');
    }
    return true;
  }
}
