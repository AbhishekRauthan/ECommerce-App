import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../model/product.entity';

@Injectable()
export class TypeormService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ) {}

  async findAllProducts(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async findOneProduct(id: number): Promise<Product> {
    return await this.productsRepository.findOneBy({ id });
  }
}
