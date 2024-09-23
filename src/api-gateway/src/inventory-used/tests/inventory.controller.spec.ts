import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from '../inventory-used.controller';
import { InventoryService } from '../inventory-used.service';
// import { Types } from 'mongoose';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
// import { HttpException, HttpStatus } from '@nestjs/common';

jest.mock('../inventory.service');
const moduleMocker = new ModuleMocker(global);

describe('--Inventory Controller--', () => {
  let controller: InventoryController;
  // let service: InventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [InventoryService],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<InventoryController>(InventoryController);
    // service = module.get<InventoryService>(InventoryService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('hello', () => {
    it('should return message', () => {
      expect(controller.hello()).toEqual({
        message: 'Refer to /documentation for details on the API',
      });
    });
  });

  describe('findAll', () => {
    //The all endpoint simply returns what is returned from the service with a {data:} wrapper.
    //Hence we only need 1 test.
    // it('should return an array of all Inventory items', async () => {
    //   const returnedResponseFromService = [
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
    //   const expectedResponse = {
    //     data: returnedResponseFromService,
    //   };
    //   jest.spyOn(service, 'findAll').mockResolvedValue(returnedResponseFromService);
    //   const result = await controller.findAll();
    //   expect(result).toEqual(expectedResponse);
    // });
  });

  describe('findAllInCompany', () => {
    // it('should return an array of Inventory items for a given company', async () => {
    //   const companyId = new Types.ObjectId();
    //   const returnedResponseFromService = [
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
    //   const expectedResponse = {
    //     data: returnedResponseFromService,
    //   };
    //   jest.spyOn(service, 'findAllInCompany').mockResolvedValue(returnedResponseFromService);
    //   const currentEmployee = { currentEmployeeId: new Types.ObjectId() };
    //   const result = await controller.findAllInCompany('header', companyId, currentEmployee);
    //   expect(result).toEqual(expectedResponse);
    // });
  });

  describe('findById', () => {
    // it('Should return a inventory item given a valid Id', async () => {
    //   const InventoryId = new Types.ObjectId();
    //   const returnedResponseFromService = {
    //     _id: new Types.ObjectId(),
    //     name: 'item 2',
    //     description: 'item 2 description',
    //     costPrice: 30,
    //     currentStockLevel: 87,
    //     reorderLevel: 36,
    //     companyId: new Types.ObjectId(),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     deletedAt: null,
    //   };
    //   const expectedResponse = {
    //     data: returnedResponseFromService,
    //   };
    //   jest.spyOn(service, 'findById').mockResolvedValue(returnedResponseFromService);
    //   const currentEmployee = { currentEmployeeId: new Types.ObjectId() };
    //   const result = await controller.findById('header', InventoryId, currentEmployee);
    //   expect(result).toEqual(expectedResponse);
    // });
  });

  describe('update', () => {
    // it('should return the updated Inventory', async () => {
    //   const InventoryId = new Types.ObjectId();
    //   const updateInventoryDto = {
    //     name: 'item 1 new name',
    //     description: 'item 1 new description',
    //     costPrice: 103,
    //     currentStockLevel: 43,
    //     reorderLevel: 12,
    //   };
    //   const returnedResponseFromService = {
    //     _id: InventoryId,
    //     name: 'item 1 new name',
    //     description: 'item 1 new description',
    //     costPrice: 103,
    //     currentStockLevel: 43,
    //     reorderLevel: 12,
    //     companyId: new Types.ObjectId(),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     deletedAt: null,
    //   };
    //   const expectedResponse = {
    //     data: returnedResponseFromService,
    //   };
    //   jest.spyOn(service, 'update').mockResolvedValue(returnedResponseFromService);
    //   const body = {
    //     currentEmployeeId: new Types.ObjectId(),
    //     updateInventoryDto: updateInventoryDto,
    //   };
    //   const result = await controller.update('header', InventoryId, body);
    //   expect(result).toEqual(expectedResponse);
    // });
  });

  describe('remove', () => {
    // it('should return true if Inventory is deleted', async () => {
    //   const InventoryId = new Types.ObjectId();
    //   const returnedResponseFromService = true;
    //   const expectedResponse = {
    //     data: returnedResponseFromService,
    //   };
    //   jest.spyOn(service, 'remove').mockResolvedValue(returnedResponseFromService);
    //   const currentEmployee = { currentEmployeeId: new Types.ObjectId() };
    //   const result = await controller.remove('header', InventoryId, currentEmployee);
    //   expect(result).toEqual(expectedResponse);
    // });
    // it('should return internal server error if Inventory is not deleted', async () => {
    //   const InventoryId = new Types.ObjectId();
    //   const returnedResponseFromService = false;
    //   jest
    //     .spyOn(service, 'remove')
    //     .mockResolvedValue(returnedResponseFromService);
    //   const result = await controller.remove(InventoryId);
    //   expect(result).toEqual(
    //     new HttpException(
    //       'update unsuccessful',
    //       HttpStatus.INTERNAL_SERVER_ERROR,
    //     ),
    //   );
    // });
  });
});
