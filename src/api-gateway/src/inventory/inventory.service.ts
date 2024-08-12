import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Types } from 'mongoose';
import { Inventory } from './entities/inventory.entity';
import { CompanyService } from '../company/company.service';
import { InventoryRepository } from './inventory.repository';
import { ValidationResult } from '../auth/entities/validationResult.entity';

@Injectable()
export class InventoryService {
  constructor(
    @Inject(forwardRef(() => InventoryRepository))
    private readonly inventoryRepository: InventoryRepository,
    private readonly companyService: CompanyService,
  ) {}

  async validateCreateInventory(inventory: CreateInventoryDto) {
    //Checking that the company exists
    if (!(await this.companyService.companyIdExists(inventory.companyId))) {
      return new ValidationResult(false, `Company not found`);
    }
    return new ValidationResult(true, `All good`);
  }

  async validateUpdateInventory(id: Types.ObjectId) {
    //Checking that the inventory item exists
    if (!(await this.InventoryExists(id))) {
      return new ValidationResult(false, `Inventory item not found`);
    }
    return new ValidationResult(true, `All good`);
  }

  async create(createInventoryDto: CreateInventoryDto) {
    const validation = await this.validateCreateInventory(createInventoryDto);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    const newInventory = new Inventory(createInventoryDto);
    return await this.inventoryRepository.save(newInventory);
  }

  async findAll() {
    return await this.inventoryRepository.findAll();
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    //checking if the company exist
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    return await this.inventoryRepository.findAllInCompany(companyId);
  }

  async findById(id: Types.ObjectId) {
    return await this.inventoryRepository.findById(id);
  }

  async InventoryExists(id: Types.ObjectId): Promise<boolean> {
    return await this.inventoryRepository.InventoryExists(id);
  }

  async InventoryExistsForCompany(id: Types.ObjectId, companyId: Types.ObjectId): Promise<boolean> {
    //checking if the company exist
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    return await this.inventoryRepository.InventoryExistsForCompany(id, companyId);
  }

  async update(id: Types.ObjectId, updateInventoryDto: UpdateInventoryDto) {
    console.log('In update. Id: ', id);
    const validation = await this.validateUpdateInventory(id);
    console.log('validation: ', validation);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    console.log('validation is done');
    return await this.inventoryRepository.update(id, updateInventoryDto);
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    //checking if the inventory item exists
    if (!(await this.InventoryExists(id))) {
      throw new Error('Inventory item does not exist');
    }
    return await this.inventoryRepository.remove(id);
  }
}
