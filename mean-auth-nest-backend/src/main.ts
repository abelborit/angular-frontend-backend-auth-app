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

  /* La razón por la que no se especifica el puerto en las variables de entorno es que el servidor de hosting donde se despliega la aplicación ya proporciona una variable de entorno llamada PORT que indica en qué puerto se está ejecutando el servidor. Esto es común en muchos servicios de hosting y plataformas en la nube. El servidor de hosting se encarga de asignar un puerto disponible y luego comunica ese puerto a la aplicación a través de la variable de entorno PORT. De esta manera, la aplicación puede adaptarse dinámicamente al puerto asignado por el servidor sin necesidad de que el usuario especifique un puerto fijo en las variables de entorno. */
  const PORT = process.env.PORT ?? 3000;
  console.log(`App is running in the port ${PORT}`);

  await app.listen(PORT);
}
bootstrap();
