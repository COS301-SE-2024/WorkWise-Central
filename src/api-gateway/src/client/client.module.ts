import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema } from './entities/client.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'client', schema: ClientSchema }]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService, MongooseModule],
})
export class ClientModule {}
