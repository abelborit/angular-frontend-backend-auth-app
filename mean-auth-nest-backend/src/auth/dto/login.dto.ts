import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  /* se puede cambiar el valor de las opciones para que tenga un mensaje diferente pero en este caso lo dejaremos por defecto */
  @MinLength(6)
  password: string;
}
