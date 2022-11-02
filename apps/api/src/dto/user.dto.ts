import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
} from 'class-validator';
import { Roles } from '../types/index.types';

export class UserLoginDTO {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}

export class UserRegisterDTO extends UserLoginDTO {
  @IsString()
  name: string;

  @IsString()
  @IsDefined()
  @IsEnum(Roles)
  role: Roles;
}
