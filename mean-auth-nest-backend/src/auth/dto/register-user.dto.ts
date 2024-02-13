import { IsEmail, IsString, MinLength } from 'class-validator';

/* este RegisterUserDto es muy similar o igual al create-user.dto.ts y ¿Por qué no se está colocando solo el create-user.dto.ts? Porque pueden ser similares o iguales pero la intención o finalidad es diferente y puede ser que también en un tiempo este RegisterUserDto pueda necesitar nuevas cosas entonces por eso desde un principio se hace por separada la lógica para a futuro no estar refactorizando mucho código */
/* también para hacer hincapié en que:
  - La parte de create-user.dto es la que está relacionada con un panel administrativo en caso se creara
  - La parte de register-user.dto se encarga únicamente del registro propio de usuarios

En un futuro, pudiera ser que desde el panel administrativo NO se requiera de una propiedad, pero a la hora de que un usuario se registre sí o sí cumpla esa propiedad. Ahí sería cuando si tenemos un único DTO, nos tocaría separar esa parte ya que están haciendo funciones diferentes, de ahí que aunque ahora mismo sean dos DTO's similares, como la finalidad de ambos es diferente, tenemos ambas lógicas separadas.
*/
export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @MinLength(6)
  password: string;
}
