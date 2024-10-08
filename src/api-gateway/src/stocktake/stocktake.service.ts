import { InventoryService } from '../inventory/inventory.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { StockTakeRepository } from './stocktake.repository';
import { ValidationResult } from '../auth/entities/validationResult.entity';
import { CreateStocktakeDto, OuterCreateStocktakeDto } from './dto/create-stocktake.dto';
import { StockTakeItem } from './entities/stocktake.entity';
import { StockTake } from './entities/stocktake.entity';
import { Types } from 'mongoose';
import { CompanyService } from '../company/company.service';
import { UpdateStockTakeDto } from './dto/update-stocktake.dto';
import { ExternalInventoryUpdateDto, UpdateInventoryDto } from '../inventory/dto/update-inventory.dto';

@Injectable()
export class StockTakeService {
  constructor(
    @Inject(forwardRef(() => StockTakeRepository))
    private readonly stocktakeRepository: StockTakeRepository,
    @Inject(forwardRef(() => InventoryService))
    private readonly inventoryService: InventoryService,
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
  ) {}

  async validateCreateStockTake(stocktake: CreateStocktakeDto) {
    //Checking that all the id's are valid
    for (const item of stocktake.items) {
      if (!(await this.inventoryService.InventoryExists(item.inventoryId))) {
        return new ValidationResult(false, `Inventory item not found`);
      }
    }

    //checking that all the inventory items is part of the given company
    const listInventory = await this.inventoryService.findAllInCompany(stocktake.companyId);
    for (const item of stocktake.items) {
      if (!listInventory.some((inventory) => inventory._id === item.inventoryId)) {
        return new ValidationResult(false, `Inventory item does not exist in the company`);
      }
    }
    return new ValidationResult(true, `All good`);
  }

  async validateUpdateInventory(id: Types.ObjectId, updateStockTakeDto: UpdateStockTakeDto) {
    //checking if the stocktake exists
    if (!(await this.stockTakeExists(id))) {
      return new ValidationResult(false, `Stock take not found`);
    }
    //Checking that all the id's are valid
    for (const item of updateStockTakeDto.items) {
      if (!(await this.inventoryService.InventoryExists(item.inventoryId))) {
        return new ValidationResult(false, `Inventory item not found`);
      }
    }
    return new ValidationResult(true, `All good`);
  }

  async create(stocktakeDto: OuterCreateStocktakeDto) {
    //Creating the stocktake dto

    console.log('In create stocktake');
    const itemsForCreate: StockTakeItem[] = [];
    for (const items of stocktakeDto.items) {
      const inventory = await this.inventoryService.findById(items.inventoryId);
      console.log('in loop: ', inventory);
      itemsForCreate.push({
        currentStockLevel: inventory.currentStockLevel,
        recordedStockLevel: items.recordedStockLevel,
        inventoryItem: { inventoryId: inventory._id, name: inventory.name },
      });
    }

    console.log('this is the itemsForCreate: ');

    const stocktake = new StockTake();
    stocktake.companyId = stocktakeDto.companyId;
    stocktake.date = stocktakeDto.date;
    stocktake.items = itemsForCreate;
    console.log('stocktake: ', stocktake);
    const response = await this.stocktakeRepository.save(stocktake);

    console.log('Stock take has been saved');
    //Checking if the inventory needs to be updated
    if (stocktakeDto.updateInventory) {
      console.log('Updating inventory');
      for (const createDto of stocktakeDto.items) {
        const dto = new ExternalInventoryUpdateDto();
        dto.currentEmployeeId = stocktakeDto.currentEmployeeId;
        dto.updateInventoryDto = new UpdateInventoryDto();
        dto.updateInventoryDto.currentStockLevel = createDto.recordedStockLevel;
        console.log('inventoryId: ', createDto.inventoryId);
        console.log('dto: ', dto);
        await this.inventoryService.update(createDto.inventoryId, dto);
      }
    }
    return response;
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

  async stockTakeExists(id: Types.ObjectId) {
    return (await this.stocktakeRepository.findById(id)) != null;
  }

  async update(id: Types.ObjectId, updateStockTakeDto: UpdateStockTakeDto) {
    console.log('validation is done');
    return await this.stocktakeRepository.update(id, updateStockTakeDto);
  }

  async updateInventoryReference(inventoryId: Types.ObjectId, newName: string) {
    return await this.stocktakeRepository.updateInventoryReference(inventoryId, newName);
  }

  async removeReferenceToInventory(inventoryId: Types.ObjectId) {
    return await this.stocktakeRepository.removeReferenceToInventory(inventoryId);
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    //checking if the inventory item exists
    if (!(await this.stockTakeExists(id))) {
      throw new Error('Inventory item does not exist');
    }
    return await this.stocktakeRepository.remove(id);
  }
}
