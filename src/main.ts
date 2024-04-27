import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { envs } from './config';

import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('MainApp');
  const globalPrefix = 'api';

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new RpcCustomExceptionFilter());
  await app.listen(envs.port);
  logger.log(
    `🚀 Application is running on: http://localhost:${envs.port}/${globalPrefix}`,
  );
}
bootstrap();
