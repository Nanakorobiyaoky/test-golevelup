import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BaseProxy } from '@app/proxy';

@Controller('ms1')
export class Ms1Controller extends BaseProxy{
  @Inject('MS1')
  protected readonly client: ClientProxy;

  @Get()
  get() {
    return this.sendMessage({cmd: 'ms1'}, {})
  }
}
