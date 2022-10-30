import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from '../model/order.entity';
import { Product } from '../model/product.entity';
import { User } from '../model/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRegisterDTO } from '../../dto/user.dto';

@Injectable()
export class TypeormService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findAllProducts(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async findOneProduct(id: number): Promise<Product> {
    return await this.productsRepository.findOneBy({ id });
  }

  findByProductIds(ids: string[]): Promise<Product[]> {
    return this.productsRepository.findBy({ id: In(ids) });
  }

  createOrUpdateProduct(product: Product): Promise<Product> {
    return this.productsRepository.save(product);
  }

  async removeProduct(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }

  createOrUpdateOrder(order: Order): Promise<Order> {
    return this.ordersRepository.save(order);
  }

  findByUserId(id: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: {
        user: { id: id },
      },
      relations: ['items', 'items.product'],
    });
  }

  async createUser(user: UserRegisterDTO): Promise<User> {
    const { email, name, password, role } = user;
    const hash = await bcrypt.hash(password, 10);
    return this.usersRepository.save({ email, name, password: hash, role });
  }

  async updateUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async userLogin(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.getPassword());
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  findOneUser(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  updateBalance(id: number, balance: number) {
    return this.usersRepository.update(id, { balance: balance });
  }
}
