import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CancelRequestDto,
  UserJoinRequestDto,
} from '../users/dto/request-to-join.dto';
import { Types } from 'mongoose';
import { AdminRepository } from './admin.repository';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { UserJoinRequest } from './entities/request-to-join.entity';
import { AcceptRequestDto } from '../client/dto/accept-request.dto';
import { EmployeeService } from '../employee/employee.service';
import { RoleService } from '../role/role.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,

    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,

    @Inject(forwardRef(() => CompanyService))
    private companyService: CompanyService,

    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,

    @Inject(forwardRef(() => RoleService))
    private roleService: RoleService,
  ) {}

  async createRequest(
    userId: Types.ObjectId,
    requestToJoin: UserJoinRequestDto,
  ) {
    //Validation Section
    if (userId.toString() !== requestToJoin.userToJoin.toString()) {
      throw new BadRequestException('Inconsistent UserId in JWT and Request');
    }

    if (!(await this.usersService.userIdExists(userId))) {
      throw new BadRequestException('userId Invalid');
    }

    if (!(await this.companyService.companyIdExists(requestToJoin.companyId))) {
      throw new BadRequestException('CompanyId Invalid');
    }

    const userIsInCompany = await this.usersService.userIsInCompany(
      userId,
      requestToJoin.companyId,
    );
    if (userIsInCompany) {
      throw new BadRequestException('User Already in company');
    }
    //
    const newRequest = new UserJoinRequest(requestToJoin);
    return await this.adminRepository.save(newRequest);
  }

  async cancelRequest(
    userId: Types.ObjectId,
    cancelRequestDto: CancelRequestDto,
  ) {
    //Validation Section
    if (!(await this.usersService.userIdExists(userId))) {
      throw new BadRequestException('userId Invalid');
    }

    if (
      !(await this.companyService.companyIdExists(cancelRequestDto.companyId))
    ) {
      throw new BadRequestException('CompanyId Invalid');
    }

    const userIsInCompany = await this.usersService.userIsInCompany(
      userId,
      cancelRequestDto.companyId,
    );
    if (userIsInCompany) {
      throw new BadRequestException('User already in company');
    }
    //
    return (
      await this.adminRepository.cancelRequest(
        userId,
        cancelRequestDto.companyId,
      )
    ).acknowledged;
  }

  async getAllRequests() {
    return this.adminRepository.findAllRequests();
  }

  async getAllRequestsInCompany(
    userId: Types.ObjectId,
    companyId: Types.ObjectId,
  ) {
    ///Validation Section
    // User exists
    if (!(await this.usersService.userIdExists(userId))) {
      throw new NotFoundException('userId Invalid');
    }
    //CompanyExists
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new NotFoundException('CompanyId Invalid');
    }
    //UserInCompany
    const userIsInCompany = await this.usersService.userIsInCompany(
      userId,
      companyId,
    );
    if (userIsInCompany) {
      throw new UnauthorizedException('User Already in company');
    }
    //TODO: Add Role Validation

    ///

    return this.adminRepository.findAllRequestsForCompany(companyId);
  }

  async getAllRequestsForUser(userId: Types.ObjectId) {
    ///Validation Section
    // User exists
    if (!(await this.usersService.userIdExists(userId))) {
      throw new NotFoundException('userId Invalid');
    }
    ///
    return this.adminRepository.findAllRequestsFromUser(userId);
  }

  ///Company-side
  async acceptRequest(
    userId: Types.ObjectId,
    acceptRequestDto: AcceptRequestDto,
  ) {
    ///Validation Section
    // User exists
    if (!(await this.usersService.userIdExists(userId))) {
      throw new NotFoundException('userId Invalid');
    }
    //companyId
    const companyExists = await this.companyService.companyIdExists(
      acceptRequestDto.companyId,
    );
    if (companyExists) throw new BadRequestException('CompanyId Invalid');
    //superiorId
    const superior = await this.employeeService.findById(
      acceptRequestDto.superiorId,
    );
    if (superior == null) throw new BadRequestException('superiorId Invalid');

    const isInCompany = await this.companyService.employeeIsInCompany(
      acceptRequestDto.companyId,
      acceptRequestDto.superiorId,
    );
    if (!isInCompany) throw new BadRequestException('Employee not In Company');
    //subordinates?
    if (acceptRequestDto.subordinates.length > 0) {
      for (const subordinateId of acceptRequestDto.subordinates) {
        const subordinateIsInCompany =
          await this.companyService.employeeIsInCompany(
            acceptRequestDto.companyId,
            subordinateId,
          );
        if (!subordinateIsInCompany)
          throw new BadRequestException('SubordinateId Invalid');
      }
    }

    //assignedRoleId?
    if (acceptRequestDto.assignedRoleId) {
      if (!(await this.roleService.roleExists(acceptRequestDto.assignedRoleId)))
        throw new BadRequestException('Assigned Role does not exist');
    }
    //TODO: Permissions of user to add person
    ///

    if (!acceptRequestDto.accept) {
      //Reject and delete request
    } else {
    }

    let roleId: Types.ObjectId;
    if (acceptRequestDto.assignedRoleId == null)
      roleId = (
        await this.roleService.findOneInCompany(
          'Worker',
          acceptRequestDto.companyId,
        )
      )._id;
    else roleId = acceptRequestDto.assignedRoleId;
    //Accept or nah
  }
}
