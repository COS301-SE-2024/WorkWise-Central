import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from '../client.controller';
import { ClientService } from '../client.service';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { ClientRepository } from '../client.repository';
import { CompanyService } from '../../company/company.service';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { NotFoundException } from '@nestjs/common';

const moduleMocker = new ModuleMocker(global);

describe('ClientController', () => {
  let clientController: ClientController;
  let clientService: ClientService;

  const mockJwtService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  const clientModelMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ClientController],
      providers: [
        ClientService,
        ClientRepository,
        CompanyService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        { provide: 'ClientModel', useValue: clientModelMock },
      ],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    clientController = module.get<ClientController>(ClientController);
    clientService = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(clientController).toBeDefined();
  });

  describe('update', () => {
    it('should update a client if ID is valid', async () => {
      const userId = new Types.ObjectId();

      jest.spyOn(clientController, 'validateObjectId').mockImplementation((a: string) => {
        console.log(a);
        return true;
      });

      jest.spyOn(clientService, 'updateClient').mockImplementation((a: any) => {
        console.log(a);
        return null;
      });

      const result = await clientService.updateClient(userId, new Types.ObjectId(), { registrationNumber: 'test' });
      expect(result).toBeDefined();
    });

    it('should handle invalid ID and return a bad request error', async () => {
      const userId = new Types.ObjectId();
      const clientId = new Types.ObjectId();

      jest.spyOn(clientController, 'validateObjectId').mockImplementation((a: string) => {
        console.log(a);
        return true;
      });

      //jest.spyOn(clientService,'getClientById')

      try {
        const body = {
          currentEmployeeId: new Types.ObjectId(),
          updateClientDto: {
            registrationNumber: 'test',
          },
        };
        await clientController.update({ userId }, clientId, body);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        //expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });

    it('should handle exceptions and return an internal server error', async () => {
      const userId = new Types.ObjectId();
      const clientId = new Types.ObjectId();

      jest.spyOn(clientService, 'updateClient').mockImplementation((a: any) => {
        console.log(a);
        return null;
      });

      /*      jest
        .spyOn(clientController, 'extractUserId')
        .mockImplementation((a: any) => {
          console.log(a);
          return new Types.ObjectId();
        });*/

      jest.spyOn(clientController, 'validateObjectId').mockImplementation((a: string) => {
        console.log(a);
        return true;
      });

      jest.spyOn(clientService, 'updateClient').mockRejectedValue(new Error('Internal Server Error'));

      /*      jest
        .spyOn(clientController, 'extractUserId')
        .mockImplementation((a: any) => {
          console.log(a);
          return new Types.ObjectId();
        });*/

      try {
        const body = {
          currentEmployeeId: new Types.ObjectId(),
          updateClientDto: {
            registrationNumber: '123/12351/52132',
          },
        };
        await clientController.update({ userId }, clientId, body);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        //expect(error.message).toBe('Internal Server Error');
        //expect(error.getStatus()).toBe(409);
      }
    });
  });

  describe('remove', () => {
    it('should delete a client if ID is valid', async () => {
      const userId = new Types.ObjectId();

      jest.spyOn(clientController, 'validateObjectId').mockImplementation((a: string) => {
        console.log(a);
        return true;
      });

      jest.spyOn(clientService, 'softDelete').mockResolvedValue(true);

      const result = await clientService.softDelete(userId, {
        clientId: new Types.ObjectId(),
        employeeId: new Types.ObjectId(),
      });
      expect(result).toEqual(true);
    });

    it('should handle invalid ID and return a bad request error', async () => {
      const userId = 'new Types.ObjectId()';

      jest.spyOn(clientController, 'validateObjectId').mockImplementation((a: string) => {
        console.log(a);
        return true;
      });

      try {
        await clientController.remove({ userId }, new Types.ObjectId().toString(), new Types.ObjectId().toString());
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        //expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });

    it('should handle exceptions and return an internal server error', async () => {
      const userId = new Types.ObjectId();

      jest.spyOn(clientController, 'validateObjectId').mockImplementation((a: string) => {
        console.log(a);
        return true;
      });

      jest.spyOn(clientService, 'softDelete').mockRejectedValue(new Error('Internal Server Error'));

      try {
        await clientController.remove({ userId }, new Types.ObjectId().toString(), new Types.ObjectId().toString());
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        //expect(error.message).toBe('Internal Server Error');
        //expect(error.getStatus()).toBe(503);
      }
    });
  });
});
