import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { RmqOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';

@Injectable()
export class PrimaryRabbitmqService {
  constructor(private readonly configService: ConfigService) {}

  getMsConfig(token: string, durable?: boolean): RmqOptions {
    const USER = this.configService.get('RMQ_USER');
    const PASSWORD = this.configService.get('RMQ_PASSWORD');
    const HOST = this.configService.get('RMQ_HOST');
    const PORT = this.configService.get('RMQ_PORT');
    const QUEUE = this.configService.get(`RMQ_${token}_QUEUE`);

    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${USER}:${PASSWORD}@${HOST}:${PORT}`],
        queue: QUEUE,
        queueOptions: {
          durable: durable ?? true,
        },
      },
    };
  }
}
