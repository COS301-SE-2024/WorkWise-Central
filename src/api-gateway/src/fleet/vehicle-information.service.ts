// vehicle-information.service.ts
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import * as path from 'path';
import { VehicleInfo } from './models/vehicle-info.model';

@Injectable()
export class VehicleInformationService {
  private readonly csvFilePath = path.join(__dirname, '..', 'data', 'vehicle-data.csv');

  async getAllVehicles(): Promise<VehicleInfo[]> {
    const fileContent = await fs.readFile(this.csvFilePath, 'utf-8');
    return parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      cast: (value, context) => {
        if (context.column === 'modelYear' || context.column === 'serviceInterval') {
          return parseInt(value, 10);
        }
        if (context.column === 'avgFuelConsumption') {
          return parseFloat(value);
        }
        return value;
      },
    });
  }

  async addVehicle(vehicle: VehicleInfo): Promise<VehicleInfo> {
    const vehicles = await this.getAllVehicles();
    vehicles.push(vehicle);
    await this.saveVehicles(vehicles);
    return vehicle;
  }

  async addMultipleVehicles(newVehicles: VehicleInfo[]): Promise<VehicleInfo[]> {
    const vehicles = await this.getAllVehicles();
    vehicles.push(...newVehicles);
    await this.saveVehicles(vehicles);
    return newVehicles;
  }

  private async saveVehicles(vehicles: VehicleInfo[]): Promise<void> {
    const csv = stringify(vehicles, { header: true });
    await fs.writeFile(this.csvFilePath, csv);
  }
}
