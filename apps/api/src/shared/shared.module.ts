import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from './typeorm/typeormConfig.service';
import { TypeormService } from './typeorm/typeorm.service';
import { Product } from './model/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.local.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
    }),
    TypeOrmModule.forFeature([Product])
  ],
  providers: [TypeormService],
  exports:[TypeormService]
})
export class SharedModule {}
