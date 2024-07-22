import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from '../inventory.controller';
import { InventoryService } from '../inventory.service';
import { Types } from 'mongoose';

jest.mock('../inventory.service');

describe('--Inventory Controller--', () => {
  let controller: InventoryController;
  let service: InventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [InventoryService],
    }).compile();

    controller = module.get<InventoryController>(InventoryController);
    service = module.get<InventoryService>(InventoryService);
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
    it('should return an array of all Inventory items', async () => {
      const returnedResponseFromService = [
        {
          _id: new Types.ObjectId(),
          name: 'item 1',
          description: 'item 1 description',
          costPrice: 10,
          currentStockLevel: 20,
          reorderLevel: 5,
          companyId: new Types.ObjectId(),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          _id: new Types.ObjectId(),
          name: 'item 2',
          description: 'item 2 description',
          costPrice: 30,
          currentStockLevel: 87,
          reorderLevel: 36,
          companyId: new Types.ObjectId(),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
      const expectedResponse = {
        data: returnedResponseFromService,
      };

      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(returnedResponseFromService);
      const result = await controller.findAll();
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('findAllInCompany', () => {
    it('should return an array of Inventory items for a given company', async () => {
      const companyId = new Types.ObjectId();
      const returnedResponseFromService = [
        {
          _id: new Types.ObjectId(),
          name: 'item 1',
          description: 'item 1 description',
          costPrice: 10,
          currentStockLevel: 20,
          reorderLevel: 5,
          companyId: companyId,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          _id: new Types.ObjectId(),
          name: 'item 2',
          description: 'item 2 description',
          costPrice: 30,
          currentStockLevel: 87,
          reorderLevel: 36,
          companyId: companyId,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
      const expectedResponse = {
        data: returnedResponseFromService,
      };

      jest
        .spyOn(service, 'findAllInCompany')
        .mockResolvedValue(returnedResponseFromService);
      const result = await controller.findAllInCompany(companyId);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('findById', () => {
    it('Should return a inventory item given a valid Id', async () => {
      const InventoryId = new Types.ObjectId();
      const returnedResponseFromService = {
        _id: new Types.ObjectId(),
        name: 'item 2',
        description: 'item 2 description',
        costPrice: 30,
        currentStockLevel: 87,
        reorderLevel: 36,
        companyId: new Types.ObjectId(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      const expectedResponse = {
        data: returnedResponseFromService,
      };

      jest
        .spyOn(service, 'findById')
        .mockResolvedValue(returnedResponseFromService);
      const result = await controller.findById(InventoryId);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('update', () => {
    it('should return the updated Inventory', async () => {
      const InventoryId = new Types.ObjectId();
      const updateInventoryDto = {
        name: 'item 1 new name',
        description: 'item 1 new description',
        costPrice: 103,
        currentStockLevel: 43,
        reorderLevel: 12,
      };
      const returnedResponseFromService = {
        _id: InventoryId,
        name: 'item 1 new name',
        description: 'item 1 new description',
        costPrice: 103,
        currentStockLevel: 43,
        reorderLevel: 12,
        companyId: new Types.ObjectId(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      const expectedResponse = {
        data: returnedResponseFromService,
      };

      jest
        .spyOn(service, 'update')
        .mockResolvedValue(returnedResponseFromService);
      const result = await controller.update(InventoryId, updateInventoryDto);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('remove', () => {
    it('should return true if Inventory is deleted', async () => {
      const InventoryId = new Types.ObjectId();
      const returnedResponseFromService = true;
      const expectedResponse = {
        data: returnedResponseFromService,
      };

      jest
        .spyOn(service, 'remove')
        .mockResolvedValue(returnedResponseFromService);
      const result = await controller.remove(InventoryId);
      expect(result).toEqual(expectedResponse);
    });

    it('should return false if Inventory is not deleted', async () => {
      const InventoryId = new Types.ObjectId();
      const returnedResponseFromService = false;
      const expectedResponse = {
        data: returnedResponseFromService,
      };

      jest
        .spyOn(service, 'remove')
        .mockResolvedValue(returnedResponseFromService);
      const result = await controller.remove(InventoryId);
      expect(result).toEqual(expectedResponse);
    });
  });
});
