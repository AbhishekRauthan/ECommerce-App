import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from './typeorm/typeormConfig.service';
import { TypeormService } from './typeorm/typeorm.service';
import { Product } from './model/product.entity';
import { Item } from './model/item.entity';
import { Order } from './model/order.entity';
import { User } from './model/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.stratergy';

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
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '30d' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [TypeormService, JwtStrategy],
  exports: [TypeormService, TypeOrmModule, JwtStrategy, JwtModule],
})
export class SharedModule {}
