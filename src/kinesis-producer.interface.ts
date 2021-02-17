import { ModuleMetadata, Provider, Type } from '@nestjs/common';
import { KinesisProducerConfig } from '@twaice/node-kinesis-producer';

export interface KinesisProducerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<KinesisProducerOptionsFactory>;
  useClass?: Type<KinesisProducerOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<KinesisProducerConfig> | KinesisProducerConfig;
  inject?: any[];
  extraProviders?: Provider[];
}

export interface KinesisProducerOptionsFactory {
  createKinesisProducerOptions(): Promise<KinesisProducerConfig> | KinesisProducerConfig;
}
