import { Types } from 'mongoose';
import { IsArray, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class Ratings {
  @ApiProperty()
  @IsString()
  jobTitle: string;

  @ApiProperty()
  @IsMongoId()
  jobId: Types.ObjectId;

  @ApiProperty()
  @IsNumber()
  rating: number;
}

export class Job {
  @ApiProperty()
  @IsMongoId()
  jobId: Types.ObjectId;

  @ApiProperty()
  @IsString()
  jobTitle: string;
}

export class Invoice {
  @ApiProperty()
  @IsMongoId()
  invoiceId: Types.ObjectId;

  @ApiProperty()
  @IsString()
  invoiceNumber: string;

  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty()
  job: Job;
}
export class ClientStatsResponseDto {
  @ApiProperty()
  @IsMongoId()
  clientId: Types.ObjectId;

  @ApiProperty()
  @IsNumber()
  numActiveJobs: number;

  @ApiProperty()
  @IsArray()
  activeJobs: Job[] = [];

  @ApiProperty()
  @IsNumber()
  numTotalJobs: number;

  @ApiProperty()
  @IsArray()
  allJobs: Job[] = [];

  @ApiProperty()
  @IsNumber()
  numCompletedJobs: number;

  @ApiProperty()
  @IsArray()
  completedJobs: Job[] = [];

  @ApiProperty()
  @IsArray()
  workPerformanceRating: Ratings[] = [];

  @ApiProperty()
  @IsNumber()
  workPerformanceRatingAverage: number;

  @ApiProperty()
  @IsArray()
  customerServiceRating: Ratings[] = [];

  @ApiProperty()
  @IsNumber()
  customerServiceRatingAverage: number;

  @ApiProperty()
  @IsNumber()
  numInvoicesPaid: number;

  @ApiProperty()
  @IsArray()
  invoicesPaid: Invoice[] = [];

  @ApiProperty()
  @IsNumber()
  numInvoicesUnpaid: number;

  @ApiProperty()
  @IsArray()
  invoicesUnpaid: Invoice[] = [];
}
export class EmployeeStatsResponseDto {
  @ApiProperty()
  @IsMongoId()
  employeeId: Types.ObjectId;

  @ApiProperty()
  @IsNumber()
  numActiveJobs: number;

  @ApiProperty()
  @IsArray()
  activeJobs: Job[] = [];

  @ApiProperty()
  @IsNumber()
  numTotalJobs: number;

  @ApiProperty()
  @IsArray()
  totalJobs: Job[] = [];

  @ApiProperty()
  @IsNumber()
  numCompletedJobs: number;

  @ApiProperty()
  @IsArray()
  completedJobs: Job[] = [];

  @ApiProperty()
  @IsNumber()
  numJobsCompletedOnTime: number;

  @ApiProperty()
  @IsArray()
  jobsCompletedOnTime: Job[] = [];

  @ApiProperty()
  @IsNumber()
  numJobsCompletedLate: number;

  @ApiProperty()
  @IsArray()
  jobsCompletedLate: Job[] = [];

  @ApiProperty()
  @IsArray()
  workPerformanceRating: Ratings[] = [];

  @ApiProperty()
  @IsNumber()
  workPerformanceRatingAverage: number;

  @ApiProperty()
  @IsArray()
  customerServiceRating: Ratings[] = [];

  @ApiProperty()
  @IsNumber()
  customerServiceRatingAverage: number;
}

export class JobsStatsResponseDto {
  @ApiProperty()
  @IsNumber()
  totalNumJobs: number;

  @ApiProperty()
  @IsNumber()
  numActiveJobs: number;

  @ApiProperty()
  @IsArray()
  activeJobs: Job[] = [];

  @ApiProperty()
  @IsNumber()
  numCompletedJobs: number;

  @ApiProperty()
  @IsArray()
  completedJobs: Job[] = [];

  @ApiProperty()
  @IsNumber()
  numArchivedJobs: number;

  @ApiProperty()
  @IsArray()
  archivedJobs: Job[] = [];

  @ApiProperty()
  @IsArray()
  workPerformanceRating: Ratings[] = [];

  @ApiProperty()
  @IsNumber()
  workPerformanceRatingAverage: number;

  @ApiProperty()
  @IsArray()
  customerServiceRating: Ratings[] = [];

  @ApiProperty()
  @IsNumber()
  customerServiceRatingAverage: number;

  @ApiProperty()
  @IsNumber()
  numJobsUnpaidInvoice: number;

  @ApiProperty()
  @IsArray()
  jobsUnpaidInvoice: Invoice[] = [];

  @ApiProperty()
  @IsNumber()
  amountOutstanding: number;
}

export class inventoryItem {
  @ApiProperty()
  @IsMongoId()
  inventoryId: Types.ObjectId;

  @ApiProperty()
  @IsString()
  itemName: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  quantity?: number;
}
class stockLossItem {
  @ApiProperty()
  inventoryItem: inventoryItem;

  @ApiProperty()
  @IsMongoId()
  stockTakeId: Types.ObjectId;
}

export class InventoryStatsResponseDto {
  @ApiProperty()
  @IsNumber()
  totalNumItems: number;

  @ApiProperty()
  @IsArray()
  itemsToReorder: inventoryItem[] = [];

  @ApiProperty()
  @IsArray()
  highestUsedItems: inventoryItem[] = [];

  @ApiProperty()
  @IsArray()
  stockLost: stockLossItem[] = [];

  @ApiProperty()
  @IsNumber()
  costDueToStockLoss: number;
}

export class averageRatingPerTeam {
  @ApiProperty()
  @IsMongoId()
  teamId: Types.ObjectId;

  @ApiProperty()
  @IsArray()
  workPerformanceRating: Ratings[] = [];

  @ApiProperty()
  @IsNumber()
  workPerformanceRatingAverage: number;

  @ApiProperty()
  @IsArray()
  customerServiceRating: Ratings[] = [];

  @ApiProperty()
  @IsNumber()
  customerServiceRatingAverage: number;
}

export class teamJobAverage {
  @ApiProperty()
  @IsMongoId()
  teamId: Types.ObjectId;

  @ApiProperty()
  @IsString()
  teamName: string;

  @ApiProperty()
  @IsNumber()
  averageNumJobsPerTeam: number;
}

export class teamRating {
  @ApiProperty()
  @IsMongoId()
  teamId: Types.ObjectId;

  @ApiProperty()
  @IsArray()
  workPerformanceRating: Ratings[] = [];

  @ApiProperty()
  @IsNumber()
  workPerformanceRatingAverage: number;

  @ApiProperty()
  @IsArray()
  customerServiceRating: Ratings[] = [];

  @ApiProperty()
  @IsNumber()
  customerServiceRatingAverage: number;
}

export class TeamStatsResponseDto {
  @ApiProperty()
  @IsNumber()
  totalNumTeams: number;

  @ApiProperty()
  @IsNumber()
  averageNumMembers: number;

  @ApiProperty()
  @IsNumber()
  averageNumJobsForTeam: number;

  @ApiProperty()
  @IsArray()
  ratingPerTeam: teamRating[] = [];
}

export class InvoiceStatsResponseDto {
  @ApiProperty()
  @IsNumber()
  totalNumInvoices: number;

  @ApiProperty()
  @IsNumber()
  numPaid: number;

  @ApiProperty()
  @IsArray()
  paidInvoices: Invoice[] = [];

  @ApiProperty()
  @IsNumber()
  numUnpaid: number;

  @ApiProperty()
  @IsArray()
  unpaidInvoices: Invoice[] = [];

  @ApiProperty()
  @IsNumber()
  revenue: number;
}
