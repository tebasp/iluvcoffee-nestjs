import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LogginMiddleware } from './middleware/loggin.middleware';

@Module({ providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }] })

// Aqui registramos los Middlewares
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogginMiddleware)
      .forRoutes({ path: 'coffees', method: RequestMethod.GET });
  }
}
