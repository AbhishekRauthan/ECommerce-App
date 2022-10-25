import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeormService } from '../shared/typeorm/typeorm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [TypeormService],
  controllers: [ProductController],
})
export class ProductModule {}
