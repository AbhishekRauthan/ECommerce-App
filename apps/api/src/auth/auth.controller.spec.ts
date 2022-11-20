import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserLoginDTO, UserRegisterDTO } from '../dto/user.dto';
import { TypeormService } from '../shared/typeorm/typeorm.service';
import { Roles } from '../types/index.types';
import { AuthController } from './auth.controller';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<Record<string, unknown>>;
};

describe('AuthController', () => {
  let controller: AuthController;
  const typeormServiceMock: MockType<TypeormService> = {
    findUserByEmail: jest.fn(),
  };
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: TypeormService,
          useValue: typeormServiceMock,
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });
  describe('User Register Test', () => {
    it('should throw conflict error', async () => {
      const user: UserRegisterDTO = {
        email: 'test@example.com',
        name: 'test user',
        password: 'test_password',
        role: Roles.User,
      };
      typeormServiceMock.findUserByEmail = jest
        .fn()
        .mockImplementation(() => Promise.resolve(user));

      try {
        await controller.registerUser(user);
      } catch (error) {
        expect(error.response.message).toBe(
          "User with email: 'test@example.com' already exists!"
        );
      }
    });

    it('should throw bad request', async () => {
      const user: UserRegisterDTO = {
        email: 'test@example.com',
        name: 'test user',
        password: 'test_password',
        role: Roles.User,
      };
      typeormServiceMock.findUserByEmail = jest
        .fn()
        .mockImplementation(() => Promise.resolve(null));

      typeormServiceMock.createUser = jest
        .fn()
        .mockImplementation(() => Promise.reject(null));
      try {
        await controller.registerUser(user);
      } catch (error) {
        expect(error.response.message).toBe('Unable to create user');
      }
    });
  });

  describe('UserLogin Test', () => {
    it('should throw Not found Error', async () => {
      const user: UserLoginDTO = {
        email: 'test@example.com',
        password: 'test_password',
      };

      typeormServiceMock.userLogin = jest.fn().mockResolvedValue(null);
      try {
        await controller.loginUser(user);
      } catch (error) {
        expect(error.response.message).toBe('Not Found');
      }
    });
  });

  describe('User Register Admin Test', () => {
    it('should throw UnauthorizedException', async () => {
      const user: UserRegisterDTO = {
        email: 'test@example.com',
        name: 'test user',
        password: 'test_password',
        role: Roles.User,
      };
      typeormServiceMock.findUserByEmail = jest
        .fn()
        .mockImplementation(() => Promise.resolve(null));

      typeormServiceMock.createUser = jest
        .fn()
        .mockImplementation(() => Promise.reject(null));
      try {
        await controller.registerAdmin(user);
      } catch (error) {
        expect(error.response.message).toBe('Unable to create user');
      }
    });
  });
});
