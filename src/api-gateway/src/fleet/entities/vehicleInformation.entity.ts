import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty } from '@nestjs/swagger';
import { currentDate } from '../../utils/Utils';
import { FuelType, VehicleName } from './vehicle.entity';

/*class ConsumptionDetails {
  @Prop({ type: Number, required: false })
  city?: number;

  @Prop({ type: Number, required: false })
  highway?: number;

  @Prop({ type: Number, required: true })
  combined?: number;
}*/

@Schema()
export class VehicleInformation {
  /*  @Prop({
    type: SchemaTypes.ObjectId,
    default: new Types.ObjectId(),
  })
  _id: Types.ObjectId = new Types.ObjectId();*/

  @Prop({ type: VehicleName, required: true })
  name: VehicleName;

  @Prop({ type: Number, required: true })
  modelYear: number;

  @Prop({ type: String, required: true, enum: FuelType })
  fuelType: FuelType;

  @Prop({ type: Number, required: false, default: 0 })
  serviceInterval: number = 0;

  // @Prop({ type: ConsumptionDetails, required: true })
  // consumptionDetails: ConsumptionDetails;

  @Prop({ type: Number, required: true })
  avgFuelConsumption: number;

  @ApiHideProperty()
  @Prop({ required: true, default: currentDate() })
  public createdAt: Date = currentDate();

  @ApiHideProperty()
  @Prop({ required: false })
  public updatedAt: Date;

  @ApiHideProperty()
  @Prop({ required: false })
  public deletedAt: Date;
}

export const VehicleInformationSchema = SchemaFactory.createForClass(VehicleInformation);
