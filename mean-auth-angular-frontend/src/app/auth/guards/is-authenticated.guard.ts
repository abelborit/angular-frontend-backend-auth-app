import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  // console.log('isAuthenticatedGuard');
  // console.log({ route, state });

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  /* validar si el estado de autenticación está en checking para que retorne un false ya que si no se hace esta validación sucede el problema de redireccionar al usuario a la ruta de /auth/login porque:
    1. en cualquier momento al entrar a la aplicación el usuario se encuentra en el authStatus de checking
    2. este guard se ejecuta al momento de entrar a la ruta de dashboard
    3. si el usuario está logueado y ya se encuentra en la ruta de dashboard entonces al refrescar la página (ya estando en la ruta de dashboard) veremos que en la consola nos lanza primero un authStatus de checking y luego un authStatus de authenticated pero como el guard entra en ejecución al cargar la ruta de dashboard entonces nos redirecciona al /auth/login porque en una primera isntancia el authStatus fue de checking

    Entonces al hacer esta validación y que nos retorne un false podemos mantenernos en la ruta de dashboard al refrescar la página de dashboard si estamos logueados, pero si al final de cuentas pasa del authStatus de checking al authStatus de notAuthenticated entonces nos redireccionará sí o sí al /auth/login
  */
  /* al final de cuentas ya no sería necesario usar esta validación */
  // if (authService.authStatus() === AuthStatus.checking) {
  //   return false;
  // }

  /* si el authStatus es authenticated entonces nos retornará un true */
  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }

  /* esta es la url a donde el usuario quiere ir */
  // const url = state.url;
  // localStorage.setItem('url', url);

  /* si al final del proceso de autenticación se sabe que el usuario no está autenticado entonces recién hará la redirección al /auth/login */
  router.navigateByUrl('/auth/login');

  return false;
};
