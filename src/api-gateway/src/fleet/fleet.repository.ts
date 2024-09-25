import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Vehicle } from './entities/vehicle.entity';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { isNotDeleted } from '../shared/soft-delete';
import { currentDate } from '../utils/Utils';

@Injectable()
export class FleetRepository {
  constructor(@InjectModel(Vehicle.name) private readonly vehicleModel: Model<Vehicle>) {}

  async save(vehicle: Vehicle) {
    const newVehicleModel = new this.vehicleModel(vehicle);
    return (await newVehicleModel.save()).toObject();
  }

  async findById(identifier: Types.ObjectId) {
    return this.vehicleModel
      .findOne({
        $and: [{ _id: identifier }, { $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }] }],
      })
      .lean()
      .exec();
  }

  async findByVinNumber(vin: string) {
    return this.vehicleModel
      .findOne({
        $and: [
          { vin: vin },
          {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          },
        ],
      })
      .lean();
  }

  async findAll() {
    return this.vehicleModel.find({ $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }] }).lean();
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    return this.vehicleModel
      .find({ $and: [{ companyId: companyId }, isNotDeleted] })
      .lean()
      .exec();
  }

  async update(vehicleId: Types.ObjectId, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.vehicleModel.findOne({ $and: [{ _id: vehicleId }, isNotDeleted] }).exec();
    if (updateVehicleDto.name) {
      vehicle.name = { ...vehicle.name, ...updateVehicleDto.name };
      vehicle.markModified('name');
    }
    if (updateVehicleDto.availability) {
      vehicle.availability = { ...vehicle.availability, ...updateVehicleDto.availability };
      vehicle.markModified('availability');
    }
    if (updateVehicleDto.fuelType) {
      vehicle.fuelType = updateVehicleDto.fuelType;
      vehicle.markModified('fuelType');
    }
    if (updateVehicleDto.location) {
      vehicle.location.latitude = updateVehicleDto.location.latitude;
      vehicle.location.longitude = updateVehicleDto.location.longitude;
      vehicle.markModified('location');
    }
    if (updateVehicleDto.vin !== undefined) {
      vehicle.vin = updateVehicleDto.vin;
      vehicle.markModified('vin');
    }

    if (updateVehicleDto.images !== undefined) {
      vehicle.images = updateVehicleDto.images;
      vehicle.markModified('images');
    }

    if (updateVehicleDto.modelYear !== undefined) {
      vehicle.modelYear = updateVehicleDto.modelYear;
      vehicle.markModified('modelYear');
    }

    if (updateVehicleDto.licensePlate !== undefined) {
      vehicle.licensePlate = updateVehicleDto.licensePlate;
      vehicle.markModified('licensePlate');
    }

    if (updateVehicleDto.mileage !== undefined) {
      vehicle.mileage = updateVehicleDto.mileage;
      vehicle.markModified('mileage');
    }

    if (updateVehicleDto.serviceDetails) {
      vehicle.serviceDetails = { ...vehicle.serviceDetails, ...updateVehicleDto.serviceDetails };
      vehicle.markModified('serviceDetails');
    }

    if (updateVehicleDto.statistics) {
      vehicle.statistics = { ...vehicle.statistics, ...updateVehicleDto.statistics };
      vehicle.markModified('statistics');
    }

    vehicle.updatedAt = currentDate();
    vehicle.markModified('updatedAt');

    return (await vehicle.save()).toObject();
  }

  async delete(vehicleId: Types.ObjectId) {
    await this.vehicleModel.findOneAndUpdate(
      { $and: [{ _id: vehicleId }, isNotDeleted] },
      { deletedAt: currentDate() },
    );
  }
}
// availability.assignedTo is always populated
