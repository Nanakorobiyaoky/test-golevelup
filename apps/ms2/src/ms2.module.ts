import { Module } from '@nestjs/common';
import { Ms2Controller } from './ms2.controller';
import { PrimaryRabbitmqModule } from '@app/primary-rabbitmq';

@Module({
  imports: [PrimaryRabbitmqModule],
  controllers: [Ms2Controller],
  providers: [],
})
export class Ms2Module {}
