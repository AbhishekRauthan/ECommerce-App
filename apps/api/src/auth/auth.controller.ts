import { Controller, NotImplementedException, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('/login')
  loginUser() {
    throw new NotImplementedException('Not Worked not it');
  }

  @Post('/register')
  registerUser() {
    throw new NotImplementedException('Not Worked not it');
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
