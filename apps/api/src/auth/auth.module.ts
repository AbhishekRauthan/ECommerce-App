import { Module } from '@nestjs/common';
import { TypeormService } from '../shared/typeorm/typeorm.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [TypeormService],
  controllers: [AuthController],
})
export class AuthModule {}
