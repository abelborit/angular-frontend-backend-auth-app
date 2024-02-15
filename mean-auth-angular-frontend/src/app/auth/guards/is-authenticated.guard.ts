import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  // console.log('isAuthenticatedGuard');
  // console.log({ route, state });

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }

  /* esta es la url a donde el usuario quiere ir */
  // const url = state.url;
  // localStorage.setItem('url', url);
  router.navigateByUrl('/auth/login');

  return false;
};
