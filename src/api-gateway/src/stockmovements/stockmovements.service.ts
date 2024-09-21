import { InventoryService } from './../inventory/inventory.service';
import { EmployeeService } from './../employee/employee.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateStockMovementsDto } from './dto/create-stockmovements.dto';
import { Types } from 'mongoose';
import { EmployeeDetails, InventoryItem, StockMovements } from './entities/stockmovements.entity';
import { CompanyService } from '../company/company.service';
import { StockMovementsRepository } from './stockmovements.repository';
import { UpdateEmployeeInfoDto, UpdateStockMovementsDto } from './dto/update-stockmovements.dto';

@Injectable()
export class StockMovementsService {
  constructor(
    @Inject(forwardRef(() => StockMovementsRepository))
    private readonly stockMovementsRepository: StockMovementsRepository,

    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,

    @Inject(forwardRef(() => InventoryService))
    private readonly inventoryService: InventoryService,

    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,
  ) {}

  async create(createStockMovementsDto: CreateStockMovementsDto) {
    console.log('In create stock movements');
    const newStockMovements = new StockMovements();
    newStockMovements.reason = createStockMovementsDto.reason;
    newStockMovements.movement = createStockMovementsDto.movement;
    newStockMovements.movementDate = createStockMovementsDto.movementDate;
    newStockMovements.companyId = createStockMovementsDto.companyId;

    const employee = await this.employeeService.findById(createStockMovementsDto.employeeId);
    newStockMovements.employee = new EmployeeDetails();
    newStockMovements.employee.employeeId = employee._id;
    newStockMovements.employee.displayName = employee.userInfo.displayName;
    newStockMovements.employee.firstName = employee.userInfo.firstName;
    newStockMovements.employee.surname = employee.userInfo.surname;
    newStockMovements.employee.username = employee.userInfo.username;

    const inventory = await this.inventoryService.findById(createStockMovementsDto.inventoryId);
    newStockMovements.inventoryItem = new InventoryItem();
    newStockMovements.inventoryItem.inventoryId = inventory._id;
    newStockMovements.inventoryItem.nameOfItem = inventory.name;

    console.log('StockMovements: ', newStockMovements);

    return await this.stockMovementsRepository.save(newStockMovements);
  }

  async findAll() {
    return await this.stockMovementsRepository.findAll();
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    console.log('companyId', companyId);
    //checking if the company exist
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    return await this.stockMovementsRepository.findAllInCompany(companyId);
  }

  async findById(id: Types.ObjectId) {
    return await this.stockMovementsRepository.findById(id);
  }

  async StockMovementsExists(id: Types.ObjectId): Promise<boolean> {
    return await this.stockMovementsRepository.StockMovementsExists(id);
  }

  async update(id: Types.ObjectId, updateStockMovementsDto: UpdateStockMovementsDto) {
    return await this.stockMovementsRepository.update(id, updateStockMovementsDto);
  }

  async updateEmployeeInfo(id: Types.ObjectId, updateEmployeeInfoDto: UpdateEmployeeInfoDto) {
    const movement = await this.findById(id);
    const details = new EmployeeDetails();

    details.employeeId = movement.employee.employeeId;

    if (details.username) {
      details.username = updateEmployeeInfoDto.username;
    } else {
      details.username = movement.employee.username;
    }

    if (details.firstName) {
      details.firstName = updateEmployeeInfoDto.firstName;
    } else {
      details.firstName = movement.employee.firstName;
    }

    if (details.surname) {
      details.surname = updateEmployeeInfoDto.surname;
    } else {
      details.surname = movement.employee.surname;
    }

    if (details.displayName) {
      details.displayName = updateEmployeeInfoDto.displayName;
    } else {
      details.displayName = movement.employee.displayName;
    }

    return await this.stockMovementsRepository.updateEmployeeInfo(id, details);
  }

  async removeEmployeeRef(employeeId: Types.ObjectId) {
    return await this.stockMovementsRepository.removeEmployeeRef(employeeId);
  }

  async updateInventoryInfo(id: Types.ObjectId, newName: string) {
    const movement = await this.findById(id);
    const details = new InventoryItem();
    details.inventoryId = movement.inventoryItem.inventoryId;
    details.nameOfItem = newName;
    return await this.stockMovementsRepository.updateInventoryInfo(id, details);
  }

  async removeInventoryRef(inventoryId: Types.ObjectId) {
    return await this.stockMovementsRepository.removeInventoryRef(inventoryId);
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    //checking if the StockMovements item exists
    if (!(await this.StockMovementsExists(id))) {
      throw new Error('StockMovements item does not exist');
    }

    return await this.stockMovementsRepository.remove(id);
  }
}
