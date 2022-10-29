import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from './typeorm/typeormConfig.service';
import { TypeormService } from './typeorm/typeorm.service';
import { Product } from './model/product.entity';
import { Item } from './model/item.entity';
import { Order } from './model/order.entity';
import { User } from './model/user.entity';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.local.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
    }),
    TypeOrmModule.forFeature([Product, Item, Order, User]),
  ],
  providers: [TypeormService],
  exports: [TypeormService, TypeOrmModule],
})
export class SharedModule {}
