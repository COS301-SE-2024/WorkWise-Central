import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CancelInviteDto,
  CancelRequestDto,
  RejectInviteDto,
  UserInviteRequestDto,
  UserJoinRequestDto,
} from '../users/dto/request-to-join.dto';
import { FlattenMaps, Types } from 'mongoose';
import { AdminRepository } from './admin.repository';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { UserJoinRequest } from './entities/request-to-join.entity';
import { AcceptInviteDto, AcceptRequestDto } from '../client/dto/accept-request.dto';
import { EmployeeService } from '../employee/employee.service';
import { RoleService } from '../role/role.service';
import { NotificationService } from '../notification/notification.service';
import { Role } from '../role/entity/role.entity';
import { InviteToJoin } from './entities/invite-to-join.entity';
import { EmailService } from '../email/email.service';

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

    private emailService: EmailService,
  ) {}

  async createRequest(
    //User must have a WorkWise Account
    userId: Types.ObjectId,
    requestToJoin: UserJoinRequestDto,
  ) {
    //Validation Section
    if (!(await this.usersService.userIdExists(userId))) {
      throw new BadRequestException('userId Invalid');
    }

    if (!(await this.companyService.companyIdExists(requestToJoin.companyId))) {
      throw new BadRequestException('CompanyId Invalid');
    }

    const userIsInCompany = await this.usersService.userIsInCompany(userId, requestToJoin.companyId);
    if (userIsInCompany) {
      throw new BadRequestException('User Already in company');
    }

    const requestsToCompany: (FlattenMaps<UserJoinRequest> & {
      _id: Types.ObjectId;
    })[] = await this.adminRepository.findRequestsFromUserForCompany(userId, requestToJoin.companyId);

    if (requestsToCompany.length > 0) {
      throw new ConflictException('User has already made a request to join this company');
    }

    //
    const company = await this.companyService.getCompanyById(requestToJoin.companyId);
    const desiredRole = requestToJoin.roleId
      ? await this.roleService.findById(requestToJoin.roleId)
      : await this.roleService.findOneInCompany('Worker', company._id);

    if (desiredRole == null) {
      throw new InternalServerErrorException('RoleId Invalid');
    } else {
      console.log('Role:', desiredRole);
    }

    const newRequest = new UserJoinRequest(company._id, desiredRole._id, userId, company.name, desiredRole.roleName);
    const savedReq = await this.adminRepository.saveRequest(newRequest);

    const employees = await this.employeeService.findAllInCompany(requestToJoin.companyId);
    //TODO: If they have company settings permissions
    //employees = employees.filter((x) => {x.permissionSuite.includes('can edit company')})
    const userIds: Types.ObjectId[] = [];
    for (const employee of employees) {
      userIds.push(employee.userId);
    }

    //Get needed information for message
    const user = await this.usersService.getUserById(userId);

    if (user == null) {
      throw new NotFoundException('User not found');
    }

    await this.notificationService.create({
      recipientIds: userIds,
      message: {
        title: `New Request to join ${company.name}`,
        body: `${user.personalInfo.firstName} ${user.personalInfo.surname} would like to join ${company.name},
         in the role of ${desiredRole.roleName}`,
        data: {
          type: 'requestToJoin',
        },
      },
      isJobRelated: false,
      companyName: company.name,
    });
    return savedReq;
  }

  async createInvite(
    //User must have a WorkWise Account
    userId: Types.ObjectId,
    userInviteRequestDto: UserInviteRequestDto,
  ) {
    if (!(await this.usersService.userIdExists(userId))) {
      throw new BadRequestException('userId Invalid');
    }

    const employee = await this.employeeService.findById(userInviteRequestDto.employeeId);
    if (employee.userId.toString() !== userId.toString()) throw new UnauthorizedException('UserId not in employee');

    const company = await this.companyService.getCompanyById(employee.companyId);
    if (company == null) throw new NotFoundException('Company Invalid');

    // Someone with the email address already exists
    const userAlreadyInCompany = await this.usersService.userWithEmailExistsInCompany(
      company._id,
      userInviteRequestDto.emailToInvite,
    );
    if (userAlreadyInCompany) {
      throw new ConflictException('User with email already in company');
    }
    // get user
    const invitesToUser: (FlattenMaps<InviteToJoin> & {
      _id: Types.ObjectId;
    })[] = await this.adminRepository.findInvitesForUser(userInviteRequestDto.emailToInvite);

    if (invitesToUser.length > 0) {
      for (const invite of invitesToUser) {
        //Prevent spam invites
        if (
          invite.companyId.toString() === company._id.toString() &&
          invite.emailBeingInvited == userInviteRequestDto.emailToInvite
        ) {
          throw new ConflictException('Invite already exists');
        }
      }
      throw new ConflictException('User has already made a request to join this company');
    }

    const role =
      userInviteRequestDto.roleId == null
        ? await this.roleService.findOneInCompany('Worker', company._id)
        : await this.roleService.findById(userInviteRequestDto.roleId);

    //
    const newInvite = new InviteToJoin(
      company._id,
      company.name,
      role._id,
      role.roleName,
      userInviteRequestDto.emailToInvite,
      userInviteRequestDto.superiorId,
    );
    const result = await this.adminRepository.saveInvite(newInvite);

    const hasAccount = await this.usersService.emailExists(userInviteRequestDto.emailToInvite);
    await this.emailService.sendInvite(newInvite, result._id, hasAccount);

    return result;
  }

  async cancelRequest(userId: Types.ObjectId, cancelRequestDto: CancelRequestDto) {
    //Validation Section
    if (!(await this.usersService.userIdExists(userId))) {
      throw new BadRequestException('userId Invalid');
    }

    if (!(await this.companyService.companyIdExists(cancelRequestDto.companyId))) {
      throw new BadRequestException('CompanyId Invalid');
    }

    const userIsInCompany = await this.usersService.userIsInCompany(userId, cancelRequestDto.companyId);
    if (userIsInCompany) {
      throw new BadRequestException('User already in company');
    }
    //
    const req = await this.adminRepository.cancelRequest(userId, cancelRequestDto.companyId);
    console.log(req.deletedCount);
    return req.deletedCount > 0;
  }

  async getAllRequests() {
    return this.adminRepository.findAllRequests();
  }

  async getAllRequestsInCompany(userId: Types.ObjectId, companyId: Types.ObjectId) {
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
    const userIsInCompany = await this.usersService.userIsInCompany(userId, companyId);
    if (!userIsInCompany) {
      throw new UnauthorizedException('User not in company');
    }
    //TODO: Add Role Validation

    ///

    return this.adminRepository.findAllRequestsForCompany(companyId);
  }

  async getAllDetailedRequestsInCompany(userId: Types.ObjectId, companyId: Types.ObjectId) {
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
    const userIsInCompany = await this.usersService.userIsInCompany(userId, companyId);
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
  async processRequest(adminUserId: Types.ObjectId, acceptRequestDto: AcceptRequestDto) {
    ///Validation Section
    // User exists
    if ((await this.usersService.userIdExists(adminUserId)) == false) {
      throw new NotFoundException('adminUserId Invalid');
    }
    const requestingUser = await this.usersService.getUserById(acceptRequestDto.userToJoinId);

    if (requestingUser == null) {
      throw new NotFoundException('Joining UserId Invalid');
    }
    //companyId
    const company = await this.companyService.getCompanyById(acceptRequestDto.companyId);
    if (company == null) throw new BadRequestException('CompanyId Invalid');
    //superiorId
    const superior = await this.employeeService.findById(acceptRequestDto.superiorId);
    if (superior == null) throw new BadRequestException('superiorId Invalid');

    const isInCompany = await this.companyService.employeeIsInCompany(
      acceptRequestDto.companyId,
      acceptRequestDto.superiorId,
    );
    if (!isInCompany) throw new BadRequestException('Employee not In Company');
    //subordinates?
    if (acceptRequestDto.subordinates.length > 0) {
      for (const subordinateId of acceptRequestDto.subordinates) {
        const subordinateIsInCompany = await this.companyService.employeeIsInCompany(
          acceptRequestDto.companyId,
          subordinateId,
        );
        if (!subordinateIsInCompany) throw new BadRequestException('SubordinateId Invalid');
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
      const username: string = (await this.usersService.getUserById(acceptRequestDto.userToJoinId)).systemDetails
        .username;

      let userRole: FlattenMaps<Role> & { _id: Types.ObjectId };
      if (acceptRequestDto.assignedRoleId != null)
        userRole = await this.roleService.findById(acceptRequestDto.assignedRoleId);
      else {
        userRole = await this.roleService.findOneInCompany('Worker', acceptRequestDto.companyId);
      }

      const joinedCompany = (await this.usersService.getUserById(adminUserId)).joinedCompanies.filter(
        (x) => x.companyId.toLocaleString() === acceptRequestDto.companyId.toString(),
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
        message: {
          title: 'Congrats',
          body: `Congratulations, ${fName} ${lName}! You have been accepted into ${companyName} in the role: ${roleName}`,
        },
        recipientIds: [acceptRequestDto.userToJoinId],
        isJobRelated: false,
        companyName: company.name,
      });
      //remove request
      await this.adminRepository.acceptRequest(acceptRequestDto.userToJoinId, acceptRequestDto.companyId);

      return true;
    } else {
      const fName = requestingUser.personalInfo.firstName;
      const lName = requestingUser.personalInfo.surname;
      const companyName = company.name;
      //Reject and delete request
      await this.notificationService.createNotificationsFromUser({
        //THIS IS A MOCK
        message: {
          title: 'Rejection',
          body: `Good day, ${fName} ${lName}. You have unfortunately been rejected from ${companyName}.`,
        },
        recipientIds: [acceptRequestDto.userToJoinId],
        isJobRelated: false,
        companyName: company.name,
      });
      await this.adminRepository.rejectRequest(acceptRequestDto.userToJoinId, acceptRequestDto.companyId);
      return true;
    }
  }

  async getAllInvitesInCompany(userId: Types.ObjectId, employeeId: Types.ObjectId) {
    if (!(await this.usersService.userIdExists(userId))) {
      throw new NotFoundException('userId Invalid');
    }
    const employee = await this.employeeService.findById(employeeId);
    //TODO: Role validation here
    if (!employee) throw new NotFoundException('Employee Not Found');

    return this.adminRepository.findAllInvitesFromCompany(employee.companyId);
  }

  //Must have userId
  async acceptInvite(userId: Types.ObjectId, acceptInviteDto: AcceptInviteDto) {
    if (!(await this.usersService.userIdExists(userId))) {
      throw new NotFoundException('userId Invalid');
    }

    const userExists = await this.usersService.userIdExists(userId);
    if (!userExists) throw new NotFoundException('UserId not found');

    const invite = await this.adminRepository.findInviteById(acceptInviteDto.inviteId);
    const newJoinedCompany = await this.companyService.addEmployeeFromInvite({
      roleId: invite._id,
      superiorId: invite.superiorId,
      companyId: invite.companyId,
      newUserId: userId,
    });
    await this.adminRepository.acceptInvite(invite.emailBeingInvited, invite.companyId);

    return newJoinedCompany;
  }

  async cancelInvite(userId: Types.ObjectId, cancelDto: CancelInviteDto) {
    if (!(await this.usersService.userIdExists(userId))) {
      throw new NotFoundException('userId Invalid');
    }

    if (!(await this.companyService.companyIdExists(cancelDto.companyId)))
      throw new NotFoundException('CompanyId Invalid');

    const employee = await this.employeeService.findById(cancelDto.employeeId);
    //TODO: Role validation here
    if (!employee) throw new NotFoundException('Employee Not Found');

    const invite = await this.adminRepository.findInviteById(cancelDto.inviteId);
    if (!invite) throw new NotFoundException('InviteId Invalid');

    await this.adminRepository.cancelInvite(invite.emailBeingInvited, invite.companyId);
    return true;
  }

  async rejectInvite(userId: Types.ObjectId, rejectDto: RejectInviteDto) {
    //userId belongs to invited person
    if (!(await this.usersService.userIdExists(userId))) {
      throw new NotFoundException('userId Invalid');
    }

    const invite = await this.adminRepository.findInviteById(rejectDto.inviteId);
    if (!invite) throw new NotFoundException('InviteId Invalid');

    await this.adminRepository.rejectInvite(invite.emailBeingInvited, invite.companyId);
    return true;
  }
}
