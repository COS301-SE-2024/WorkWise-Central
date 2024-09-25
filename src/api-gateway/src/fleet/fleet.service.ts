import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import { UsersService } from '../users/users.service';
import { RoleService } from '../role/role.service';
import { FileService } from '../file/file.service';
import { JobService } from '../job/job.service';
import { InventoryService } from '../inventory/inventory.service';
import { TeamService } from '../team/team.service';
import { NotificationService } from '../notification/notification.service';
import { FleetRepository } from './fleet.repository';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { FuelType, Vehicle } from './entities/vehicle.entity';
import { Types } from 'mongoose';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class FleetService {
  constructor(
    private readonly fleetRepository: FleetRepository,

    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService,

    @Inject(forwardRef(() => FileService))
    private readonly fileService: FileService,

    @Inject(forwardRef(() => JobService))
    private readonly jobService: JobService,

    @Inject(forwardRef(() => InventoryService))
    private readonly inventoryService: InventoryService,

    @Inject(forwardRef(() => TeamService))
    private readonly teamService: TeamService,

    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationService,
  ) {}

  async create(userId: Types.ObjectId, createVehicleDto: CreateVehicleDto) {
    //TODO: add logo upload
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    const employee = await this.employeeService.findById(new Types.ObjectId(createVehicleDto.employeeId));
    if (!employee) throw new UnauthorizedException('Employee not found');

    const isValid = user.joinedCompanies.some(
      (j) =>
        j.employeeId.toString() === employee._id.toString() && j.companyId.toString() === employee.companyId.toString(),
    );
    if (!isValid) throw new UnauthorizedException('validation failed');
    if ((<any>Object).values(FuelType).includes(createVehicleDto.fuelType) == false) {
      throw new UnauthorizedException(`Invalid fuel type`);
    }
    console.log(createVehicleDto);
    const createdVehicle = new Vehicle(createVehicleDto);
    return await this.fleetRepository.save(createdVehicle);
  }

  async getAllVehicles(userId: Types.ObjectId) {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    return await this.fleetRepository.findAll();
  }

  async getAllVehiclesInCompany(userId: Types.ObjectId, companyId: Types.ObjectId, employeeId: Types.ObjectId) {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    const employee = await this.employeeService.findById(new Types.ObjectId(employeeId));
    if (!employee) throw new UnauthorizedException('Employee not found');

    const isValid = user.joinedCompanies.some(
      (j) =>
        j.employeeId.toString() === employee._id.toString() && j.companyId.toString() === employee.companyId.toString(),
    );
    if (!isValid) throw new UnauthorizedException('validation failed');
    return await this.fleetRepository.findAllInCompany(companyId);
  }

  async getById(userId: Types.ObjectId, id: Types.ObjectId) {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    return await this.fleetRepository.findById(id);
  }

  async getByVinNumber(userId: Types.ObjectId, vin: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    return await this.fleetRepository.findByVinNumber(vin);
  }

  async updateVehicle(userId: Types.ObjectId, updateVehicleDto: UpdateVehicleDto) {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    const employee = await this.employeeService.findById(new Types.ObjectId(updateVehicleDto.currentEmployeeId));
    if (!employee) throw new UnauthorizedException('Employee not found');

    const isValid = user.joinedCompanies.some(
      (j) =>
        j.employeeId.toString() === employee._id.toString() && j.companyId.toString() === employee.companyId.toString(),
    );
    if (!isValid) throw new UnauthorizedException('validation failed');
    return await this.fleetRepository.update(updateVehicleDto.vehicleId, updateVehicleDto);
  }
}
