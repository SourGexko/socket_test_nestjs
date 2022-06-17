import { Test, TestingModule } from '@nestjs/testing';
import { WinsocketController } from './winsocket.controller';

describe('WinsocketController', () => {
  let controller: WinsocketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WinsocketController],
    }).compile();

    controller = module.get<WinsocketController>(WinsocketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
