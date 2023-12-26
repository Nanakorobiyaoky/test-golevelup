import { NestFactory } from '@nestjs/core';
import { PrimaryRabbitmqService } from '@app/primary-rabbitmq';
import { Ms2Module } from './ms2.module';


async function bootstrap() {
  const app = await NestFactory.create(Ms2Module);

  const rmqService = app.get(PrimaryRabbitmqService);

  const msConfig = rmqService.getMsConfig('MS2');

  const ms2 = app.connectMicroservice(msConfig, {
    inheritAppConfig: true,
  });
  await ms2.listen();
  console.table({
    app: 'ms2',
    queue: msConfig.options.queue,
  });
}

bootstrap();
