import { InventoryService } from './../inventory/inventory.service';
import { JobService } from '../job/job.service';
import { EmployeeService } from '../employee/employee.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateInventoryUsedDto } from './dto/create-inventory-used.dto';
import { Types } from 'mongoose';
import { InventoryUsed } from './entities/inventory-used.entity';
import { CompanyService } from '../company/company.service';
import { InventoryUsedRepository } from './inventory-used.repository';
import { ValidationResult } from '../auth/entities/validationResult.entity';
import { StockTakeService } from '../stocktake/stocktake.service';
import { StockMovementsService } from '../stockmovements/stockmovements.service';
import { UpdateInventoryUsedDto } from './dto/update-inventory-used.dto';

@Injectable()
export class InventoryUsedService {
  constructor(
    @Inject(forwardRef(() => InventoryUsedRepository))
    private readonly inventoryUsedRepository: InventoryUsedRepository,

    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,

    @Inject(forwardRef(() => StockTakeService))
    private readonly stockTakeService: StockTakeService,

    @Inject(forwardRef(() => InventoryService))
    private readonly inventoryService: InventoryService,

    @Inject(forwardRef(() => StockMovementsService))
    private readonly stockMovementsService: StockMovementsService,

    @Inject(forwardRef(() => JobService))
    private readonly jobService: JobService,

    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,
  ) {}

  async validateCreateInventoryUsed(InventoryUsed: CreateInventoryUsedDto) {
    //Checking that the company exists
    if (!(await this.companyService.companyIdExists(InventoryUsed.companyId))) {
      return new ValidationResult(false, `Company not found`);
    }

    //Checking that the inventory item exists
    if (!(await this.inventoryService.InventoryExists(InventoryUsed.inventoryId))) {
      return new ValidationResult(false, `Inventory item not found`);
    }

    //Checking that the job exists
    if (!(await this.jobService.jobExistsInCompany(InventoryUsed.jobId, InventoryUsed.companyId))) {
      return new ValidationResult(false, `Job not found`);
    }

    //Checking that the employee exists
    if (!(await this.employeeService.employeeExists(InventoryUsed.employeeId))) {
      return new ValidationResult(false, `Employee not found`);
    }

    return new ValidationResult(true, `All good`);
  }

  async create(createInventoryUsedDto: CreateInventoryUsedDto) {
    const validation = await this.validateCreateInventoryUsed(createInventoryUsedDto);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    const newInventoryUsed = new InventoryUsed(createInventoryUsedDto);
    return await this.inventoryUsedRepository.save(newInventoryUsed);
  }

  async findAll() {
    return await this.inventoryUsedRepository.findAll();
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    //checking if the company exist
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    return await this.inventoryUsedRepository.findAllInCompany(companyId);
  }

  async findAllForJob(jobId: Types.ObjectId) {
    console.log('jobId', jobId);
    return await this.inventoryUsedRepository.findAllForJob(jobId);
  }

  async findById(id: Types.ObjectId) {
    return await this.inventoryUsedRepository.findById(id);
  }

  async update(id: Types.ObjectId, updateInventoryUsedDto: UpdateInventoryUsedDto) {
    const InventoryUsed = await this.findById(id);
    if (!InventoryUsed) {
      throw new Error('InventoryUsed not found');
    }
    return await this.inventoryUsedRepository.update(id, updateInventoryUsedDto);
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    return await this.inventoryUsedRepository.remove(id);
  }
}
