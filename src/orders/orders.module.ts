import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ORDERS_SERVICE, envs } from 'src/config';

import { OrdersController } from './orders.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDERS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ordersMsHost,
          port: envs.ordersMsPort,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
