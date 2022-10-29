import { Test, TestingModule } from '@nestjs/testing';
import { TypeormService } from '../shared/typeorm/typeorm.service';
import { ProductController } from './product.controller';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<Record<string, unknown>>;
};

describe('ProductController', () => {
  let controller: ProductController;
  const typeormServiceMock: MockType<TypeormService> = {
    findAllProducts: jest.fn(),
    findOneProduct: jest.fn(),
  };
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: TypeormService,
          useValue: typeormServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should throw bad request error', async () => {
    typeormServiceMock.findAllProducts = jest
      .fn()
      .mockImplementation(() => Promise.reject(null));
    try {
      await controller.getAllProducts();
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });

  it('should throw not found error', async () => {
    typeormServiceMock.findOneProduct = jest
      .fn()
      .mockImplementation(() => Promise.reject(null));
    try {
      await controller.getProductById(3);
    } catch (error) {
      expect(error.response.message).toBe(
        'Error! Unable to find product with id:3'
      );
    }
  });
});
