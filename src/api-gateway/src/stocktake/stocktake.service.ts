import { InventoryService } from './../inventory/inventory.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { StockTakeRepository } from './stocktake.repository';
import { FileService } from '../file/file.service';
import { ValidationResult } from '../auth/entities/validationResult.entity';
import { CreateStocktakeDto } from './dto/create-stocktake.dto';
import { StockTake } from './entities/stocktake.entity';
import { Types } from 'mongoose';
import { CompanyService } from '../company/company.service';
import { UpdateStockTakeDto } from './dto/update-stocktake.dto';

@Injectable()
export class StockTakeService {
  constructor(
    @Inject(forwardRef(() => StockTakeRepository))
    private readonly stocktakeRepository: StockTakeRepository,
    private readonly inventoryService: InventoryService,
    private readonly companyService: CompanyService,

    @Inject(forwardRef(() => FileService))
    private readonly fileService: FileService,
  ) {}

  async validateCreateStockTake(stocktake: CreateStocktakeDto) {
    //Checking that all the id's are valid
    for (const item of stocktake.items) {
      if (!(await this.inventoryService.InventoryExists(item.inventoryItem))) {
        return new ValidationResult(false, `Inventory item not found`);
      }
    }
    return new ValidationResult(true, `All good`);
  }

  async validateUpdateInventory(id: Types.ObjectId, updateStockTakeDto: UpdateStockTakeDto) {
    //checking if the stocktake exists
    if (!(await this.stockTakeExisits(id))) {
      return new ValidationResult(false, `Stocktake not found`);
    }
    //Checking that all the id's are valid
    for (const item of updateStockTakeDto.items) {
      if (!(await this.inventoryService.InventoryExists(item.inventoryItem))) {
        return new ValidationResult(false, `Inventory item not found`);
      }
    }
    return new ValidationResult(true, `All good`);
  }

  async create(stocktakeDto: CreateStocktakeDto) {
    const validation = await this.validateCreateStockTake(stocktakeDto);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    const newInventory = new StockTake(stocktakeDto);
    return await this.stocktakeRepository.save(newInventory);
  }

  async findAll() {
    return await this.stocktakeRepository.findAll();
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    //checking if the company exist
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    return await this.stocktakeRepository.findAllInCompany(companyId);
  }

  async findById(id: Types.ObjectId) {
    return await this.stocktakeRepository.findById(id);
  }

  async stockTakeExisits(id: Types.ObjectId) {
    return (await this.stocktakeRepository.findById(id)) != null;
  }

  async update(id: Types.ObjectId, updateStockTakeDto: UpdateStockTakeDto) {
    console.log('In update. Id: ', id);
    const validation = await this.validateUpdateInventory(id, updateStockTakeDto);
    console.log('validation: ', validation);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    console.log('validation is done');
    return await this.stocktakeRepository.update(id, updateStockTakeDto);
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    //checking if the inventory item exists
    if (!(await this.stockTakeExisits(id))) {
      throw new Error('Inventory item does not exist');
    }
    return await this.stocktakeRepository.remove(id);
  }
}
