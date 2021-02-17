import { Inject, Injectable, Logger } from '@nestjs/common';
import { KinesisProducer, KinesisProducerConfig } from '@twaice/node-kinesis-producer';

@Injectable()
export class KinesisProducerService {
  private _kinesisProducer: KinesisProducer;
  @Inject('KINESIS_PRODUCER_CONFIG') private _config: KinesisProducerConfig;

  getProducer(): KinesisProducer {
    if (!this._kinesisProducer) {
      if (this._config.loggingEnabled) {
        if (!this._config.logger) {
          this._config.logger = new Logger(KinesisProducerService.name);
        }
      }
      this._kinesisProducer = new KinesisProducer(this._config);
    }
    return this._kinesisProducer;
  }
}
