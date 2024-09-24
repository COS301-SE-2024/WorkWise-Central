import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  Headers,
  Query,
  BadRequestException,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ExternalInventoryUpdateDto } from './dto/update-inventory.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { InventoryListResponseDto, InventoryResponseDto, InventoryUsedResponseDto } from './entities/inventory.entity';
import { Types } from 'mongoose';
import { BooleanResponseDto } from '../shared/dtos/api-response.dto';
import { CreateInventoryDto, CreateInventoryOuterDto, CreateInventoryResponseDto } from './dto/create-inventory.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from '../employee/employee.service';
import { extractUserId, isBase64Uri } from '../utils/Utils';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UsersService } from '../users/users.service';
import { CurrentEmployeeDto } from '../shared/dtos/current-employee.dto';
import { ListOfUpdatesForUsedInventory, ListOfUsedInventory } from './dto/use-inventory.dto';
import { InventoryUsedService } from '../inventory-used/inventory-used.service';

const className = 'Inventory';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly jwtService: JwtService,
    private readonly employeeService: EmployeeService,
    private readonly userService: UsersService,
    private readonly inventoryUsedService: InventoryUsedService,
  ) {}

  async validateRequestWithEmployeeId(userId: Types.ObjectId, currentEmployeeId: Types.ObjectId) {
    const user = await this.userService.getUserById(userId);
    console.log('user', user);
    console.log('currentEmployeeId: ', currentEmployeeId);
    if (!user.joinedCompanies.find((joined) => joined.employeeId.toString() === currentEmployeeId.toString())) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  //********Endpoints for test purposes - Start**********/
  @ApiOperation({
    summary: `Used for testing. DO NOT USE IN PRODUCTION`,
  })
  @Get('/all')
  async findAll() {
    const data = await await this.inventoryService.findAll();
    return { data: data };
  }

  @ApiOperation({
    summary: `Used for testing. DO NOT USE IN PRODUCTION`,
  })
  @Get()
  hello() {
    return { message: 'Refer to /documentation for details on the API' };
  }
  //********Endpoints for test purposes - End**********/

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiOperation({
    summary: `Create a new ${className}`,
    description:
      'Call to create a new Inventory item. The name and companyId are required. It returns the access token and the inventoryId.',
  })
  @ApiBody({ type: CreateInventoryDto })
  @ApiResponse({
    status: 201,
    type: CreateInventoryResponseDto,
  })
  @Post('/create')
  async create(
    @Headers() headers: any,
    @Body()
    createInventoryOuterDto: CreateInventoryOuterDto,
  ) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithEmployeeId(userId, createInventoryOuterDto.currentEmployeeId);

    //Base64 Validation
    console.log(createInventoryOuterDto);
    if (createInventoryOuterDto.createInventoryDto.images.length > 0) {
      for (const image of createInventoryOuterDto.createInventoryDto.images) {
        const valid = isBase64Uri(image);
        if (!valid) throw new BadRequestException('Images must be Base64 URIs');
      }
    }

    const currentEmployee = await this.employeeService.findById(createInventoryOuterDto.currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('add new inventory item')) {
      let data;
      try {
        data = await this.inventoryService.create(createInventoryOuterDto.createInventoryDto);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiOperation({
    summary: `Get all ${className} instances for a given Company`,
    description: `Returns all ${className} instances in the database for a given Company.`,
  })
  @ApiOkResponse({
    type: InventoryListResponseDto,
    description: `An array of mongodb objects of the ${className} class for a given Company.`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the Company for which to get all ${className} instances.`,
  })
  @Get('/all/:currentEmployeeId')
  async findAllInCompany(@Headers() headers: any, @Param('currentEmployeeId') currentEmployeeId: Types.ObjectId) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithEmployeeId(userId, currentEmployeeId);

    const currentEmployee = await this.employeeService.findById(currentEmployeeId);
    console.log('currentEmployee', currentEmployee);
    if (currentEmployee.role.permissionSuite.includes('view all inventory')) {
      console.log('in if');
      let data;
      try {
        console.log('in try');
        data = await this.inventoryService.findAllInCompany(currentEmployee.companyId);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiOperation({
    summary: `Find an ${className}`,
    description: `Returns the ${className} instance with the given id.`,
  })
  @ApiOkResponse({
    type: InventoryResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className} to be retrieved.`,
  })
  @Get('id/:id')
  async findById(
    @Headers() headers: any,
    @Param('id') id: Types.ObjectId,
    @Query('currentEmployeeId') currentEmployeeId: Types.ObjectId,
  ) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithEmployeeId(userId, currentEmployeeId);

    const currentEmployee = await this.employeeService.findById(currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('view all inventory')) {
      const data = await this.inventoryService.findById(id);
      return { data: data };
    } else {
      throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiOperation({
    summary: `Update an ${className} instances`,
    description: `Send the ${className} ObjectId, and the updated object, and then they get updated if the id is valid.`,
  })
  @ApiOkResponse({
    type: InventoryResponseDto,
    description: `The updated ${className} object`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className} to be updated.`,
  })
  @ApiBody({ type: ExternalInventoryUpdateDto })
  @Patch(':id')
  async update(
    @Headers() headers: any,
    @Param('id') id: Types.ObjectId,
    @Body()
    externalInventoryUpdateDto: ExternalInventoryUpdateDto,
  ) {
    console.log('\n IN THE UPDATE ENDPOINT');
    console.log('externalInventoryUpdateDto: ', externalInventoryUpdateDto);
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithEmployeeId(userId, externalInventoryUpdateDto.currentEmployeeId);

    const currentEmployee = await this.employeeService.findById(externalInventoryUpdateDto.currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('edit all inventory')) {
      console.log('in if');
      let data;
      try {
        data = await this.inventoryService.update(id, externalInventoryUpdateDto);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiOperation({
    summary: `Record use of inventory in a job`,
    description: `Send a array of the items used and the amounts used`,
  })
  @ApiOkResponse({
    type: InventoryResponseDto,
    description: `The updated ${className} object`,
  })
  @ApiBody({ type: ListOfUsedInventory })
  @Post('/recordStockUse')
  async recordStockUse(
    @Headers() headers: any,
    @Body()
    listOfUsedInventory: ListOfUsedInventory,
  ) {
    console.log('In recordStockUse');
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithEmployeeId(userId, listOfUsedInventory.currentEmployeeId);

    const currentEmployee = await this.employeeService.findById(listOfUsedInventory.currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('record inventory use')) {
      let data;
      try {
        data = await this.inventoryService.recordStockUse(listOfUsedInventory);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiOperation({
    summary: `Update an ${className} stock use recorded`,
    description: `Send an array of inventory id's and the change in the amount recorded before`,
  })
  @ApiOkResponse({
    type: InventoryResponseDto,
    description: `The updated ${className} object`,
  })
  @ApiBody({ type: ListOfUpdatesForUsedInventory })
  @Post('/updateStockUse')
  async updateStockUse(
    @Headers() headers: any,
    @Body()
    listOfUsedInventory: ListOfUpdatesForUsedInventory,
  ) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithEmployeeId(userId, listOfUsedInventory.currentEmployeeId);

    const currentEmployee = await this.employeeService.findById(listOfUsedInventory.currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('record inventory use')) {
      let data;
      try {
        data = await this.inventoryService.updateStockUse(listOfUsedInventory);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiOperation({
    summary: `Find an ${className}`,
    description: `Returns the Inventory used for a given job.`,
  })
  @ApiOkResponse({
    type: InventoryUsedResponseDto,
    description: `The mongodb object of the ${className}, with an _id attribute`,
  })
  @ApiParam({
    name: 'jobId',
    description: `The _id attribute of the Job for which to retrieve the inventory used.`,
  })
  @Get('stockUsed/:jobId')
  async getStockUsed(@Headers() headers: any, @Param('jobId') jobId: Types.ObjectId) {
    try {
      const data = await this.inventoryUsedService.findAllForJob(jobId);
      return { data: data };
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiNoContentResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
    description: `There was no data returned for the request. Please check the request and try again.`,
  })
  @ApiBadRequestResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
    description: `There is something wrong with the request. Please check the request and try again.`,
  })
  @ApiUnauthorizedResponse({
    type: HttpException,
    status: HttpStatus.UNAUTHORIZED,
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Add new images to an inventory item (the key needed in in your form-data is "files")`,
    description: `Send the ${className} ObjectId, and the updated object, and then they get updated if the id is valid.`,
  })
  @ApiOkResponse({
    type: InventoryResponseDto,
    description: `The updated ${className} object`,
  })
  @Put('images/')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 20 }]))
  async addImages(
    @Headers() headers: any,
    @Query('inventoryId') id: Types.ObjectId,
    @Query('empId') currentEmployeeId: Types.ObjectId,
    @UploadedFiles() files: { files?: Express.Multer.File[] },
  ) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithEmployeeId(userId, currentEmployeeId);

    if (id == undefined || currentEmployeeId == null) {
      throw new BadRequestException('Query parameters are missing');
    }
    console.log(files);
    console.log('In addImages inventory controller');
    const currentEmployee = await this.employeeService.findById(currentEmployeeId);
    console.log('currentEmployee: ', currentEmployee);
    if (currentEmployee.role.permissionSuite.includes('edit all inventory')) {
      console.log('in if');
      let data;
      try {
        //TODO: Validation of invId and empId
        data = await this.inventoryService.addImages(id, files.files);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      return { data: data };
    } else {
      throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiNoContentResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
    description: `There was no data returned for the request. Please check the request and try again.`,
  })
  @ApiBadRequestResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
    description: `There is something wrong with the request. Please check the request and try again.`,
  })
  @ApiUnauthorizedResponse({
    type: HttpException,
    status: HttpStatus.UNAUTHORIZED,
    description: `The user making the request and jwt mismatch.`,
  })
  @ApiForbiddenResponse({
    type: HttpException,
    status: HttpStatus.FORBIDDEN,
    description: `The user making the request is not authorized to view the data.`,
  })
  @ApiOperation({
    summary: `Delete an ${className}`,
    description: `Send the ${className} ObjectId, and then they get deleted if the id is valid.\n `,
    security: [],
  })
  @ApiOkResponse({
    type: BooleanResponseDto,
    description: `A boolean value indicating whether or not the deletion was a success`,
  })
  @ApiParam({
    name: 'id',
    description: `The _id attribute of the ${className}`,
  })
  @ApiBody({ type: CurrentEmployeeDto })
  @Delete(':id')
  async remove(
    @Headers() headers: any,
    @Param('id') id: Types.ObjectId,
    @Body() currentEmployeeDto: CurrentEmployeeDto,
  ) {
    const userId = await extractUserId(this.jwtService, headers);
    await this.validateRequestWithEmployeeId(userId, currentEmployeeDto.currentEmployeeId);

    const currentEmployee = await this.employeeService.findById(currentEmployeeDto.currentEmployeeId);
    if (currentEmployee.role.permissionSuite.includes('delete inventory item')) {
      let data;
      try {
        data = await this.inventoryService.remove(id);
      } catch (e) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }

      if (data === false) {
        throw new HttpException('update unsuccessful', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return { data: data };
    } else {
      throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
    }
  }
}
