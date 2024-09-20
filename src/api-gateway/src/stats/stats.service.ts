import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { EmployeeService } from '../employee/employee.service';
import { CompanyService } from '../company/company.service';
import { JobService } from '../job/job.service';

@Injectable()
export class StatsService {
  constructor(
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
    @Inject(forwardRef(() => CompanyService))
    private companyService: CompanyService,
    @Inject(forwardRef(() => JobService))
    private jobService: JobService,
  ) {}

  async findAll() {
    // return this.statsRepository.findAll();
  }

  async findById(identifier: Types.ObjectId) {
    // const result = await this.statsRepository.findById(identifier);
    // return result;
  }

  async findAllInCompany(companyId: Types.ObjectId) {
    // return this.statsRepository.findAllInCompany(companyId);
  }
  async detailedFindAllInCompany(companyId: Types.ObjectId) {
    // return this.statsRepository.detailedFindAllInCompany(companyId, ['statsMembers', 'statsLeaderId']);
  }

  async findByNameInCompany(name: string, companyId: Types.ObjectId) {
    //checking if the company exists
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('Company not found');
    }

    // const result = await this.statsRepository.findByNameInCompany(name, companyId);
    // return result;
  }

  async statsExists(id: Types.ObjectId){
    // return await this.statsRepository.statsExists(id);
  }

  async statsExistsInCompany(id: Types.ObjectId, companyId: Types.ObjectId) {
    //checking if the company exists
    if (!(await this.companyService.companyIdExists(companyId))) {
      throw new Error('Company not found');
    }
    // return this.statsRepository.statsExistsInCompany(id, companyId);
  }
}
