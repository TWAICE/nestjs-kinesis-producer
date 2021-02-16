import { Module } from '@nestjs/common';
import { KinesisProducerService } from './kinesis-producer.service';

@Module({
  providers: [KinesisProducerService],
  exports: [KinesisProducerService],
})
export class KinesisProducerModule {}
