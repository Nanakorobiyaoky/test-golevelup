import { Module } from '@nestjs/common';
import { Ms1Controller } from './ms1.controller';
import { PrimaryRabbitmqModule, SystemEventRabbitModule } from '@app/primary-rabbitmq';

@Module({
  imports: [PrimaryRabbitmqModule, SystemEventRabbitModule],
  controllers: [Ms1Controller],
  providers: [],
})
export class Ms1Module {}
