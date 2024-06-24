import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '../notification.service';
import { getModelToken } from '@nestjs/mongoose';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { userStub } from '../../../test/stubs/user.stub';
import { NotificationRepository } from '../notification.repository';

const moduleMocker = new ModuleMocker(global);

class MockNotificationModel {
  constructor(private data: any) {}
  create = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn().mockResolvedValue(['event']);
  static watch = jest.fn().mockResolvedValue(['event']);
  static findOne = jest.fn().mockResolvedValue('event');
  static findOneAndUpdate = jest.fn().mockResolvedValue('event');
  static deleteOne = jest.fn().mockResolvedValue(true);
}

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: getModelToken('Notification'),
          useValue: MockNotificationModel,
        },
      ],
    })
      .useMocker((token) => {
        if (token === NotificationRepository) {
          return {
            create: jest.fn().mockReturnValue(userStub()),
            getAllUsers: jest.fn().mockReturnValue([userStub(), userStub()]),
            findUser: jest.fn().mockReturnValue(userStub()),
            update: jest.fn().mockReturnValue(userStub()),
            softDelete: jest.fn().mockReturnValue([]),
            sendUserConfirmation: jest.fn().mockReturnValue(true),
            sendEmailConfirmation: jest.fn().mockReturnValue(true),
          };
        }

        if (token === NotificationService) {
          return {
            create: jest.fn().mockReturnValue(userStub()),
            watchDatabase: jest.fn().mockReturnValue([userStub(), userStub()]),
            createNotificationsFromUser: jest.fn().mockReturnValue({
              data: 'success',
            }),
            findAllWithEmployeeId: jest.fn().mockReturnValue([]),
            findAllWithUserId: jest.fn().mockReturnValue([]),
          };
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a new notification', async () => {
    const res = service.create({ message: 's', recipientIds: [] });
    expect(res).toStrictEqual('This action adds a new notification');
  });

  it('should create notifications from users', async () => {
    const res = service.create({ message: 's', recipientIds: [] });
    expect(res).toStrictEqual('This action adds a new notification');
  });
});
