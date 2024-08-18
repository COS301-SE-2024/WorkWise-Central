import {
  Controller,
  Get,
  // Body,
  // Patch,
  // Param,
  // Delete,
  // HttpException,
  // HttpStatus,
  // Post,
  // UseGuards,
  // Headers,
  // Query,
  // BadRequestException,
  // Put,
  // UploadedFiles,
  // UseInterceptors,
} from '@nestjs/common';
import { InventoryService } from './stocktake.service';
// import { UpdateInventoryDto } from './dto/update-stocktake.dto';
import {
  // ApiBearerAuth,
  // ApiBody,
  // ApiConsumes,
  // ApiInternalServerErrorResponse,
  // ApiOkResponse,
  ApiOperation,
  // ApiParam,
  // ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
// import { InventoryListResponseDto, InventoryResponseDto } from './entities/stocktake.entity';
// import { Types } from 'mongoose';
// import { BooleanResponseDto } from '../shared/dtos/api-response.dto';
// import { CreateInventoryDto, CreateInventoryOuterDto, CreateInventoryResponseDto } from './dto/create-stocktake.dto';
// import { AuthGuard } from '../auth/auth.guard';
// import { extractUserId } from '../utils/Utils';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from '../employee/employee.service';
// import { isBase64Uri, validateObjectId } from '../utils/Utils';
// import { FileFieldsInterceptor } from '@nestjs/platform-express';

// const className = 'StockTake';

@ApiTags('StockTake')
@Controller('stocktake')
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly jwtService: JwtService,
    private readonly employeeService: EmployeeService,
  ) {}

  @ApiOperation({
    summary: `Refer to Documentation`,
  })
  @Get()
  hello() {
    return { message: 'Refer to /documentation for details on the API' };
  }

  // @UseGuards(AuthGuard)
  // @ApiBearerAuth('JWT')
  // @ApiInternalServerErrorResponse({
  //   type: HttpException,
  //   status: HttpStatus.BAD_REQUEST,
  // })
  // @ApiOperation({
  //   summary: `Create a new ${className}`,
  //   description:
  //     'Call to create a new Inventory item. The name and companyId are required. It returns the access token and the inventoryId.',
  // })
  // @ApiBody({ type: CreateInventoryDto })
  // @ApiResponse({
  //   status: 201,
  //   type: CreateInventoryResponseDto,
  // })
  // @Post('/create')
  // async create(
  //   @Headers() headers: any,
  //   @Body()
  //   body: CreateInventoryOuterDto,
  // ) {
  //   //Base64 Validation
  //   console.log(body);
  //   if (body.createInventoryDto.images.length > 0) {
  //     for (const image of body.createInventoryDto.images) {
  //       const valid = isBase64Uri(image);
  //       if (!valid) throw new BadRequestException('Images must be Base64 URIs');
  //     }
  //   }

  //   const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
  //   if (currentEmployee.role.permissionSuite.includes('add new inventory item')) {
  //     let data;
  //     try {
  //       data = await this.inventoryService.create(body.createInventoryDto);
  //     } catch (e) {
  //       throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
  //     }
  //     return { data: data };
  //   } else {
  //     throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // //********Endpoints for test purposes - Start**********/
  // @Get('/all')
  // async findAll() {
  //   const data = await await this.inventoryService.findAll();
  //   return { data: data };
  // }
  // //********Endpoints for test purposes - End**********/

  // @UseGuards(AuthGuard)
  // @ApiBearerAuth('JWT')
  // @ApiInternalServerErrorResponse({
  //   type: HttpException,
  //   status: HttpStatus.NO_CONTENT,
  // })
  // @ApiInternalServerErrorResponse({
  //   type: HttpException,
  //   status: HttpStatus.BAD_REQUEST,
  // })
  // @ApiOperation({
  //   summary: `Get all ${className} instances for a given Company`,
  //   description: `Returns all ${className} instances in the database for a given Company.`,
  // })
  // @ApiOkResponse({
  //   type: InventoryListResponseDto,
  //   description: `An array of mongodb objects of the ${className} class for a given Company.`,
  // })
  // @ApiParam({
  //   name: 'id',
  //   description: `The _id attribute of the Company for which to get all ${className} instances.`,
  // })
  // @Get('/all/:currentEmployeeId')
  // async findAllInCompany(
  //   @Headers() headers: any,
  //   @Param('currentEmployeeId') currentEmployeeId: Types.ObjectId,
  //   // @Query('currentEmployeeId') currentEmployeeId: Types.ObjectId,
  // ) {
  //   console.log('In findAllInCompany');
  //   if (!currentEmployeeId) {
  //     throw new HttpException('currentEmployeeId is required', HttpStatus.BAD_REQUEST);
  //   }
  //   validateObjectId(currentEmployeeId, 'currentEmployee');
  //   console.log('In findAllInCompany');
  //   // console.log('id', id);
  //   const currentEmployee = await this.employeeService.findById(currentEmployeeId);
  //   console.log('currentEmployee', currentEmployee);
  //   if (currentEmployee.role.permissionSuite.includes('view all inventory')) {
  //     console.log('in if');
  //     let data;
  //     try {
  //       console.log('in try');
  //       data = await this.inventoryService.findAllInCompany(currentEmployee.companyId);
  //     } catch (e) {
  //       throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
  //     }
  //     return { data: data };
  //   } else {
  //     throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @UseGuards(AuthGuard)
  // @ApiBearerAuth('JWT')
  // @ApiInternalServerErrorResponse({
  //   type: HttpException,
  //   status: HttpStatus.NO_CONTENT,
  // })
  // @ApiOperation({
  //   summary: `Find an ${className}`,
  //   description: `Returns the ${className} instance with the given id.`,
  // })
  // @ApiOkResponse({
  //   type: InventoryResponseDto,
  //   description: `The mongodb object of the ${className}, with an _id attribute`,
  // })
  // @ApiParam({
  //   name: 'id',
  //   description: `The _id attribute of the ${className} to be retrieved.`,
  // })
  // @Get('id/:id')
  // async findById(
  //   @Headers() headers: any,
  //   @Param('id') id: Types.ObjectId,
  //   @Query('currentEmployeeId') currentEmployeeId: Types.ObjectId,
  // ) {
  //   if (!currentEmployeeId) {
  //     throw new HttpException('currentEmployeeId is required', HttpStatus.BAD_REQUEST);
  //   }
  //   validateObjectId(currentEmployeeId, 'currentEmployee');
  //   const currentEmployee = await this.employeeService.findById(currentEmployeeId);
  //   if (currentEmployee.role.permissionSuite.includes('view all inventory')) {
  //     const data = await this.inventoryService.findById(id);
  //     return { data: data };
  //   } else {
  //     throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @UseGuards(AuthGuard)
  // @ApiBearerAuth('JWT')
  // @ApiInternalServerErrorResponse({
  //   type: HttpException,
  //   status: HttpStatus.BAD_REQUEST,
  // })
  // @ApiOperation({
  //   summary: `Update an ${className} instances`,
  //   description: `Send the ${className} ObjectId, and the updated object, and then they get updated if the id is valid.`,
  // })
  // @ApiOkResponse({
  //   type: InventoryResponseDto,
  //   description: `The updated ${className} object`,
  // })
  // @ApiParam({
  //   name: 'id',
  //   description: `The _id attribute of the ${className} to be updated.`,
  // })
  // @ApiBody({ type: UpdateInventoryDto })
  // @Patch(':id')
  // async update(
  //   @Headers() headers: any,
  //   @Param('id') id: Types.ObjectId,
  //   @Body()
  //   body: {
  //     currentEmployeeId: Types.ObjectId;
  //     updateInventoryDto: UpdateInventoryDto;
  //   },
  // ) {
  //   console.log('In update inventory controller');
  //   const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
  //   console.log('currnetEmployee: ', currentEmployee);
  //   if (currentEmployee.role.permissionSuite.includes('edit all inventory')) {
  //     console.log('in if');
  //     let data;
  //     try {
  //       data = await this.inventoryService.update(id, body.updateInventoryDto);
  //     } catch (e) {
  //       throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
  //     }
  //     return { data: data };
  //   } else {
  //     throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @UseGuards(AuthGuard)
  // @ApiBearerAuth('JWT')
  // @ApiInternalServerErrorResponse({
  //   type: HttpException,
  //   status: HttpStatus.BAD_REQUEST,
  // })
  // @ApiOperation({
  //   summary: `Add new images to an inventory item (the key needed in in your form-data is "files")`,
  //   description: `Send the ${className} ObjectId, and the updated object, and then they get updated if the id is valid.`,
  // })
  // @ApiOkResponse({
  //   type: InventoryResponseDto,
  //   description: `The updated ${className} object`,
  // })
  // @Put('images/')
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 20 }]))
  // async addImages(
  //   @Headers() headers: any,
  //   @Query('inventoryId') id: Types.ObjectId,
  //   @Query('empId') currentEmployeeId: Types.ObjectId,
  //   @UploadedFiles() files: { files?: Express.Multer.File[] },
  // ) {
  //   if (id == undefined || currentEmployeeId == null) {
  //     throw new BadRequestException('Query parameters are missing');
  //   }
  //   console.log(files);
  //   console.log('In addImages inventory controller');
  //   const currentEmployee = await this.employeeService.findById(currentEmployeeId);
  //   console.log('currentEmployee: ', currentEmployee);
  //   if (currentEmployee.role.permissionSuite.includes('edit all inventory')) {
  //     console.log('in if');
  //     let data;
  //     try {
  //       //TODO: Validation of invId and empId
  //       data = await this.inventoryService.addImages(id, files.files);
  //     } catch (e) {
  //       throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
  //     }
  //     return { data: data };
  //   } else {
  //     throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @UseGuards(AuthGuard)
  // @ApiBearerAuth('JWT')
  // @ApiInternalServerErrorResponse({
  //   type: HttpException,
  //   status: HttpStatus.BAD_REQUEST,
  // })
  // @ApiInternalServerErrorResponse({
  //   type: HttpException,
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  // })
  // @ApiOperation({
  //   summary: `Delete an ${className}`,
  //   description: `Send the ${className} ObjectId, and then they get deleted if the id is valid.\n `,
  //   security: [],
  // })
  // @ApiOkResponse({
  //   type: BooleanResponseDto,
  //   description: `A boolean value indicating whether or not the deletion was a success`,
  // })
  // @ApiParam({
  //   name: 'id',
  //   description: `The _id attribute of the ${className}`,
  // })
  // @Delete(':id')
  // async remove(
  //   @Headers() headers: any,
  //   @Param('id') id: Types.ObjectId,
  //   @Body() body: { currentEmployeeId: Types.ObjectId },
  // ) {
  //   const currentEmployee = await this.employeeService.findById(body.currentEmployeeId);
  //   if (currentEmployee.role.permissionSuite.includes('delete inventory item')) {
  //     let data;
  //     try {
  //       data = await this.inventoryService.remove(id);
  //     } catch (e) {
  //       throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
  //     }

  //     if (data === false) {
  //       throw new HttpException('update unsuccessful', HttpStatus.INTERNAL_SERVER_ERROR);
  //     }
  //     return { data: data };
  //   } else {
  //     throw new HttpException('Invalid permission', HttpStatus.BAD_REQUEST);
  //   }
  // }
}
