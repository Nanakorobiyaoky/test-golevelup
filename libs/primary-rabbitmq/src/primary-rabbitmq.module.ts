import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PrimaryRabbitmqService } from '@app/primary-rabbitmq/primary-rabbitmq.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [PrimaryRabbitmqService],
  exports: [PrimaryRabbitmqService],
})
export class PrimaryRabbitmqModule {
  static register(token: string): DynamicModule {
    const providers = [
      {
        provide: token,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const USER = configService.get('RMQ_USER');
          const PASSWORD = configService.get('RMQ_PASSWORD');
          const HOST = configService.get(`RMQ_HOST`);
          const PORT = configService.get(`RMQ_PORT`);
          const QUEUE = configService.get(`RMQ_${token}_QUEUE`);

          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${USER}:${PASSWORD}@${HOST}:${PORT}/`],
              queue: QUEUE,
              queueOptions: {
                durable: true,
              },
            },
          });
        },
      },
    ];

    return {
      module: PrimaryRabbitmqModule,
      providers,
      exports: providers,
    };
  }
}
