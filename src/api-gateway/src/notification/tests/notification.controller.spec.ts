import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from '../notification.controller';
import { NotificationRepository } from '../notification.repository';
import { userStub } from '../../../test/stubs/user.stub';
import { NotificationService } from '../notification.service';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('NotificationController', () => {
  let controller: NotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
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

    controller = module.get<NotificationController>(NotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
