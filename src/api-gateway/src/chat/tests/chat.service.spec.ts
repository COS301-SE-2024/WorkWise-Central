import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from '../chat.service';
import { getModelToken } from '@nestjs/mongoose';
import { Chat } from '../entities/chat.entity';
import { ChatMessage } from '../entities/chat-message.entity';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        { provide: getModelToken(Chat.name), useValue: {} },
        { provide: getModelToken(ChatMessage.name), useValue: {} },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
