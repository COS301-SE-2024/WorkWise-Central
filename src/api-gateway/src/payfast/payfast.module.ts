import { Module } from '@nestjs/common';
import { PayfastService } from './payfast.service';
import { PayfastController } from './payfast.controller';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  // imports: [
  //   MongooseModule.forFeature([{ name: Payfast.name, schema: PayfastSchema }]),
  // ],
  controllers: [PayfastController],
  providers: [PayfastService],
  exports: [PayfastService, MongooseModule],
})
export class PayfastModule {}
