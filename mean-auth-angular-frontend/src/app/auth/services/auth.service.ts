import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environments } from 'src/environments/environments';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  /* si nos queremos asegurar que nadie pueda usar ni modificar una propiedad de este servicio ni incluso el mismo servicio pueda modificar una propiedad se puede colocar como readonly */
  private readonly baseUrl: string = environments.base_url;
  private httpClient = inject(HttpClient);

  /* en alguna parte del tiempo mi usuario será null por eso se coloca que puede ser tipo User o null */
  private _currentUser = signal<User | null>(null);

  /* la primera vez que se monta el servicio el estado de autenticación es de verificación o checking */
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  /* aquí se coloca de nuevo currentUser pero como propiedad pública ya que esta será la propiedad que se pueda usar afuera de este servicio. Arriba se colocó como privado el _currentUser ya que se quiere que la señal trabaje solo para el servicio y que nadie afuera de la señal pueda modificarla directamente */
  /* aquí se está usando una señal computada, es decir, que sea de solo lectura para que no se pueda modificar o mutar */
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {}

  handleLogin(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password }; // el body que se mandará en el método Post al backend

    /* esta petición será de tipo LoginResponse que es lo que nos devuelve el backend al hacer la petición */
    /* si todo sale bien entonces primero se hará un tap() que es un efecto secundario que ahora lo usaremos para actualizar algunas propiedades. Luego usaremos un map() para cambiar el valor ya que el login nos pide retornar un observable que emita un boolean, entonces se puede colocar map(() => true) o map((response) => true) por si se quiere conocer o usar el response */
    return this.httpClient.post<LoginResponse>(url, body).pipe(
      tap((response) => {
        console.log(response);
        this._currentUser.set(response.user);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('userToken', response.token);
      }),
      map(() => true)
    );
  }
}

/* ************************************************************************************************************************ */
/*
PREGUNTA: ¿URI o URL son lo mismo?

RESPUESTA: A menudo se utilizan indistintamente, aunque existe una diferencia técnica entre URI (Identificador Uniforme de Recursos) y URL (Localizador de Recursos Uniforme).

- Una URL es un subconjunto de URI que especifica la dirección de un recurso en la web.
- Una URI es un término más amplio que también abarca identificadores no necesariamente ligados a la localización, como identificadores de nombres.

Normalmente, se suele utilizar el término URL para hacer referencia a las direcciones web, pero en un contexto más específico, se podría decir que todas las URLs son URIs, pero no todas las URIs son URLs.

  REVISAR: https://www.hostinger.es/tutoriales/uri-vs-url
  REVISAR: https://danielmiessler.com/p/difference-between-uri-url/
*/
