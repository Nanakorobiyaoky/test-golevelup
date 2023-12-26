import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrimaryRabbitmqModule } from '@app/primary-rabbitmq';
import { Ms1Controller } from './ms1.controller';
import { Ms2Controller } from './ms2.controller';


@Module({
  imports: [
    ConfigModule,
    PrimaryRabbitmqModule.register('MS1'),
    PrimaryRabbitmqModule.register('MS2')
  ],
  controllers: [Ms1Controller, Ms2Controller],
  providers: [],
})
export class AppModule {}
