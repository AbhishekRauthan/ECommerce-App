import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeormService } from '../shared/typeorm/typeorm.service';

@Module({
  providers: [TypeormService],
  controllers: [ProductController],
})
export class ProductModule {}
