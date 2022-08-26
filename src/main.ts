import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Eliminar los campos que no estan validados
      transform: true, // Convierte los datos de la request al tipo correspondiente
      forbidNonWhitelisted: true, // Retorna un error si hay campos extras en la req
      transformOptions: {
        enableImplicitConversion: true, // Convierte los datos de la request de manera implicita
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  // Interceptors nos permite cambiar las request y las response
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  // app.useGlobalGuards(new ApiKeyGuard()); // Util cuando el Guard no utiliza dependency injection

  await app.listen(3000);
}
bootstrap();
