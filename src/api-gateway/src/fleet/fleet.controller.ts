import { Body, Controller, Get, Headers, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { FleetService } from './fleet.service';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from '../employee/employee.service';
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
    private readonly employeeService: EmployeeService,
  ) {}

  @UseGuards(AuthGuard) //Need to add authorization
  @Get()
  lookAtDocumentation() {
    return { message: 'Refer to /documentation for details on the API' };
  }

  @ApiOperation({
    summary: `Create a new ${className}`,
    description: 'Further details',
  })
  @ApiResponse({
    status: 201,
    type: FleetVehicleResponseDto,
    description: `The access token and ${className}'s Id used for querying.`,
  })
  @Post('/create')
  async create(@Headers() headers: any, @Body() createVehicleDto: CreateVehicleDto) {
    const userId = extractUserId(this.jwtService, headers);

    // if (createVehicleDto.logo) {
    //   if (!isBase64Uri(createVehicleDto.logo)) {
    //     throw new BadRequestException('Profile picture is invalid, it must be base64 encoded');
    //   }
    // }
    return { data: await this.fleetService.create(userId, createVehicleDto) };
  }

  @ApiOperation({
    summary: `Get all ${className} objects`,
  })
  @ApiOkResponse({
    type: FleetVehiclesResponseDto,
    description: `An array of mongodb objects of the ${className} class`,
  })
  @Get('/all')
  async findAllNames(@Headers() headers: any) {
    try {
      const userId = extractUserId(this.jwtService, headers);
      return { data: await this.fleetService.getAllVehicles(userId) };
    } catch (Error) {
      throw Error;
    }
  }

  @ApiOperation({ summary: `Find a ${className}` })
  @ApiOkResponse({
    type: FleetVehicleResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @Get('id/:id')
  async findOne(@Headers() headers: any, @Param('id') id: string) {
    try {
      validateObjectId(id);
      const userId = extractUserId(this.jwtService, headers);

      return {
        data: await this.fleetService.getById(userId, new Types.ObjectId(id)),
      };
    } catch (e) {
      throw e;
    }
  }

  @ApiOperation({ summary: `Find a ${className} by vin number` })
  @ApiOkResponse({
    type: FleetVehicleResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
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

  @ApiOperation({ summary: `Update a ${className}` })
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
