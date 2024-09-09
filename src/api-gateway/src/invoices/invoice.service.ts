import { JobService } from './../job/job.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateInvoiceDto, Items } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Types } from 'mongoose';
import { Invoice } from './entities/invoice.entity';
import { CompanyService } from '../company/company.service';
import { InvoiceRepository } from './invoice.repository';
import { ValidationResult } from '../auth/entities/validationResult.entity';
import { ClientService } from '../client/client.service';
import { InventoryService } from '../inventory/inventory.service';
import { TimeTrackerService } from '../time-tracker/time-tracker.service';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class InvoiceService {
  constructor(
    @Inject(forwardRef(() => InvoiceRepository))
    private readonly invoiceRepository: InvoiceRepository,

    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,

    @Inject(forwardRef(() => JobService))
    private readonly jobService: JobService,

    @Inject(forwardRef(() => ClientService))
    private readonly clientService: ClientService,

    @Inject(forwardRef(() => InventoryService))
    private readonly inventoryService: InventoryService,

    @Inject(forwardRef(() => TimeTrackerService))
    private readonly timeTrackerService: TimeTrackerService,

    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,
  ) {}

  async validateCreateInvoice(Invoice: CreateInvoiceDto) {
    //Checking that the company exists
    if (!(await this.companyService.companyIdExists(Invoice.companyId))) {
      return new ValidationResult(false, `Company not found`);
    }

    //checking if the job exists
    if (!(await this.jobService.getJobById(Invoice.jobId))) {
      return new ValidationResult(false, `Job not found`);
    }

    // //Checking that the items exist
    // if (Invoice.inventoryItems.length === 0 && Invoice.laborItems.length === 0) {
    //   return new ValidationResult(false, `Items not found`);
    // }

    //checking that the client exists
    if (!(await this.clientService.getClientByIdInternal(Invoice.clientId))) {
      return new ValidationResult(false, `Client not found`);
    }

    return new ValidationResult(true, `All good`);
  }

  async create(createInvoiceDto: CreateInvoiceDto) {
    console.log('createInvoiceDto: ', createInvoiceDto);
    const validation = await this.validateCreateInvoice(createInvoiceDto);
    console.log('validation: ', validation);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    const newInvoice = new Invoice(createInvoiceDto);
    newInvoice.inventoryItems = createInvoiceDto.inventoryItems;
    newInvoice.laborItems = createInvoiceDto.laborItems;
    return await this.invoiceRepository.save(newInvoice);
  }

  async generate(jobId: Types.ObjectId) {
    const dto = new CreateInvoiceDto();
    const job = await this.jobService.getJobById(jobId);
    dto.clientId = job.clientId;
    dto.companyId = job.companyId;
    const number = await this.invoiceRepository.findLastInvoiceNumber(job.companyId);
    if (number === null) {
      dto.invoiceNumber = 1;
    } else {
      dto.invoiceNumber = number + 1;
    }

    dto.invoiceDate = new Date();
    dto.inventoryItems = [];
    dto.laborItems = [];
    let total = 0;

    //Adding the inventory items used for the job
    for (const inventory of job.recordedDetails.inventoryUsed) {
      const inventoryItem = await this.inventoryService.findById(inventory.inventoryItemId);
      const item = new Items();
      item.description = inventory.inventoryItemName;
      item.quantity = inventory.quantityUsed;
      if (inventoryItem.salePrice) {
        item.unitPrice = inventoryItem.salePrice;
      } else if (inventoryItem.costPrice) {
        item.unitPrice = inventoryItem.costPrice;
      } else {
        item.unitPrice = 0;
      }
      item.discount = 0;
      item.total = item.unitPrice * item.quantity;
      total = total + item.total;
      dto.inventoryItems.push(item);
    }

    //TODO: add labor to invoice

    dto.paid = false;
    dto.taxPercentage = 15; //VAT percentage in South Africa
    dto.taxAmount = total * (15 / 115);
    dto.subTotal = total - dto.taxAmount;

    dto.total = dto.total + dto.taxAmount;

    return await this.create(dto);
  }

  async findAll() {
    return await this.invoiceRepository.findAll();
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    //checking if the company exist
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    return await this.invoiceRepository.findAllInCompany(companyId);
  }

  async findAllForClient(clientId: Types.ObjectId) {
    //checking if the company exist
    if (!(await this.clientService.clientExists(clientId))) {
      throw new Error('CompanyId does not exist');
    }
    return await this.invoiceRepository.findAllForClient(clientId);
  }

  async findById(id: Types.ObjectId) {
    return await this.invoiceRepository.findById(id);
  }

  async InvoiceExists(id: Types.ObjectId): Promise<boolean> {
    return await this.invoiceRepository.InvoiceExists(id);
  }

  async InvoiceExistsForCompany(id: Types.ObjectId, companyId: Types.ObjectId): Promise<boolean> {
    //checking if the company exist
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    return await this.invoiceRepository.InvoiceExistsForCompany(id, companyId);
  }

  async update(id: Types.ObjectId, updateInvoiceDto: UpdateInvoiceDto) {
    return await this.invoiceRepository.update(id, updateInvoiceDto);
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    //checking if the Invoice item exists
    if (!(await this.InvoiceExists(id))) {
      throw new Error('Invoice item does not exist');
    }
    return await this.invoiceRepository.remove(id);
  }
}
