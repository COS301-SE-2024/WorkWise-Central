import { Body, Controller, Get, Headers, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { FleetService } from './fleet.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { extractUserId, validateObjectId } from '../utils/Utils';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { FleetVehicleResponseDto, FleetVehiclesResponseDto } from './dto/fleet-response.dto';
import { Types } from 'mongoose';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

const className = 'Fleet';

@ApiTags('Fleet')
@Controller('fleet')
export class FleetController {
  constructor(
    private readonly fleetService: FleetService,
    private readonly jwtService: JwtService,
    //private readonly employeeService: EmployeeService,
  ) {}

  @UseGuards(AuthGuard) //Need to add authorization
  @Get()
  lookAtDocumentation() {
    return { message: 'Refer to /documentation for details on the API' };
  }

  @ApiOperation({
    summary: `Create a new vehicle within a Fleet`,
    description: 'Further details',
  })
  @ApiResponse({
    status: 201,
    type: FleetVehicleResponseDto,
    description: `The access token and Vehicle's Id used for querying.`,
  })
  @Post('/create')
  async create(@Headers() headers: any, @Body() createVehicleDto: CreateVehicleDto) {
    const userId = extractUserId(this.jwtService, headers);
    return { data: await this.fleetService.create(userId, createVehicleDto) };
  }

  @ApiOperation({
    summary: `Get all Vehicle instances`,
  })
  @ApiOkResponse({
    type: FleetVehiclesResponseDto,
    description: `An array of mongodb objects of the Vehicle class`,
  })
  @Get('/all')
  async findAll(@Headers() headers: any) {
    try {
      const userId = extractUserId(this.jwtService, headers);
      return { data: await this.fleetService.getAllVehicles(userId) };
    } catch (Error) {
      throw Error;
    }
  }

  @ApiOperation({
    summary: `Get all Vehicle instances in a specific company's fleet`,
  })
  @ApiOkResponse({
    type: FleetVehiclesResponseDto,
    description: `An array of mongodb objects of the Vehicle class`,
  })
  @Get('/company/:companyId')
  async findAllInCompany(
    @Headers() headers: any,
    @Param('companyId') companyId: string,
    @Param('employeeId') employeeId: string,
  ) {
    try {
      validateObjectId(companyId);
      const userId = extractUserId(this.jwtService, headers);
      const companyObjectId = new Types.ObjectId(companyId);
      const employeeObjectId = new Types.ObjectId(employeeId);
      return { data: await this.fleetService.getAllVehiclesInCompany(userId, companyObjectId, employeeObjectId) };
    } catch (Error) {
      throw Error;
    }
  }

  @ApiOperation({ summary: `Find a specific Vehicle within a ${className}` })
  @ApiOkResponse({
    type: FleetVehicleResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @Get('id/:vid')
  async findOne(@Headers() headers: any, @Param('vid') vId: string) {
    try {
      validateObjectId(vId);
      const userId = extractUserId(this.jwtService, headers);
      const vehicleId = new Types.ObjectId(vId);
      return {
        data: await this.fleetService.getById(userId, vehicleId),
      };
    } catch (e) {
      throw e;
    }
  }

  @ApiOperation({ summary: `Find a Vehicle in a Fleet by its vin number` })
  @ApiOkResponse({
    type: FleetVehicleResponseDto,
    description: `The mongodb object of the Vehicle, with an _id attribute`,
  })
  @Get('vin/:vin')
  async findByVinNumber(@Headers() headers: any, @Param('vin') vin: string) {
    try {
      const userId = extractUserId(this.jwtService, headers);

      return {
        data: await this.fleetService.getByVinNumber(userId, vin),
      };
    } catch (e) {
      throw e;
    }
  }

  @ApiOperation({ summary: `Update a Vehicle in a ${className}` })
  @ApiOkResponse({
    type: FleetVehicleResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @Patch('update')
  async update(@Headers() headers: any, @Body() updateVehicleDto: UpdateVehicleDto) {
    try {
      const userId = extractUserId(this.jwtService, headers);

      return {
        data: await this.fleetService.updateVehicle(userId, updateVehicleDto),
      };
    } catch (e) {
      throw e;
    }
  }
}
