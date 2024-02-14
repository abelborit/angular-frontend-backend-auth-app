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
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  /* inyectar el servicio de JwtService porque necesitamos verificar nuestro JWT porque ahí tenemos la información pero también podemos proporcionar que cuando se utilice este AuthGuard también podemos poner qué usuario es el que corresponde a ese Token  */
  constructor(private jwtService: JwtService) {}

  /* el context: ExecutionContext nos da el acceso a ver todo lo que es la petición que se está realizando */
  canActivate(context: ExecutionContext): Promise<boolean> {
    /* aquí del context: ExecutionContext podemos ver que tenemos la parte de la request que la está tomando directamente de la petición y ahí tenemos toda la información referente a la solicitud */
    const request = context.switchToHttp().getRequest();
    // console.log({ request });

    /* extraer el token usando el extractTokenFromHeader que es un método que se creó abajo según la documentación */
    const token = this.extractTokenFromHeader(request);
    /* como se ve en la imagen 3.9 no estamos mandando algún token en la petición por eso en la imagen 4.0 aparece como undefined. Luego en la imagen 4.1 estamos mandando el authorization que sea tipo Bearer Token y le estamos mandando el token que generamos al hacer el login de un usuario y por eso en la imagen 4.2 podemos ver una simulación de código de cómo sería mandándole con el Bearer Token al hacer una petición fetch y en la imagen 4.3 vemos que en la respuesta ya nos muestra el token con su valor correspondiente el cual es el token que le mandamos al hacer la petición desde postman */
    console.log({ token });

    return Promise.resolve(true);
  }

  /* el authorization es algo que técnicamente debería venir en los headers pero es algo opcional porque puede ser que venga o no entonces en vez de ponerlo request.headers.authorization?.split(' ') como está en la documentación lo pondremos entre llaves como request.headers['authorization']?.split(' ') para decirle que busque la propiedad authorization */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
