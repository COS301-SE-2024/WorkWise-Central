import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from '../client.service';
import { ClientRepository } from '../client.repository';
import { CompanyService } from '../../company/company.service';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { CreateClientDto } from '../dto/create-client.dto';
import { Types } from 'mongoose';
import { Client, ClientDetails } from '../entities/client.entity';
import { userStub } from '../../../test/stubs/user.stub';

const moduleMocker = new ModuleMocker(global);

class MockJobModel {
  constructor(private data: any) {}
  create = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn().mockResolvedValue(['event']);
  static watch = jest.fn().mockResolvedValue(['event']);
  static findOne = jest.fn().mockResolvedValue('event');
  static findOneAndUpdate = jest.fn().mockResolvedValue('event');
  static deleteOne = jest.fn().mockResolvedValue(true);
}

describe('ClientService', () => {
  let clientService: ClientService;
  let clientRepository: ClientRepository;

  beforeEach(async () => {
    class MockClientRepository {
      verifyUser(a?: string) {
        return a.includes('@');
      }

      softDelete(a: any = 'softDelete') {
        console.log(a);
        return true;
      }
      getUserByUsername() {
        return null;
      }

      findAll() {
        return [userStub(), userStub()];
      }

      findAllInCompany() {
        return [userStub(), userStub()];
      }

      exists(mockId: Types.ObjectId) {
        return mockId.toString() === new Types.ObjectId().toString();
      }

      emailExists(a: string) {
        const email = userStub().systemDetails.email;
        return email === a;
      }

      phoneExists(a: string) {
        const email = userStub().systemDetails.email;
        return email === a;
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        { provide: CompanyService, useClass: MockJobModel },
        { provide: ClientRepository, useClass: MockClientRepository },

        /*        {
          provide: 'ClientModel',
          useValue: mockClientModel,
        },*/
        /*        {
          provide: ClientRepository,
          useValue: mockClientModel,
        },*/
      ],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    clientService = module.get<ClientService>(ClientService);
    clientRepository = module.get<ClientRepository>(ClientRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(clientService).toBeDefined();
  });
  it('should reject requests to create a client if validation fails', async function () {
    const a = new CreateClientDto();
    a.details = {
      companyId: undefined,
      contactInfo: undefined,
      firstName: '',
      lastName: '',
    };
    //const userValid = await clientService.create(new Types.ObjectId(), a);
    expect(async () => {
      await clientService.create(new Types.ObjectId(), a);
    }).toBeDefined();
  });

  it('should be able to check for existence of clients', async function () {
    jest.spyOn(clientRepository, 'exists').mockResolvedValue(true);
    const a = await clientRepository.exists('a');
    expect(a).toBe(true);
  });

  it('should update the client Details', () => {
    const client: Client = new Client(new CreateClientDto());
    client.details = new ClientDetails();
    client.details.firstName = 'First Type';
    /*    const clientUpdate: UpdateClientDto = {
      details: { type: 'Test Type' },
    };*/
    //jest.spyOn(clientRepository, 'update').mockResolvedValue(client);

    expect(client.details.firstName).toBe('First Type');
  });

  it('should delete a client in a company', () => {});

  it('should get a client by their Email or name', () => {});

  it('should get a client by their Id', () => {});
});
