import { Module } from '@nestjs/common';
import { JwtStrategy } from '../shared/jwt/jwt.stratergy';
import { TypeormService } from '../shared/typeorm/typeorm.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [TypeormService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
