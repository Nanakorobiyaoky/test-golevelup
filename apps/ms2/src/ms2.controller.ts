import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class Ms2Controller {

  @MessagePattern({cmd: 'ms2'})
  getHello(): string {
    return 'ms2'
  }

  @RabbitSubscribe({
    exchange: 'a',
    routingKey: 'a',
    queue: 'a'
  })
  a () {
    console.log('a ms2')
  }
}
