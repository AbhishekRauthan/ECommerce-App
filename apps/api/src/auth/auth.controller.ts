import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { UserRegisterDTO } from '../dto/user.dto';
import { TypeormService } from '../shared/typeorm/typeorm.service';

@Controller('auth')
export class AuthController {
  constructor(private typeormService: TypeormService) {}

  @Post('/login')
  loginUser() {
    throw new NotImplementedException('Not Worked not it');
  }

  @Post('/register')
  async registerUser(@Body() userInfo: UserRegisterDTO) {
    const { email } = userInfo;
    const userExists = await this.typeormService.findUserByEmail(email);
    if (userExists) {
      throw new ConflictException(
        `User with email: '${email}' already exists!`
      );
    }
    return await this.typeormService.createUser(userInfo).catch(() => {
      throw new BadRequestException('Unable to create user');
    });
  }

  @Post('/admin/login')
  loginAdmin() {
    throw new NotImplementedException('Not Worked not it');
  }

  @Post('/admin/register')
  registerAdmin() {
    throw new NotImplementedException('Not Worked not it');
  }
}
