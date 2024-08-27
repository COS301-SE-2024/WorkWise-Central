import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { RoleModule } from '../role/role.module';
import { JobModule } from '../job/job.module';
import { TeamModule } from '../team/team.module';
import { ClientModule } from '../client/client.module';
import { FileModule } from '../file/file.module';
import { InventoryModule } from '../inventory/inventory.module';
import { StockTakeModule } from '../stocktake/stocktake.module';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/entities/user.entity';
import { Chat, ChatSchema } from './entities/chat.entity';
import { ChatMessage, ChatMessageSchema } from './entities/chat-message.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Chat.name, schema: ChatSchema },
      { name: ChatMessage.name, schema: ChatMessageSchema },
    ]),
    forwardRef(() => UsersModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => RoleModule),
    forwardRef(() => JobModule),
    forwardRef(() => TeamModule),
    forwardRef(() => ClientModule),
    forwardRef(() => FileModule),
    forwardRef(() => InventoryModule),
    forwardRef(() => StockTakeModule),
  ],
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatService, MongooseModule],
})
export class ChatModule {}
