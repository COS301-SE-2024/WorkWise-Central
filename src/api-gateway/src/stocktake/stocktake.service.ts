import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CompanyService } from '../company/company.service';
import { StockTakeRepository } from './stocktake.repository';
import { FileService } from '../file/file.service';

@Injectable()
export class InventoryService {
  constructor(
    @Inject(forwardRef(() => StockTakeRepository))
    private readonly stocktakeRepository: StockTakeRepository,
    private readonly companyService: CompanyService,

    @Inject(forwardRef(() => FileService))
    private readonly fileService: FileService,
  ) {}

  // async validateCreateInventory(inventory: CreateInventoryDto) {
  //   //Checking that the company exists
  //   if (!(await this.companyService.companyIdExists(inventory.companyId))) {
  //     return new ValidationResult(false, `Company not found`);
  //   }
  //   return new ValidationResult(true, `All good`);
  // }

  // async validateUpdateInventory(id: Types.ObjectId) {
  //   //Checking that the inventory item exists
  //   if (!(await this.InventoryExists(id))) {
  //     return new ValidationResult(false, `Inventory item not found`);
  //   }
  //   return new ValidationResult(true, `All good`);
  // }

  // async create(createInventoryDto: CreateInventoryDto) {
  //   const validation = await this.validateCreateInventory(createInventoryDto);
  //   if (!validation.isValid) {
  //     throw new Error(validation.message);
  //   }
  //   const newInventory = new Inventory(createInventoryDto);
  //   //Save files In Bucket, and store URLs (if provided)
  //   if (createInventoryDto.images.length > 0) {
  //     const pictures: string[] = [];
  //     console.log('Uploading images');
  //     for (const image of createInventoryDto.images) {
  //       const picture = await this.fileService.uploadBase64Image(image);
  //       if (picture.secure_url != null) {
  //         pictures.push(picture.secure_url);
  //       } else throw new InternalServerErrorException('file upload failed');
  //     }
  //     newInventory.images = pictures;
  //   }

  //   return await this.StockTakeRepository.save(newInventory);
  // }

  // async findAll() {
  //   return await this.StockTakeRepository.findAll();
  // }

  // async findAllInCompany(companyId: Types.ObjectId) {
  //   //checking if the company exist
  //   if (!(await this.companyService.companyIdExists(companyId))) {
  //     throw new Error('CompanyId does not exist');
  //   }
  //   return await this.StockTakeRepository.findAllInCompany(companyId);
  // }

  // async findById(id: Types.ObjectId) {
  //   return await this.StockTakeRepository.findById(id);
  // }

  // async InventoryExists(id: Types.ObjectId): Promise<boolean> {
  //   return await this.StockTakeRepository.InventoryExists(id);
  // }

  // async InventoryExistsForCompany(id: Types.ObjectId, companyId: Types.ObjectId): Promise<boolean> {
  //   //checking if the company exist
  //   if (!(await this.companyService.companyIdExists(companyId))) {
  //     throw new Error('CompanyId does not exist');
  //   }
  //   return await this.StockTakeRepository.InventoryExistsForCompany(id, companyId);
  // }

  // async update(id: Types.ObjectId, updateInventoryDto: UpdateInventoryDto) {
  //   console.log('In update. Id: ', id);
  //   const validation = await this.validateUpdateInventory(id);
  //   console.log('validation: ', validation);
  //   if (!validation.isValid) {
  //     throw new Error(validation.message);
  //   }
  //   console.log('validation is done');
  //   return await this.StockTakeRepository.update(id, updateInventoryDto);
  // }

  // async remove(id: Types.ObjectId): Promise<boolean> {
  //   //checking if the inventory item exists
  //   if (!(await this.InventoryExists(id))) {
  //     throw new Error('Inventory item does not exist');
  //   }
  //   return await this.StockTakeRepository.remove(id);
  // }

  // async addImages(id: Types.ObjectId, files: Express.Multer.File[]) {
  //   const inventoryItem = await this.findById(id);
  //   if (inventoryItem == null) throw new NotFoundException('Inventory not found');

  //   const newUrls: string[] = [];
  //   for (const file of files) {
  //     const uploadApiResponse = await this.fileService.uploadFile(file);
  //     if (uploadApiResponse.secure_url) {
  //       console.log('Upload successful');
  //       const newUrl = uploadApiResponse.secure_url;
  //       console.log(newUrl);
  //       newUrls.push(newUrl);
  //     } else {
  //       console.log('Failed to upload image.', 'Keep it pushing');
  //       //return null;
  //     }
  //   }
  //   if (newUrls.length == 0) {
  //     return inventoryItem;
  //   }

  //   return this.StockTakeRepository.addAttachments(id, newUrls);
  // }

  // deleteAllInCompany(companyId: Types.ObjectId) {
  //   this.StockTakeRepository.deleteAllInCompany(companyId);
  // }
}
