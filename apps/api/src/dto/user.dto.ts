import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
} from 'class-validator';
import { Roles } from '../types/index.types';

export class UserRegisterDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsString()
  @IsDefined()
  @IsEnum(Roles)
  role: Roles;
}
