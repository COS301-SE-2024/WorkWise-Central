import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from '../client.controller';
import { ClientService } from '../client.service';
import { JwtService } from '@nestjs/jwt';

describe('ClientController', () => {
  let controller: ClientController;

  const mockClientService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  const mockJwtService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  const clientModelMock = {
    find: jest.fn(),
    create: jest.fn(),
    // ...other methods...
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: ClientService,
          useValue: mockClientService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        { provide: 'ClientModel', useValue: clientModelMock },
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
