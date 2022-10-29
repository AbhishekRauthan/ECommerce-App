import { ArgumentMetadata } from '@nestjs/common';
import { UserDTO } from '../../dto/user.dto'
import { ValidationPipe } from './validation.pipe';

describe('ValidationPipe', () => {
  it('should give error', async () => {
    const target = new ValidationPipe();
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: UserDTO,
    };

    await target.transform(<UserDTO>{}, metadata).catch((err) => {
      expect(err.response.statusCode).toBe(400);
    });
  });
});
