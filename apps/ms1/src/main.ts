import { NestFactory } from '@nestjs/core';
import { PrimaryRabbitmqService } from '@app/primary-rabbitmq';
import { Ms1Module } from './ms1.module';


async function bootstrap() {
  const app = await NestFactory.create(Ms1Module);

  const rmqService = app.get(PrimaryRabbitmqService);

  const msConfig = rmqService.getMsConfig('MS1');

  const ms1 = app.connectMicroservice(msConfig, {
    inheritAppConfig: true,
  });
  await ms1.listen();
  console.table({
    app: 'ms1',
    queue: msConfig.options.queue,
  });
}

bootstrap();
