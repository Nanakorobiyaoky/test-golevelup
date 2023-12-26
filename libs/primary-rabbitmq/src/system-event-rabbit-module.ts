import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

export const RmqSystemEventsConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const USER = configService.get('RMQ_USER');
    const PASSWORD = configService.get('RMQ_PASSWORD');
    const HOST = configService.get(`RMQ_HOST`);
    const PORT = configService.get(`RMQ_PORT`);

    const uri = `amqp://${USER}:${PASSWORD}@${HOST}:${PORT}/`;

    return {
      exchanges: [
        {
          name: 'a',
          type: 'topic',
        },
      ],
      uri,
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true,
    };
  },
};

@Module({
  imports: [
    ConfigModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, RmqSystemEventsConfig),
  ],
  exports: [RabbitMQModule],
})
export class SystemEventRabbitModule {}
