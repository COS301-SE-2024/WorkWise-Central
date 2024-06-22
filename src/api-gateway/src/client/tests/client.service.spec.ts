import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from '../client.service';
import { userStub } from '../../../test/stubs/user.stub';
import { ClientRepository } from '../client.repository';

describe('ClientService', () => {
  let service: ClientService;

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
          provide: 'ClientModel',
          useValue: mockClientModel,
        },
        {
          provide: ClientRepository,
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
