import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class Ms1Controller {

  constructor(private readonly connection: AmqpConnection) {}
  @MessagePattern({cmd: 'ms1'})
  getHello(): string {

    this.connection.publish('a', 'a', {})

    return 'ms1'
  }

  @RabbitSubscribe({
    exchange: 'a',
    routingKey: 'a',
    queue: 'a'
  })
  a () {
    console.log('a ms1')
  }
}
