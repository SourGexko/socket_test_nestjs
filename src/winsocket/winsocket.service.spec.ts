import { Test, TestingModule } from '@nestjs/testing';
import { WinsocketService } from './winsocket.service';

describe('WinsocketService', () => {
  let service: WinsocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WinsocketService],
    }).compile();

    service = module.get<WinsocketService>(WinsocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
