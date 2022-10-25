import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TypeormService } from '../shared/typeorm/typeorm.service';

@Controller('product')
export class ProductController {
  constructor(private typeormService: TypeormService) {}

  @Get('/all')
  async getAllProducts() {
    return await this.typeormService.findAllProducts().catch(() => {
      throw new BadRequestException('Error! Bad request');
    });
  }

  @Get('/:id')
  async getProductById(@Param(new ParseIntPipe()) id: number) {
    return await this.typeormService.findOneProduct(id).catch(() => {
      throw new NotFoundException(
        `Error! Unable to find product with id:${id}`
      );
    });
  }
}
