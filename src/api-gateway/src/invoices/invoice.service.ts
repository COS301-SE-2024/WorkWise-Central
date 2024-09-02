import { JobService } from './../job/job.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Types } from 'mongoose';
import { Invoice } from './entities/invoice.entity';
import { CompanyService } from '../company/company.service';
import { InvoiceRepository } from './invoice.repository';
import { ValidationResult } from '../auth/entities/validationResult.entity';
import { ClientService } from 'src/client/client.service';

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

    //Checking that the items exist
    if (Invoice.items.length === 0) {
      return new ValidationResult(false, `Items not found`);
    }

    //checking that the client exists
    if (!(await this.clientService.getClientByIdInternal(Invoice.clientId))) {
      return new ValidationResult(false, `Client not found`);
    }

    return new ValidationResult(true, `All good`);
  }

  async create(createInvoiceDto: CreateInvoiceDto) {
    const validation = await this.validateCreateInvoice(createInvoiceDto);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    const newInvoice = new Invoice(createInvoiceDto);
    newInvoice.items = createInvoiceDto.items;
    return await this.invoiceRepository.save(newInvoice);
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
    // const validation = await this.validateUpdateInvoice(id);
    // if (!validation.isValid) {
    //   throw new Error(validation.message);
    // }
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
