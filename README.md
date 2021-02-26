# NestJS Kinesis Producer

<p align="center">
  <img height="150" src="https://i.imgur.com/hSwxaLd.png" alt="Logo">
</p>

## Description

Kinesis Producer library for NestJS based on [Node-Kinesis-Producer](https://github.com/TWAICE/node-kinesis-producer).

## Installation

```bash
$ npm install @twaice/nestjs-kinesis-producer
```

## Usage

1. Register Module `KinesisProducerModule.register` for synchronous configuration or 
`KinesisProducerModule.registerAsync` Asynchronous configuration.

```typescript
import { HttpModule } from '@nestjs/common';
import { KinesisProducerModule } from '@twaice/nestjs-kinesis-producer';

@Module({
  imports: [
    KinesisProducerModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          streamName: configService.get<string>('streamName')
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [SampleController],
  providers: [SampleService],
  exports: [SampleService],
})
export class SampleModule {}
```

2. Use module in your service

```typescript
import { KinesisProducerService } from '@twaice/nestjs-kinesis-producer';

@Injectable()
export class KinesisAggregatorPublisher {
  constructor(private readonly kinesisPublisher: KinesisProducerService) {
  }
  
  async putDataIntoKinesis() {
    await this.kinesisPublisher.getProducer().putRecords([{
      Data: 'test-record'
    }]);
  }
}
```
