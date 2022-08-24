import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Eliminar los campos que no estan validados
      transform: true, // Convierte los datos de la request al tipo correspondiente
      forbidNonWhitelisted: true, // Retorna un error si hay campos extras en la req
    }),
  );
  await app.listen(3000);
}
bootstrap();
