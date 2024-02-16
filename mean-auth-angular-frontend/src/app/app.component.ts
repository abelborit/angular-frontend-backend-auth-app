import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /* sabemos que toda la aplicación de Angular pasa por aquí ya que este es el componente principal de toda la aplicación, entonces la autenticación de mi aplicación es algo que se necesita en todo momento */
  private authService = inject(AuthService);
  private router: Router = inject(Router);

  /* para poder saber si estoy autenticado o no o en qué estado de autenticación me encuentro según el servicio, se podría crear como un _authStatus similar al que ya tiene el AuthService pero para qué repetir la misma lógica si eso ya lo podemos obtener del servicio directamente y para eso usaremos una propiedad/señal computada */
  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      /* aquí es false porque todavía no se ha terminado de checkear y aún no se validó la autenticación, es decir, no se sabe si está autenticado o no está autenticado */
      return false;
    }

    /* retornará un true si al final del proceso de validar la autenticación el usuario está autenticado o no está autenticado */
    return true;
  });

  /* tenemos que hacer una petición http cada que el componente se crea y se monta para poder validad si hay un token o no hay token en el localStorage y también si ese token es dado por el backend, lo cual nos dará un nuevo token y todo esto lo haremos usando un effect de Angular */
  public authStatusChangedEffect = effect(() => {
    console.log('authStatus:', this.authService.authStatus());

    switch (this.authService.authStatus()) {
      /* si estamos en el checking no queremos que haga nada por eso solo se coloca return, aquí se está esperando que termine la autenticación que es el punto inicial */
      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
    }
  });
}
