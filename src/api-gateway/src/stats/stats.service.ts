import { StockTakeService } from './../stocktake/stocktake.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import { CompanyService } from '../company/company.service';
import { JobService } from '../job/job.service';
import { ClientService } from '../client/client.service';
import { TeamService } from '../team/team.service';
import { InvoiceService } from '../invoices/invoice.service';
import { InventoryService } from '../inventory/inventory.service';
import { Types } from 'mongoose';
import {
  ClientStatsResponseDto,
  EmployeeStatsResponseDto,
  InventoryStatsResponseDto,
  InvoiceStatsResponseDto,
  JobsStatsResponseDto,
  teamRating,
  TeamStatsResponseDto,
} from './dto/stats-response.dto';
import { StockMovementsService } from '../stockmovements/stockmovements.service';

@Injectable()
export class StatsService {
  constructor(
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
    @Inject(forwardRef(() => CompanyService))
    private companyService: CompanyService,
    @Inject(forwardRef(() => ClientService))
    private clientService: ClientService,
    @Inject(forwardRef(() => JobService))
    private jobService: JobService,
    @Inject(forwardRef(() => TeamService))
    private teamService: TeamService,
    @Inject(forwardRef(() => InvoiceService))
    private invoiceService: InvoiceService,
    @Inject(forwardRef(() => InventoryService))
    private inventoryService: InventoryService,
    @Inject(forwardRef(() => StockMovementsService))
    private stockMovementsService: StockMovementsService,
    @Inject(forwardRef(() => StockTakeService))
    private stockTakeService: StockTakeService,
  ) {}

  async clientStats(clientId: Types.ObjectId) {
    console.log('clientId: ', clientId);
    console.log('checkpoint1');
    const client = await this.clientService.getClientByIdInternal(clientId);
    console.log('checkpoint1.2');
    const jobs = await this.jobService.findAllJobsForClient(clientId);
    console.log('checkpoint1.3');
    const statuses = await this.jobService.findAllStatusesInCompanyInternal(client.details.companyId);
    console.log('checkpoint1.4');
    const lastStatus = statuses[statuses.length - 1].status;
    const invoices = await this.invoiceService.findAllForClient(clientId);
    console.log('checkpoint2');

    const result = new ClientStatsResponseDto();
    result.clientId = clientId;
    result.numTotalJobs = jobs.length;
    result.numActiveJobs = 0;
    let numJobRating = 0;
    let numbServiceRating = 0;
    result.workPerformanceRatingAverage = 0;
    result.customerServiceRatingAverage = 0;
    result.numActiveJobs = 0;
    result.numCompletedJobs = 0;
    result.numInvoicesPaid = 0;
    console.log('checkpoint3');

    for (const job of jobs) {
      const status = await this.jobService.getStatusByIdWithoutValidation(job.status);
      if (status.status !== lastStatus) {
        result.numActiveJobs++;
        result.activeJobs.push({
          jobId: job._id,
          jobTitle: job.details.heading,
        });
      } else {
        result.numCompletedJobs++;
        result.completedJobs.push({
          jobId: job._id,
          jobTitle: job.details.heading,
        });
      }

      result.allJobs.push({
        jobId: job._id,
        jobTitle: job.details.heading,
      });

      if (job.clientFeedback && job.clientFeedback.jobRating) {
        result.workPerformanceRatingAverage += job.clientFeedback.jobRating;
        numJobRating++;
        result.workPerformanceRating.push({
          jobId: job._id,
          jobTitle: job.details.heading,
          rating: job.clientFeedback.jobRating,
        });
      }

      if (job.clientFeedback && job.clientFeedback.customerServiceRating) {
        result.customerServiceRatingAverage += job.clientFeedback.customerServiceRating;
        numbServiceRating++;
        result.customerServiceRating.push({
          jobId: job._id,
          jobTitle: job.details.heading,
          rating: job.clientFeedback.customerServiceRating,
        });
      }
    }
    result.workPerformanceRatingAverage = result.workPerformanceRatingAverage / numJobRating;
    result.customerServiceRatingAverage = result.customerServiceRatingAverage / numbServiceRating;
    console.log('checkpoint4');

    for (const invoice of invoices) {
      console.log('invoice: ', invoice);
      if (invoice.paid) {
        console.log('job: ', jobs);
        console.log('invoice.jobId: ', invoice.jobId);
        console.log(
          'Job thing: ',
          jobs.find((job) => job._id.toString() === invoice.jobId.toString()),
        );
        result.numInvoicesPaid += invoice.total;
        result.invoicesPaid.push({
          invoiceId: invoice._id,
          invoiceNumber: invoice.invoiceNumber.toString(),
          total: invoice.total,
          job: {
            jobId: invoice.jobId,
            jobTitle: (invoice.jobId as any).details.heading,
          },
        });
      } else {
        result.numInvoicesUnpaid += invoice.total;
        result.invoicesUnpaid.push({
          invoiceId: invoice._id,
          invoiceNumber: invoice.invoiceNumber.toString(),
          total: invoice.total,
          job: {
            jobId: invoice.jobId._id,
            jobTitle: (invoice.jobId as any).details.heading,
          },
        });
      }
    }
    console.log('checkpoint5');
    return result;
  }

  async getTotalClients(companyId: Types.ObjectId) {
    const clients = await this.clientService.getAllClientsInCompanyInternal(new Types.ObjectId(companyId));
    console.log('clients: ', clients);
    return clients.length;
  }

  async employeeStats(employeeId: Types.ObjectId) {
    const employee = await this.employeeService.findById(employeeId);
    const jobs = await this.jobService.findAllJobsForEmployee(employeeId);
    const statuses = await this.jobService.findAllStatusesInCompanyInternal(employee.companyId);
    const lastStatus = statuses[statuses.length - 1].status;
    const result = new EmployeeStatsResponseDto();
    result.employeeId = employeeId;
    let numJobRating = 0;
    let numbServiceRating = 0;
    result.numActiveJobs = 0;
    result.numCompletedJobs = 0;
    result.numTotalJobs = 0;
    result.workPerformanceRatingAverage = 0;
    result.customerServiceRatingAverage = 0;

    for (const job of jobs) {
      const status = await this.jobService.getStatusByIdWithoutValidation(job.status);
      if (status.status !== lastStatus) {
        result.numActiveJobs++;
        result.activeJobs.push({
          jobId: job._id,
          jobTitle: job.details.heading,
        });
      } else {
        result.numCompletedJobs++;
        result.completedJobs.push({
          jobId: job._id,
          jobTitle: job.details.heading,
        });
      }

      result.numTotalJobs++;
      result.totalJobs.push({
        jobId: job._id,
        jobTitle: job.details.heading,
      });

      if (job.clientFeedback && job.clientFeedback.jobRating) {
        result.workPerformanceRatingAverage += job.clientFeedback.jobRating;
        numJobRating++;
        result.workPerformanceRating.push({
          jobId: job._id,
          jobTitle: job.details.heading,
          rating: job.clientFeedback.jobRating,
        });
      }

      if (job.clientFeedback && job.clientFeedback.customerServiceRating) {
        result.customerServiceRatingAverage += job.clientFeedback.customerServiceRating;
        numbServiceRating++;
        result.customerServiceRating.push({
          jobId: job._id,
          jobTitle: job.details.heading,
          rating: job.clientFeedback.customerServiceRating,
        });
      }
    }
    result.workPerformanceRatingAverage = result.workPerformanceRatingAverage / numJobRating;
    result.customerServiceRatingAverage = result.customerServiceRatingAverage / numbServiceRating;

    return result;
  }

  async getTotalEmployees(companyId: Types.ObjectId) {
    const employees = await this.employeeService.findAllInCompany(companyId);
    return employees.length;
  }

  async jobStats(companyId: Types.ObjectId) {
    const jobs = await this.jobService.getAllJobsInCompanyWithoutValidation(companyId);
    const invoices = await this.invoiceService.findAllForJob(companyId);
    const result = new JobsStatsResponseDto();
    result.totalNumJobs = jobs.length;
    let numJobRating = 0;
    let numbServiceRating = 0;
    result.numActiveJobs = 0;
    result.numCompletedJobs = 0;
    result.numArchivedJobs = 0;
    result.workPerformanceRatingAverage = 0;
    result.customerServiceRatingAverage = 0;

    for (const job of jobs) {
      const status = await this.jobService.getStatusByIdWithoutValidation(job.status);
      const statuses = await this.jobService.findAllStatusesInCompanyInternal(job.companyId);
      const lastStatus = statuses[statuses.length - 1].status;
      if (status.status === 'Archive') {
        result.numArchivedJobs++;
        result.archivedJobs.push({
          jobId: job._id,
          jobTitle: job.details.heading,
        });
      } else if (status.status === lastStatus) {
        result.numCompletedJobs++;
        result.completedJobs.push({
          jobId: job._id,
          jobTitle: job.details.heading,
        });
      } else {
        result.numActiveJobs++;
        result.activeJobs.push({
          jobId: job._id,
          jobTitle: job.details.heading,
        });
      }

      if (job.clientFeedback && job.clientFeedback.jobRating) {
        result.workPerformanceRatingAverage += job.clientFeedback.jobRating;
        numJobRating++;
        result.workPerformanceRating.push({
          jobId: job._id,
          jobTitle: job.details.heading,
          rating: job.clientFeedback.jobRating,
        });
      }

      if (job.clientFeedback && job.clientFeedback.customerServiceRating) {
        result.customerServiceRatingAverage += job.clientFeedback.customerServiceRating;
        numbServiceRating++;
        result.customerServiceRating.push({
          jobId: job._id,
          jobTitle: job.details.heading,
          rating: job.clientFeedback.customerServiceRating,
        });
      }
    }
    result.workPerformanceRatingAverage = result.workPerformanceRatingAverage / numJobRating;
    result.customerServiceRatingAverage = result.customerServiceRatingAverage / numbServiceRating;
    result.numJobsUnpaidInvoice = 0;
    result.amountOutstanding = 0;
    for (const invoice of invoices) {
      if (!invoice.paid) {
        result.numJobsUnpaidInvoice++;
        result.jobsUnpaidInvoice.push({
          invoiceId: invoice._id,
          invoiceNumber: invoice.invoiceNumber.toString(),
          total: invoice.total,
          job: {
            jobId: invoice.jobId,
            jobTitle: jobs.find((job) => job._id.toString() === invoice.jobId.toString()).details.heading,
          },
        });
        result.amountOutstanding += invoice.total;
      }
    }
    return result;
  }

  async inventoryStats(companyId: Types.ObjectId) {
    const inventoryItems = await this.inventoryService.findAllInCompany(companyId);
    const result = new InventoryStatsResponseDto();
    result.totalNumItems = inventoryItems.length;

    for (const item of inventoryItems) {
      if (item.reorderLevel >= item.currentStockLevel) {
        result.itemsToReorder.push({
          inventoryId: item._id,
          itemName: item.name,
          quantity: item.currentStockLevel,
        });
      }
      result.itemUsage.push({
        inventoryId: item._id,
        itemName: item.name,
        quantity: await this.stockMovementsService.getUsageForInventoryItem(item._id),
      });
    }
    result.costDueToStockLoss = 0;

    const stockTakes = await this.stockTakeService.findAllInCompany(companyId);
    for (const stockTake of stockTakes) {
      for (const item of stockTake.items) {
        if (item.recordedStockLevel - item.currentStockLevel < 0) {
          const inventoryItem = await this.inventoryService.findById(item.inventoryItem.inventoryId);
          let costPrice = 0;
          if (inventoryItem && inventoryItem.costPrice) {
            costPrice = inventoryItem.costPrice;
          }
          result.costDueToStockLoss += (item.recordedStockLevel - item.currentStockLevel) * costPrice;
          result.stockLost.push({
            inventoryItem: {
              inventoryId: item.inventoryItem.inventoryId,
              itemName: item.inventoryItem.name,
              quantity: (item.recordedStockLevel - item.currentStockLevel) * costPrice,
            },
            stockTakeId: stockTake._id,
          });
        }
      }
    }
    result.costDueToStockLoss = result.costDueToStockLoss;
    return result;
  }

  async teamStats(companyId: Types.ObjectId) {
    const teams = await this.teamService.findAllInCompany(companyId);

    const result = new TeamStatsResponseDto();
    result.totalNumTeams = teams.length;
    result.averageNumMembers = 0;
    result.averageNumJobsForTeam = 0;
    let totalTeam = 0;

    for (const team of teams) {
      result.averageNumMembers += team.teamMembers.length;
      totalTeam++;
      result.averageNumJobsForTeam += team.currentJobAssignments.length;

      const rating = new teamRating();
      rating.teamId = team._id;
      let numJobRating = 0;
      let numbServiceRating = 0;
      for (const jobId of team.currentJobAssignments) {
        const job = await this.jobService.getJobById(jobId);
        if (job && job.clientFeedback && job.clientFeedback.jobRating) {
          rating.workPerformanceRatingAverage += job.clientFeedback.jobRating;
          numJobRating++;
          rating.workPerformanceRating.push({
            jobId: job._id,
            jobTitle: job.details.heading,
            rating: job.clientFeedback.jobRating,
          });
        }

        if (job.clientFeedback && job.clientFeedback.customerServiceRating) {
          rating.customerServiceRatingAverage += job.clientFeedback.customerServiceRating;
          numbServiceRating++;
          rating.customerServiceRating.push({
            jobId: job._id,
            jobTitle: job.details.heading,
            rating: job.clientFeedback.customerServiceRating,
          });
        }
      }
      rating.workPerformanceRatingAverage = rating.workPerformanceRatingAverage / numJobRating;
      rating.customerServiceRatingAverage = rating.customerServiceRatingAverage / numbServiceRating;
      result.ratingPerTeam.push(rating);
    }
    result.averageNumMembers = result.averageNumMembers / totalTeam;
    result.averageNumJobsForTeam = result.averageNumJobsForTeam / totalTeam;
    return result;
  }

  async invoiceStats(companyId: Types.ObjectId) {
    const invoices = await this.invoiceService.detailedFindAllInCompany(companyId);

    const result = new InvoiceStatsResponseDto();
    result.totalNumInvoices = invoices.length;
    result.numPaid = 0;
    result.numUnpaid = 0;
    result.revenue = [
      { month: 'January', numUnpaid: 0 },
      { month: 'February', numUnpaid: 0 },
      { month: 'March', numUnpaid: 0 },
      { month: 'April', numUnpaid: 0 },
      { month: 'May', numUnpaid: 0 },
      { month: 'June', numUnpaid: 0 },
      { month: 'July', numUnpaid: 0 },
      { month: 'August', numUnpaid: 0 },
      { month: 'September', numUnpaid: 0 },
      { month: 'October', numUnpaid: 0 },
      { month: 'November', numUnpaid: 0 },
      { month: 'December', numUnpaid: 0 },
    ];

    for (const invoice of invoices) {
      if (invoice.paid) {
        result.numPaid++;
        result.paidInvoices.push({
          invoiceId: invoice._id,
          invoiceNumber: invoice.invoiceNumber.toString(),
          total: invoice.total,
          job: {
            jobId: invoice.jobId._id,
            jobTitle: (invoice.jobId as any).details.heading,
          },
        });
        const dateIndex = await this.getMonth(invoice.receiptOfPaymentDate);
        result.revenue[dateIndex].numUnpaid += invoice.total;
      } else {
        result.numUnpaid++;
        result.unpaidInvoices.push({
          invoiceId: invoice._id,
          invoiceNumber: invoice.invoiceNumber.toString(),
          total: invoice.total,
          job: {
            jobId: invoice.jobId._id,
            jobTitle: (invoice.jobId as any).details.heading,
          },
        });
      }
    }
    return result;
  }

  async getMonth(date: Date) {
    console.log('date: ', date);
    const dateString = date.toString();
    const match = dateString.match(/^\d{4}-(\d{2})-\d{2}/);

    if (match) {
      const month = match[1]; // Extract the month from the match
      switch (month) {
        case '01':
          return 0; // January
        case '02':
          return 1; // February
        case '03':
          return 2; // March
        case '04':
          return 3; // April
        case '05':
          return 4; // May
        case '06':
          return 5; // June
        case '07':
          return 6; // July
        case '08':
          return 7; // August
        case '09':
          return 8; // September
        case '10':
          return 9; // October
        case '11':
          return 10; // November
        case '12':
          return 11; // December
        default:
          return null; // Invalid month
      }
    }

    return null; // Return null if no match is found
  }
}
