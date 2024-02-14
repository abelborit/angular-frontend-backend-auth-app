/* DE ESTA FORMA NOS GENERA EL GUARD USANDO: nest generate gu auth/guards/auth --flat */
// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     return true;
//   }
// }

/* aquí lo trabajaremos solo con Promise<boolean> */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  /* inyectar el servicio de JwtService porque necesitamos verificar nuestro JWT porque ahí tenemos la información pero también podemos proporcionar que cuando se utilice este AuthGuard también podemos poner qué usuario es el que corresponde a ese Token  */
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  /* el context: ExecutionContext nos da el acceso a ver todo lo que es la petición que se está realizando */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    /* aquí del context: ExecutionContext podemos ver que tenemos la parte de la request que la está tomando directamente de la petición y ahí tenemos toda la información referente a la solicitud */
    const request = context.switchToHttp().getRequest();
    // console.log({ request });

    /* extraer el token usando el extractTokenFromHeader que es un método que se creó abajo según la documentación */
    const token = this.extractTokenFromHeader(request);

    /* se hará una validación de que si el token no existe entonces nos mandé un error controlado. Si no se le manda nada como argumento en el UnauthorizedException() nos dará un valor por defecto pero también podemos colocarle algún texto más descriptivo como se muestra en la imagen 4.4 y entonces con esta validación si el token no existe ya no entraría ni si quiera a la imagen 3.8 ni 3.9 ni 4.0 porque no habría token (donde la imagen 3.8 y 3.9 serían lo mismo porque ninguna tiene la configuración de protección de rutas) */
    if (!token) {
      throw new UnauthorizedException('There is no bearer token!!');
    }

    /* igual hay que hacer más validaciones porque hasta ahora solo acepta que se le mande un string pero no hay validación de firmas de token ni nada, es decir, que se puede mandar cualquier string y me daría la respuesta de forma correcta, por eso, se hará la validación de la firma */

    /* aquí se aconseja usar un try{} catch{} porque si no entonces jwtService.verifyAsync nos mandará un error por defecto en la terminal como en la imagen 4.7 y con el try{} catch{} podemos mandar un error más controlado */
    try {
      /* constante payload para extrar el payload usando jwtService.verifyAsync que es de tipo JwtPayload y que como argumento se le manda el token y también el secret que tiene la secret key que se creó en las variables de entorno. Entonces, si el token fue generado con la secret key que tenemos nos dará como resultado la imagen 4.5 pero si el token fue generado con la secret key diferente a la que le estamos mandando entonces nos dará un error como la imagen 4.6 */
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SEED,
      });

      /* si todo sale bien entonces nos regresará algo como { payload: { id: '65cb9f347005a1c42a32cb12', iat: 1707929675, exp: 1707951275 }} */
      // console.log({ payload });

      const user = await this.authService.findUserById(payload.id);
      if (!user) throw new UnauthorizedException('User does not exists!');
      /* se coloca esta validación del usuario activo ya que puede ser que por alguna razón en la base de datos queremos saber si el usuario está activo o no para saber si hay que retornarlo o no o para invalidar alguna petición, etc */
      if (!user.isUserActive)
        throw new UnauthorizedException('User is not active');

      /* asignar a la request en su propiedad user el valor del id que viene en el payload que es una forma de obtener el id en el controlador pero sería mejor tener todo el usuario como está abajo */
      // request['user'] = payload.id;

      /* si todo sale bien entonces la request['user'] será igual al user que le estoy colocando y con eso ya tendremos toda la información del usuario en le request en su propiedad user como en la imagen 4.8 */
      request['user'] = user;
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    /* como se ve en la imagen 3.9 no estamos mandando algún token en la petición por eso en la imagen 4.0 aparece como undefined. Luego en la imagen 4.1 estamos mandando el authorization que sea tipo Bearer Token y le estamos mandando el token que generamos al hacer el login de un usuario y por eso en la imagen 4.2 podemos ver una simulación de código de cómo sería mandándole con el Bearer Token al hacer una petición fetch y en la imagen 4.3 vemos que en la respuesta ya nos muestra el token con su valor correspondiente el cual es el token que le mandamos al hacer la petición desde postman */
    console.log({ token });

    /* aqui se podría colocar como return Promise.resolve(true); o sino también se podría colocar de frente como un true ya que al ser un método con async, es decir, un método asíncrono, entonces colocar return true; ya nos da un return que cumple con Promise<boolean> */
    // return Promise.resolve(true);
    return true;
  }

  /* el authorization es algo que técnicamente debería venir en los headers pero es algo opcional porque puede ser que venga o no entonces en vez de ponerlo request.headers.authorization?.split(' ') como está en la documentación lo pondremos entre llaves como request.headers['authorization']?.split(' ') para decirle que busque la propiedad authorization */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
