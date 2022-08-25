import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

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

  await app.listen(3000);
}
bootstrap();
