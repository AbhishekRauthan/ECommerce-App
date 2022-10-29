import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../product/product.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule, ProductModule,AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
