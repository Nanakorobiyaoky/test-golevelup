import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const PORT = +configService.get('GATEWAY_PORT_INTERNAL');

  await app.listen(PORT, () => {
    console.table({
      app: 'gateway',
      port: PORT,
    });
  });
}

bootstrap();
