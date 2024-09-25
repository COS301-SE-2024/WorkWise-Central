import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
// import { Types } from 'mongoose';
import { InventoryService } from '../inventory.service';
import { InventoryRepository } from '../inventory.repository';
import { CompanyService } from '../../company/company.service';
import { Inventory } from '../entities/inventory.entity';
import { FileModule } from '../../file/file.module';
import { StockTakeService } from '../../stocktake/stocktake.service';
import { StockMovementsService } from '../../stockmovements/stockmovements.service';
import { JobService } from '../../job/job.service';
import { EmployeeService } from '../../employee/employee.service';
import { InventoryUsedService } from '../../inventory-used/inventory-used.service';

const mockInventoryRepository = {
  findAll: jest.fn(),
  findAllInCompany: jest.fn(),
  findById: jest.fn(),
  findByIds: jest.fn(),
  InventoryExists: jest.fn(),
  InventoryExistsForCompany: jest.fn(),
  getCompanyIdFromInventory: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  save: jest.fn(),
};

const mockCompanyService = {
  companyIdExists: jest.fn(),
};

const mockStockTakeService = {
  stockTakeExists: jest.fn(),
};

const mockStockMovementsService = {};

const mockJobService = {};

const mockEmployeeService = {};

const mockInventoryUsedService = {};

describe('--Inventory Service--', () => {
  let inventoryService: InventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FileModule],
      providers: [
        InventoryService,
        { provide: getModelToken(Inventory.name), useValue: {} },
        { provide: InventoryRepository, useValue: mockInventoryRepository },
        { provide: CompanyService, useValue: mockCompanyService },
        { provide: StockTakeService, useValue: mockStockTakeService },
        { provide: StockMovementsService, useValue: mockStockMovementsService },
        { provide: JobService, useValue: mockJobService },
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: InventoryUsedService, useValue: mockInventoryUsedService },
      ],
    }).compile();

    inventoryService = module.get<InventoryService>(InventoryService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(inventoryService).toBeDefined();
  });

  describe('create', () => {
    // TODO
  });

  describe('findAll', () => {
    // it('should return all Inventory items', async () => {
    //   const expectedResponse = [
    //     {
    //       _id: new Types.ObjectId(),
    //       name: 'item 1',
    //       description: 'item 1 description',
    //       costPrice: 10,
    //       currentStockLevel: 20,
    //       reorderLevel: 5,
    //       companyId: new Types.ObjectId(),
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       deletedAt: null,
    //     },
    //     {
    //       _id: new Types.ObjectId(),
    //       name: 'item 2',
    //       description: 'item 2 description',
    //       costPrice: 30,
    //       currentStockLevel: 87,
    //       reorderLevel: 36,
    //       companyId: new Types.ObjectId(),
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       deletedAt: null,
    //     },
    //   ];
    //   mockInventoryRepository.findAll.mockResolvedValue(expectedResponse);
    //   expect(await inventoryService.findAll()).toEqual(expectedResponse);
    // });
  });

  describe('findAllInCompany', () => {
    // it('should return all Inventory items in a given company', async () => {
    //   const companyId = new Types.ObjectId();
    //   const expectedResponse = [
    //     {
    //       _id: new Types.ObjectId(),
    //       name: 'item 1',
    //       description: 'item 1 description',
    //       costPrice: 10,
    //       currentStockLevel: 20,
    //       reorderLevel: 5,
    //       companyId: companyId,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       deletedAt: null,
    //     },
    //     {
    //       _id: new Types.ObjectId(),
    //       name: 'item 2',
    //       description: 'item 2 description',
    //       costPrice: 30,
    //       currentStockLevel: 87,
    //       reorderLevel: 36,
    //       companyId: companyId,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       deletedAt: null,
    //     },
    //   ];
    //   mockCompanyService.companyIdExists.mockResolvedValue(true);
    //   mockInventoryRepository.findAllInCompany.mockResolvedValue(expectedResponse);
    //   expect(await inventoryService.findAllInCompany(companyId)).toEqual(expectedResponse);
    // });
  });

  describe('findById', () => {
    // it('should return an Inventory item by id', async () => {
    //   const id = new Types.ObjectId();
    //   const expectedResponse = {
    //     _id: new Types.ObjectId(),
    //     name: 'item 1',
    //     description: 'item 1 description',
    //     costPrice: 10,
    //     currentStockLevel: 20,
    //     reorderLevel: 5,
    //     companyId: new Types.ObjectId(),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     deletedAt: null,
    //   };
    //   mockInventoryRepository.findById.mockResolvedValue(expectedResponse);
    //   expect(await inventoryService.findById(id)).toEqual(expectedResponse);
    // });
  });

  describe('InventoryExists', () => {
    // it('should return true if the Inventory item exists', async () => {
    //   const id = new Types.ObjectId();
    //   mockInventoryRepository.InventoryExists.mockResolvedValue(true);
    //   expect(await inventoryService.InventoryExists(id)).toBe(true);
    // });
    // it('should return false if the Inventory item does not exist', async () => {
    //   const id = new Types.ObjectId();
    //   mockInventoryRepository.InventoryExists.mockResolvedValue(false);
    //   expect(await inventoryService.InventoryExists(id)).toBe(false);
    // });
  });

  describe('InventoryExistsForCompany', () => {
    // it('should return true if the Inventory item exists in a given company', async () => {
    //   const id = new Types.ObjectId();
    //   const companyId = new Types.ObjectId();
    //   mockCompanyService.companyIdExists.mockResolvedValue(true);
    //   mockInventoryRepository.InventoryExistsForCompany.mockResolvedValue(true);
    //   expect(await inventoryService.InventoryExistsForCompany(id, companyId)).toBe(true);
    // });
    // it('should return false if the Inventory item does not exist in a given company', async () => {
    //   const id = new Types.ObjectId();
    //   const companyId = new Types.ObjectId();
    //   mockCompanyService.companyIdExists.mockResolvedValue(true);
    //   mockInventoryRepository.InventoryExistsForCompany.mockResolvedValue(false);
    //   expect(await inventoryService.InventoryExistsForCompany(id, companyId)).toBe(false);
    // });
  });

  describe('update', () => {
    // TODO
  });

  describe('remove', () => {
    // it('should return true if the Inventory item is deleted', async () => {
    //   const id = new Types.ObjectId();
    //   //mocking the InventoryExists function
    //   jest.spyOn(inventoryService, 'InventoryExists').mockResolvedValue(true);
    //   mockInventoryRepository.remove.mockResolvedValue(true);
    //   expect(await inventoryService.remove(id)).toBe(true);
    // });
    // it('should return false if the Inventory item is not deleted', async () => {
    //   const id = new Types.ObjectId();
    //   jest.spyOn(inventoryService, 'InventoryExists').mockResolvedValue(true);
    //   mockInventoryRepository.remove.mockResolvedValue(false);
    //   expect(await inventoryService.remove(id)).toBe(false);
    // });
  });
});
