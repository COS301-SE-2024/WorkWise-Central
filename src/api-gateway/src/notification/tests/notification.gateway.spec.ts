import { Test, TestingModule } from '@nestjs/testing';
import { NotificationGateway } from '../notification.gateway';
import { NotificationService } from '../notification.service';
import { userStub } from '../../../test/stubs/user.stub';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { EmailService } from '../../email/email.service';

const moduleMocker = new ModuleMocker(global);

describe('NotificationGateway', () => {
  let gateway: NotificationGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationGateway],
    })
      .useMocker((token) => {
        if (token === EmailService) {
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
            createNotificationsFromUser: jest.fn().mockReturnValue(userStub()),
            findAllWithEmployeeId: jest.fn().mockReturnValue(userStub()),
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

    gateway = module.get<NotificationGateway>(NotificationGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should return when an account has been created', async () => {
    expect(
      await gateway.createAccount({
        name: 'a',
        surname: 'b',
        email: 'dsf@gmail.com',
      }),
    ).toBe('Welcome message sent');
  });
});
