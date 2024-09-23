import { InventoryUsedService } from './../inventory-used/inventory-used.service';
import { JobService } from './../job/job.service';
import { EmployeeService } from './../employee/employee.service';
import { forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { ExternalInventoryUpdateDto } from './dto/update-inventory.dto';
import { Types } from 'mongoose';
import { Inventory } from './entities/inventory.entity';
import { CompanyService } from '../company/company.service';
import { InventoryRepository } from './inventory.repository';
import { ValidationResult } from '../auth/entities/validationResult.entity';
import { FileService } from '../file/file.service';
import { StockTakeService } from '../stocktake/stocktake.service';
import { StockMovementsService } from '../stockmovements/stockmovements.service';
import { CreateStockMovementsDto } from '../stockmovements/dto/create-stockmovements.dto';
import { ListOfUpdatesForUsedInventory, ListOfUsedInventory } from './dto/use-inventory.dto';
import { CreateInventoryUsedDto } from '../inventory-used/dto/create-inventory-used.dto';

@Injectable()
export class InventoryService {
  constructor(
    @Inject(forwardRef(() => InventoryRepository))
    private readonly inventoryRepository: InventoryRepository,

    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,

    @Inject(forwardRef(() => StockTakeService))
    private readonly stockTakeService: StockTakeService,

    @Inject(forwardRef(() => FileService))
    private readonly fileService: FileService,

    @Inject(forwardRef(() => StockMovementsService))
    private readonly stockMovementsService: StockMovementsService,

    @Inject(forwardRef(() => JobService))
    private readonly jobService: JobService,

    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,

    @Inject(forwardRef(() => InventoryUsedService))
    private readonly inventoryUsedService: InventoryUsedService,
  ) {}

  async validateCreateInventory(inventory: CreateInventoryDto) {
    //Checking that the company exists
    if (!(await this.companyService.companyIdExists(inventory.companyId))) {
      return new ValidationResult(false, `Company not found`);
    }
    return new ValidationResult(true, `All good`);
  }

  async validateUpdateInventory(id: Types.ObjectId) {
    //Checking that the inventory item exists
    if (!(await this.InventoryExists(id))) {
      return new ValidationResult(false, `Inventory item not found`);
    }
    return new ValidationResult(true, `All good`);
  }

  async create(createInventoryDto: CreateInventoryDto) {
    const validation = await this.validateCreateInventory(createInventoryDto);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    const newInventory = new Inventory(createInventoryDto);
    //Save files In Bucket, and store URLs (if provided)
    if (createInventoryDto.images.length > 0) {
      const pictures: string[] = [];
      console.log('Uploading images');
      for (const image of createInventoryDto.images) {
        const picture = await this.fileService.uploadBase64Image(image);
        if (picture.secure_url != null) {
          pictures.push(picture.secure_url);
        } else throw new InternalServerErrorException('file upload failed');
      }
      newInventory.images = pictures;
    }

    return await this.inventoryRepository.save(newInventory);
  }

  async findAll() {
    return await this.inventoryRepository.findAll();
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    //checking if the company exist
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    return await this.inventoryRepository.findAllInCompany(companyId);
  }

  async findById(id: Types.ObjectId) {
    return await this.inventoryRepository.findById(id);
  }

  async InventoryExists(id: Types.ObjectId): Promise<boolean> {
    return await this.inventoryRepository.InventoryExists(id);
  }

  async InventoryExistsForCompany(id: Types.ObjectId, companyId: Types.ObjectId): Promise<boolean> {
    //checking if the company exist
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    return await this.inventoryRepository.InventoryExistsForCompany(id, companyId);
  }

  async recordStockUse(listOfUsedInventory: ListOfUsedInventory) {
    const employee = await this.employeeService.findById(listOfUsedInventory.currentEmployeeId);
    const job = await this.jobService.getJobById(listOfUsedInventory.jobId);
    for (const item of listOfUsedInventory.listOfUsedInventory) {
      //creating a inventory used record
      const inventoryUsedDto = new CreateInventoryUsedDto();
      inventoryUsedDto.companyId = listOfUsedInventory.companyId;
      inventoryUsedDto.jobId = listOfUsedInventory.jobId;
      inventoryUsedDto.employeeId = listOfUsedInventory.currentEmployeeId;
      inventoryUsedDto.inventoryId = item.inventoryId;
      inventoryUsedDto.amount = item.amountUsed;
      await this.inventoryUsedService.create(inventoryUsedDto);

      //updating the inventory record
      const inventory = await this.findById(item.inventoryId);
      const dto = new ExternalInventoryUpdateDto();
      dto.currentEmployeeId = listOfUsedInventory.currentEmployeeId;
      dto.updateInventoryDto.currentStockLevel = inventory.currentStockLevel - item.amountUsed;
      dto.updateInventoryDto.reason = employee.userInfo.displayName + ' used this item in ' + job.details.heading;
      await this.update(inventory._id, dto);
    }
  }

  async updateStockUse(listOfUsedInventory: ListOfUpdatesForUsedInventory) {
    const employee = await this.employeeService.findById(listOfUsedInventory.currentEmployeeId);
    const job = await this.jobService.getJobById(listOfUsedInventory.jobId);
    for (const item of listOfUsedInventory.listOfUsedInventory) {
      //updating the inventory used record
      const updateInventoryUsedDto = new CreateInventoryUsedDto();
      updateInventoryUsedDto.amount = item.changeInAmount;
      await this.inventoryUsedService.update(item.inventoryUsedId, updateInventoryUsedDto);

      //updating the inventory record
      const inventory = await this.findById(item.inventoryId);
      const dto = new ExternalInventoryUpdateDto();
      dto.currentEmployeeId = listOfUsedInventory.currentEmployeeId;
      dto.updateInventoryDto.currentStockLevel = inventory.currentStockLevel - item.changeInAmount;
      dto.updateInventoryDto.reason =
        employee.userInfo.displayName + ' updated the amount of this item used in ' + job.details.heading;
      await this.update(inventory._id, dto);
    }
  }

  async update(id: Types.ObjectId, updateInventoryDto: ExternalInventoryUpdateDto) {
    const validation = await this.validateUpdateInventory(id);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    const inventory = await this.findById(id);
    const dto = new CreateStockMovementsDto();
    dto.companyId = inventory.companyId;
    dto.inventoryId = id;
    dto.movementDate = new Date();
    dto.employeeId = updateInventoryDto.currentEmployeeId;
    if (updateInventoryDto.updateInventoryDto.reason) {
      dto.reason = updateInventoryDto.updateInventoryDto.reason;
    } else {
      dto.reason = 'Inventory Update';
    }

    await this.stockMovementsService.create(dto);

    if (updateInventoryDto.updateInventoryDto.name) {
      await this.stockTakeService.updateInventoryReference(id, updateInventoryDto.updateInventoryDto.name);
    }
    return await this.inventoryRepository.update(id, updateInventoryDto.updateInventoryDto);
  }

  async updateWithoutMovements(id: Types.ObjectId, updateInventoryDto: ExternalInventoryUpdateDto) {
    const validation = await this.validateUpdateInventory(id);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    if (updateInventoryDto.updateInventoryDto.name) {
      await this.stockTakeService.updateInventoryReference(id, updateInventoryDto.updateInventoryDto.name);
    }
    return await this.inventoryRepository.update(id, updateInventoryDto.updateInventoryDto);
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    //checking if the inventory item exists
    if (!(await this.InventoryExists(id))) {
      throw new Error('Inventory item does not exist');
    }
    await this.stockMovementsService.removeInventoryRef(id);
    await this.stockTakeService.removeReferenceToInventory(id);

    return await this.inventoryRepository.remove(id);
  }

  async addImages(id: Types.ObjectId, files: Express.Multer.File[]) {
    const inventoryItem = await this.findById(id);
    if (inventoryItem == null) throw new NotFoundException('Inventory not found');

    const newUrls: string[] = [];
    for (const file of files) {
      const uploadApiResponse = await this.fileService.uploadFile(file);
      if (uploadApiResponse.secure_url) {
        console.log('Upload successful');
        const newUrl = uploadApiResponse.secure_url;
        console.log(newUrl);
        newUrls.push(newUrl);
      } else {
        console.log('Failed to upload image.', 'Keep it pushing');
        //return null;
      }
    }
    if (newUrls.length == 0) {
      return inventoryItem;
    }

    return this.inventoryRepository.addAttachments(id, newUrls);
  }

  deleteAllInCompany(companyId: Types.ObjectId) {
    this.inventoryRepository.deleteAllInCompany(companyId);
  }
}
