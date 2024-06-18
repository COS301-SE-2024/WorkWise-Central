import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { Role } from './entity/role.entity';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private readonly RoleModel: Model<Role>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private companyService: CompanyService,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    // if (
    //   !(await this.usersService.userIdExists(
    //     createRoleDto.userId.toString(),
    //   ))
    // ) {
    //   throw new ConflictException('User not found');
    // }

    // const user = await this.usersService.findUserById(createRoleDto.userId);
    // const company = await this.companyService.findById(
    //   createRoleDto.companyId,
    // );

    // if (!user || !company) {
    //   throw new ConflictException('Invalid ID given');
    // }
    // const newRole = new Role();

    // newRole.userId = createRoleDto.userId;
    // newRole.role = createRoleDto.role;
    // const companyObject = await this.companyService.findById(
    //   createRoleDto.companyId,
    // );
    // newRole.company = {
    //   companyId: companyObject._id,
    //   companyLogo: companyObject.logo,
    //   companyName: companyObject.name,
    // };
    // const model = new this.RoleModel(newRole);
    // const result = await model.save();
    // return `${result}`;
  }

  async findAll() {
    try {
      return this.RoleModel.find().exec();
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Roles could not be retrieved');
    }
  }

  async findOne(id: string) {
    return this.RoleModel.findById(id);
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    console.log(updateRoleDto);
    return `This action updates a #${id} Role`;
  }

  async remove(id: string): Promise<boolean> {
    const RoleToDelete = await this.findOne(id);
    //const removeFromCompany = await this.companyService.remove(id);
    //const removeFromUser = await this.usersService.softDelete();

    const result: Document<unknown, NonNullable<unknown>, User> &
      User & { _id: Types.ObjectId } =
      await this.RoleModel.findOneAndUpdate(
        {
          $and: [
            { _id: RoleToDelete._id },
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
    const RolesToDelete = await this.RoleModel.updateMany(
      {
        userId: id,
      },
      { $set: { deletedAt: new Date() } },
    );
    //const removeFromCompany = await this.companyService.remove(id);
    //const removeFromUser = await this.usersService.softDelete();
    console.log(RolesToDelete);
    if (RolesToDelete == null) {
      throw new InternalServerErrorException('Internal server Error');
    }
    return true;
  }
}
