import { DynamicModule, Module, Provider } from '@nestjs/common';
import { KinesisProducerConfig } from '@twaice/node-kinesis-producer/build/main/lib/interfaces';

import { KinesisProducerModuleAsyncOptions, KinesisProducerOptionsFactory } from './kinesis-producer.interface';
import { KinesisProducerService } from './kinesis-producer.service';

@Module({
  providers: [KinesisProducerService],
  exports: [KinesisProducerService],
})
export class KinesisProducerModule {
  static register(options: KinesisProducerConfig): DynamicModule {
    return {
      module: KinesisProducerModule,
      providers: [{ provide: 'KINESIS_PRODUCER_CONFIG', useValue: options }],
    };
  }

  static registerAsync(options: KinesisProducerModuleAsyncOptions): DynamicModule {
    return {
      module: KinesisProducerModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options), ...(options.extraProviders || [])],
    };
  }

  private static createAsyncProviders(options: KinesisProducerModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: KinesisProducerModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: 'KINESIS_PRODUCER_CONFIG',
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: 'KINESIS_PRODUCER_CONFIG',
      useFactory: async (optionsFactory: KinesisProducerOptionsFactory) =>
        optionsFactory.createKinesisProducerOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
