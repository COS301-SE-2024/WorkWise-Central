import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Types } from 'mongoose';
import { Inventory } from './entities/inventory.entity';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';
import { RoleService } from '../role/role.service';
import { JobService } from '../job/job.service';
import { TeamService } from '../team/team.service';
import { InventoryRepository } from './inventory.repository';

@Injectable()
export class InventoryService {
  constructor(
    @Inject(forwardRef(() => InventoryRepository))
    private readonly inventoryRepository: InventoryRepository,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly companyService: CompanyService,

    @Inject(forwardRef(() => RoleService))
    private readonly roleService: RoleService,

    @Inject(forwardRef(() => JobService))
    private readonly jobService: JobService,

    private teamService: TeamService,
  ) {}

  async validateCreateInventory(inventory: CreateInventoryDto) {
    //Checking that the company exists
    if (!(await this.companyService.companyIdExists(inventory.companyId))) {
      return false;
    }
    return true;
  }

  async validateUpdateInventory(id: Types.ObjectId) {
    //Checking that the inventory item exists
    if (!(await this.InventoryExists(id))) {
      return false;
    }
    return true;
  }

  async create(createInventoryDto: CreateInventoryDto) {
    console.log('create function');
    if (this.validateCreateInventory(createInventoryDto)) {
      const newInventory = new Inventory(createInventoryDto);
      return await this.inventoryRepository.save(newInventory);
    }
    return null;
  }

  async findAll() {
    return await this.inventoryRepository.findAll();
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    return await this.inventoryRepository.findAllInCompany(companyId);
  }

  async findById(id: Types.ObjectId) {
    return await this.inventoryRepository.findById(id);
  }

  async InventoryExists(id: Types.ObjectId): Promise<boolean> {
    return await this.inventoryRepository.InventoryExists(id);
  }

  async InventoryExistsForCompany(
    id: Types.ObjectId,
    companyId: Types.ObjectId,
  ): Promise<boolean> {
    return await this.inventoryRepository.InventoryExistsForCompany(
      id,
      companyId,
    );
  }

  async update(id: Types.ObjectId, updateInventoryDto: UpdateInventoryDto) {
    if (this.validateUpdateInventory(id)) {
      return await this.inventoryRepository.update(id, updateInventoryDto);
    }
    return null;
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    return await this.inventoryRepository.remove(id);
  }
}
