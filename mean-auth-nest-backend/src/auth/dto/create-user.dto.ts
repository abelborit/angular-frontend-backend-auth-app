/* esta vendría a ser una simple clase pero los DTO son, por ejemplo, al estar haciendo una petición POST y enviar data desde el frontend al backend, esa data viene a ser atrapado en Nest mediante los DTO. Entonces la idea de los DTO es decirle a Nest o que Nest tenga una manera de saber qué data esperar */
/* si se estuviera trabajando con Express directamente se tendrían que hacer todas las validaciones manualmente, las configuraciones manualmente y los middleware necesarios para saber qué data esperar */
import { IsEmail, IsString, MinLength } from 'class-validator';

/*
  - Middleware: es todo software que se sitúa entre el sistema operativo y las aplicaciones que corren sobre él. Este funciona como una capa de traducción que posibilita la comunicación y la administración de datos en aplicaciones distribuidas.
  - Aplicaciones distribuidas: aplicaciones con distintos componentes que se ejecutan en entornos separados que normalmente en diferentes plataformas conectadas a través de una red.
*/
export class CreateUserDto {
  /* ¿Qué información se necesita para crear un usuario en la base de datos? Podemos revisar nuestra entidad user.entity.ts para tener una mejor referencia. En este caso solo se utilizará  email, name, password porque el isUserActive está por defecto en true y roles para este caso se le podría preguntar al usuario para que ellos den el rol pero eso es algo que se configurará después */

  /* se pueden colocar algunos decoradores de Class Validator que es la dependencia que se instaló para hacer algunas validaciones adicionales */
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @MinLength(6)
  password: string;
}
