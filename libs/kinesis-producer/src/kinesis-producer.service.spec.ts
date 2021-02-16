import { Test, TestingModule } from '@nestjs/testing';
import { KinesisProducerService } from './kinesis-producer.service';

describe('KinesisProducerService', () => {
  let service: KinesisProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KinesisProducerService],
    }).compile();

    service = module.get<KinesisProducerService>(KinesisProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
