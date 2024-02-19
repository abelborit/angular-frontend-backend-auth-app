import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* habilitar el CORS */
  app.enableCors();

  /* esta configuración dice: vamos a hacer muy restringido nuestro backend, es decir, tienen que mandarme la información correcta como se configuró y como se espera y si no entonces no se acepta y se rechaza */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
