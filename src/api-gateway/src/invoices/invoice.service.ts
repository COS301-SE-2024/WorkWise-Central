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
import { InventoryUsedService } from '../inventory-used/inventory-used.service';
import { EmailService } from 'src/email/email.service';

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

    @Inject(forwardRef(() => InventoryUsedService))
    private readonly inventoryUsedService: InventoryUsedService,

    @Inject(forwardRef(() => EmailService))
    private readonly emailService: EmailService,
  ) {}

  async validateCreateInvoice(Invoice: CreateInvoiceDto) {
    console.log('Invoice: ', Invoice);
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
    console.log('in create invoice');
    const validation = await this.validateCreateInvoice(createInvoiceDto);
    console.log('checkpoint7');
    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    console.log('checkpoint8');
    const newInvoice = new Invoice(createInvoiceDto);
    newInvoice.inventoryItems = [];
    for (const item of createInvoiceDto.inventoryItems) {
      newInvoice.inventoryItems.push({
        description: item.description ? item.description : '',
        quantity: item.quantity ? item.quantity : 0,
        unitPrice: item.unitPrice ? item.unitPrice : 0,
        discount: item.discount ? item.discount : 0,
        total: item.total ? item.total : 0,
      });
    }
    console.log('checkpoint9');
    newInvoice.laborItems = [];
    for (const item of createInvoiceDto.laborItems) {
      newInvoice.laborItems.push({
        description: item.description ? item.description : '',
        quantity: item.quantity ? item.quantity : 0,
        unitPrice: item.unitPrice ? item.unitPrice : 0,
        discount: item.discount ? item.discount : 0,
        total: item.total ? item.total : 0,
      });
    }
    console.log('checkpoint10');
    return await this.invoiceRepository.save(newInvoice);
  }

  async generate(jobId: Types.ObjectId) {
    console.log('in generate invoice');
    const dto = new CreateInvoiceDto();
    dto.jobId = jobId;
    const job = await this.jobService.getJobById(jobId);
    dto.clientId = job.clientId;
    dto.companyId = job.companyId;
    const number = await this.invoiceRepository.findLastInvoiceNumber(job.companyId);
    if (number === null) {
      dto.invoiceNumber = 1;
    } else {
      dto.invoiceNumber = number + 1;
    }
    console.log('checkpoint1');
    dto.invoiceDate = new Date();
    dto.inventoryItems = [];
    dto.laborItems = [];
    let total = 0;
    //Adding the inventory items used for the job
    const inventoryUsedList = await this.inventoryUsedService.findAllForJob(jobId);
    for (const inventoryUsed of inventoryUsedList) {
      const inventoryItem = await this.inventoryService.findById(inventoryUsed.inventoryId);
      const item = new Items();
      item.description = inventoryItem.name;
      item.quantity = inventoryUsed.amount;
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
    console.log('checkpoint2');

    //TODO: add labor to invoice
    for (const employeeId of job.assignedEmployees.employeeIds) {
      const employee = await this.employeeService.findById(employeeId);
      const timeSpent = await this.timeTrackerService.getTotalTimeSpentOnJob(employeeId, jobId);
      const item = new Items();
      item.description = employee.userInfo.firstName + ' ' + employee.userInfo.surname;
      item.quantity = timeSpent.timeWorked / 60;
      item.unitPrice = employee.hourlyRate;
      item.discount = 0;
      item.total = item.unitPrice * item.quantity;
      total = total + item.total;
      dto.laborItems.push(item);
    }
    console.log('checkpoint3');

    dto.paid = false;
    dto.taxPercentage = 15;
    dto.taxAmount = total * (15 / 115);
    dto.subTotal = total - dto.taxAmount;
    dto.total = dto.total + dto.taxAmount;
    console.log('checkpoint5');

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

  async findAllForJob(jobId: Types.ObjectId) {
    return await this.invoiceRepository.findAllForJob(jobId);
  }

  async detailedFindAllInCompany(companyId: Types.ObjectId) {
    //checking if the company exist
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('CompanyId does not exist');
    }
    return await this.invoiceRepository.detailedFindAllInCompany(companyId);
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

  async send(id: Types.ObjectId) {
    //setting the send variable and date
    await this.update(id, { sent: true, sentDate: new Date() });
    //Calling the email service
    const invoice = await this.findByIdDetailed(id);
    await this.emailService.sendClientPortalLink(
      invoice.clientId._id,
      (invoice.clientId as any).details.contactInfo.email,
      (invoice.clientId as any).details.firstName,
      (invoice.clientId as any).details.lastName,
      (invoice.companyId as any).name,
      (invoice.jobId as any).details.heading,
    );
  }

  async findByIdDetailed(id: Types.ObjectId) {
    return await this.invoiceRepository.findByIdDetailed(id);
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
    if (updateInvoiceDto.sent && !updateInvoiceDto.sentDate) {
      updateInvoiceDto.sentDate = new Date();
    }
    if (updateInvoiceDto.paid && !updateInvoiceDto.receiptOfPaymentDate) {
      updateInvoiceDto.receiptOfPaymentDate = new Date();
    }
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
