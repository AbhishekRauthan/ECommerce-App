import { ArgumentMetadata } from '@nestjs/common';
import { UserRegisterDTO } from '../../dto/user.dto';
import { Roles } from '../../types/index.types';
import { ValidationPipe } from './validation.pipe';

describe('ValidationPipe', () => {
  const target = new ValidationPipe();
  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: UserRegisterDTO,
  };
  it('should give error', async () => {
    await target.transform(<UserRegisterDTO>{}, metadata).catch((err) => {
      expect(err.response.statusCode).toBe(400);
    });
  });

  it('should give no error', async () => {
    const user = {
      email: 'test@example.com',
      name: 'test_name',
      password: 'test_password',
      role: Roles.User,
    };
    await target.transform(user, metadata).then((data) => {
      expect(data).toEqual(user);
    });
  });

  it('should give error for role', async () => {
    const user = {
      email: 'test@example.com',
      name: 'test_name',
      password: 'test_password',
      role: 'not_role',
    };
    await target
      .transform(user, metadata)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);

        expect(err.response.statusCode).toBe(400);
      });
  });
});
