import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CancelRequestDto,
  UserInviteRequestDto,
  UserJoinRequestDto,
} from '../users/dto/request-to-join.dto';
import { FlattenMaps, Types } from 'mongoose';
import { AdminRepository } from './admin.repository';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { UserJoinRequest } from './entities/request-to-join.entity';
import { AcceptRequestDto } from '../client/dto/accept-request.dto';
import { EmployeeService } from '../employee/employee.service';
import { RoleService } from '../role/role.service';
import { NotificationService } from '../notification/notification.service';
import { Role } from '../role/entity/role.entity';

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

    @Inject(forwardRef(() => NotificationService))
    private notificationService: NotificationService,
  ) {}

  async createRequest(
    //User must have a WorkWise Account
    userId: Types.ObjectId,
    requestToJoin: UserJoinRequestDto,
  ) {
    //Validation Section
    /*    if (userId.toString() !== requestToJoin.requestingUserId.toString()) {
      throw new BadRequestException('Inconsistent UserId in JWT and Request');
    }*/

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

    const requestsToCompany: (FlattenMaps<UserJoinRequest> & {
      _id: Types.ObjectId;
    })[] = await this.adminRepository.findRequestsFromUserForCompany(
      userId,
      requestToJoin.companyId,
    );

    if (requestsToCompany.length > 0) {
      throw new ConflictException(
        'User has already made a request to join this company',
      );
    }

    //
    const newRequest = new UserJoinRequest({
      userToJoin: userId,
      companyId: requestToJoin.companyId,
    });
    return await this.adminRepository.save(newRequest);
  }

  async createInvite(
    //User must have a WorkWise Account
    userId: Types.ObjectId,
    userInviteRequestDto: UserInviteRequestDto,
  ) {
    if (!(await this.usersService.userIdExists(userId))) {
      throw new BadRequestException('userId Invalid');
    }
    const employee = await this.employeeService.findById(
      userInviteRequestDto.employeeId,
    );
    const company = await this.companyService.getCompanyById(
      employee.companyId,
    );
    if (company == null) throw new NotFoundException('Company Invalid');

    // Someone with the email address already exists
    const allUsers = await this.usersService.getAllUsersInCompany(company._id);
    for (const user of allUsers) {
      //if (ciEqual(user.personalInfo.contactInfo.email))
    }
    // get user

    const userIsInCompany = await this.usersService.userIsInCompany(
      userId,
      requestToJoin.companyId,
    );
    if (userIsInCompany) {
      throw new BadRequestException('User Already in company');
    }

    const requestsToCompany: (FlattenMaps<UserJoinRequest> & {
      _id: Types.ObjectId;
    })[] = await this.adminRepository.findRequestsFromUserForCompany(
      userId,
      requestToJoin.companyId,
    );

    if (requestsToCompany.length > 0) {
      throw new ConflictException(
        'User has already made a request to join this company',
      );
    }

    //
    const newRequest = new UserJoinRequest({
      userToJoin: userId,
      companyId: requestToJoin.companyId,
    });
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
    const req = await this.adminRepository.cancelRequest(
      userId,
      cancelRequestDto.companyId,
    );
    console.log(req.deletedCount);
    return req.deletedCount > 0;
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
    if (!userIsInCompany) {
      throw new UnauthorizedException('User not in company');
    }
    //TODO: Add Role Validation

    ///

    return this.adminRepository.findAllRequestsForCompany(companyId);
  }

  async getAllDetailedRequestsInCompany(
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
    if (!userIsInCompany) {
      throw new UnauthorizedException('User not in company');
    }
    //TODO: Add Role Validation

    ///

    return this.adminRepository.findAllDetailedRequestsForCompany(companyId);
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
  async processRequest(
    adminUserId: Types.ObjectId,
    acceptRequestDto: AcceptRequestDto,
  ) {
    ///Validation Section
    // User exists
    if ((await this.usersService.userIdExists(adminUserId)) == false) {
      throw new NotFoundException('adminUserId Invalid');
    }
    const requestingUser = await this.usersService.getUserById(
      acceptRequestDto.userToJoinId,
    );

    if (requestingUser == null) {
      throw new NotFoundException('Joining UserId Invalid');
    }
    //companyId
    const company = await this.companyService.getCompanyById(
      acceptRequestDto.companyId,
    );
    if (company == null) throw new BadRequestException('CompanyId Invalid');
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

    if (acceptRequestDto.accept) {
      const username: string = (
        await this.usersService.getUserById(acceptRequestDto.userToJoinId)
      ).systemDetails.username;

      let userRole: FlattenMaps<Role> & { _id: Types.ObjectId };
      if (acceptRequestDto.assignedRoleId != null)
        userRole = await this.roleService.findById(
          acceptRequestDto.assignedRoleId,
        );
      else {
        userRole = await this.roleService.findOneInCompany(
          'Worker',
          acceptRequestDto.companyId,
        );
      }

      const joinedCompany = (
        await this.usersService.getUserById(adminUserId)
      ).joinedCompanies.filter(
        (x) =>
          x.companyId.toLocaleString() ===
          acceptRequestDto.companyId.toString(),
      )[0];

      try {
        await this.companyService.addEmployee({
          adminId: joinedCompany.employeeId,
          currentCompany: acceptRequestDto.companyId,
          newUserUsername: username,
          superiorId: acceptRequestDto.superiorId,
          roleId: userRole._id,
        });
      } catch (Error) {
        console.log(Error);
        throw Error;
      }

      //Notification of acceptance
      const fName = requestingUser.personalInfo.firstName;
      const lName = requestingUser.personalInfo.surname;
      const companyName = company.name;
      const roleName = userRole.roleName;
      await this.notificationService.createNotificationsFromUser({
        //THIS IS A MOCK
        message: `Congratulations, ${fName} ${lName}! You have been accepted into ${companyName} in the role: ${roleName}`,
        recipientIds: [acceptRequestDto.userToJoinId],
      });
      //remove request
      await this.adminRepository.acceptRequest(
        acceptRequestDto.userToJoinId,
        acceptRequestDto.companyId,
      );

      return true;
    } else {
      const fName = requestingUser.personalInfo.firstName;
      const lName = requestingUser.personalInfo.surname;
      const companyName = company.name;
      //Reject and delete request
      await this.notificationService.createNotificationsFromUser({
        //THIS IS A MOCK
        message: `Good day, ${fName} ${lName}. You have unfortunately been rejected from ${companyName}.`,
        recipientIds: [acceptRequestDto.userToJoinId],
      });
      await this.adminRepository.rejectRequest(
        acceptRequestDto.userToJoinId,
        acceptRequestDto.companyId,
      );
      return true;
    }
  }
}
