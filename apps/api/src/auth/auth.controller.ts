import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO, UserRegisterDTO } from '../dto/user.dto';
import { User } from '../shared/model/user.entity';
import { TypeormService } from '../shared/typeorm/typeorm.service';
import { Roles } from '../types/index.types';

@Controller('auth')
export class AuthController {
  constructor(
    private typeormService: TypeormService,
    private jwtService: JwtService
  ) {}

  returnUserDetails(user: User) {
    return {
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      role: user.getRole(),
      token: this.jwtService.sign({ id: user.getId() }),
    };
  }

  @Post('/login')
  @Post('/admin/login')
  async loginUser(@Body() userInfo: UserLoginDTO) {
    const { email, password } = userInfo;

    const user = await this.typeormService.userLogin(email, password);

    if (!user) {
      throw new NotFoundException(`User of email: '${email}' not found`);
    }
    return this.returnUserDetails(user);
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
    const user = await this.typeormService.createUser(userInfo).catch(() => {
      throw new BadRequestException('Unable to create user');
    });

    return this.returnUserDetails(user);
  }

  @Post('/admin/register')
  async registerAdmin(@Body() userInfo: UserRegisterDTO) {
    const { email, role } = userInfo;
    if (role !== Roles.Admin) {
      throw new UnauthorizedException('Need to be admin');
    }
    const userExists = await this.typeormService.findUserByEmail(email);
    if (userExists) {
      throw new ConflictException(
        `User with email: '${email}' already exists!`
      );
    }
    const user = await this.typeormService.createUser(userInfo).catch(() => {
      throw new BadRequestException('Unable to create user');
    });

    return this.returnUserDetails(user);
  }
}
