import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from '../chat.service';
import { getModelToken } from '@nestjs/mongoose';
import { Chat } from '../entities/chat.entity';
import { ChatMessage } from '../entities/chat-message.entity';
import { NotificationService } from '../../notification/notification.service';
import { userStub } from '../../../test/stubs/user.stub';
import { UsersService } from '../../users/users.service';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    class MockNotificationService {
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
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        { provide: getModelToken(Chat.name), useValue: {} },
        { provide: getModelToken(ChatMessage.name), useValue: {} },
        { provide: NotificationService, useClass: MockNotificationService },
        { provide: UsersService, useClass: MockNotificationService },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
