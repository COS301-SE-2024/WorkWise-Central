import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { getModelToken } from '@nestjs/mongoose';
import { userStub } from '../../test/stubs/user.stub';

describe('ClientService', () => {
  let service: ClientService;

  // Mock the client model
  const mockClientModel = {
    create: jest.fn().mockReturnValue(userStub()),
    findAll: jest.fn().mockReturnValue(userStub()),
    findUser: jest.fn().mockReturnValue(userStub()),
    update: jest.fn().mockReturnValue(userStub()),
    remove: jest.fn().mockReturnValue(userStub()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getModelToken('client'),
          useValue: mockClientModel,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
