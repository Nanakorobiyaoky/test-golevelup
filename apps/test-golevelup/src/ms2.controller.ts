import { Controller, Get, Inject } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { BaseProxy } from '@app/proxy';

@Controller('ms2')
export class Ms2Controller extends BaseProxy{

  @Inject('MS2')
  protected readonly client: ClientProxy;

  @Get()
  get() {
    return this.sendMessage({cmd: 'ms2'}, {})
  }
}
