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
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  InventoryListResponseDto,
  InventoryResponseDto,
} from './entities/inventory.entity';
import { Types } from 'mongoose';
import { BooleanResponseDto } from '../shared/dtos/api-response.dto';
import {
  CreateInventoryDto,
  CreateInventoryResponseDto,
} from './dto/create-inventory.dto';
import { AuthGuard } from '../auth/auth.guard';

const className = 'Inventory';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiOperation({
    summary: `Refer to Documentation`,
  })
  @Get()
  hello() {
    return { message: 'Refer to /documentation for details on the API' };
  }

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
  async create(@Body() createInventoryDto: CreateInventoryDto) {
    let data;
    try {
      data = await this.inventoryService.create(createInventoryDto);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    return { data: data };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiOperation({
    summary: `Get all ${className} instances`,
    description: `Returns all ${className} instances in the database.`,
  })
  @ApiOkResponse({
    type: InventoryListResponseDto,
    description: `An array of mongodb objects of the ${className} class.`,
  })
  @Get('/all')
  async findAll() {
    const data = await await this.inventoryService.findAll();
    return { data: data };
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
  @Get('/all/:id')
  async findAllInCompany(@Param('id') id: Types.ObjectId) {
    let data;
    try {
      data = await this.inventoryService.findAllInCompany(id);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    return { data: data };
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
  async findById(@Param('id') id: Types.ObjectId) {
    const data = await this.inventoryService.findById(id);
    return { data: data };
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
  @ApiBody({ type: UpdateInventoryDto })
  @Patch(':id')
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    let data;
    try {
      data = await this.inventoryService.update(id, updateInventoryDto);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    return { data: data };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiInternalServerErrorResponse({
    type: HttpException,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
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
  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId) {
    let data;
    try {
      data = await this.inventoryService.remove(id);
    } catch (e) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }

    if (data === false) {
      throw new HttpException(
        'update unsuccessful',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return { data: data };
  }
}
