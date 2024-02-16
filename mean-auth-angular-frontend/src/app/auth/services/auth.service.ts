import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environments } from 'src/environments/environments';
import {
  AuthStatus,
  CheckTokenResponse,
  LoginResponse,
  RegisterResponse,
  User,
} from '../interfaces';

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

  constructor() {
    /* cada que se crea el servicio entonces mandamos a llamar a handleCheckAuthStatus el cual su funcionalidad es validar si hay un token o no hay token en el localStorage y si hay token entonces será enviado mediante los headers en su petición al backend y este backend nos regresará un nuevo token y de esa forma vamos a estar refrescando el token para poder hacer una sesión que se mantenga en el tiempo hasta hacer un logout o hasta que la validación del token se termine */
    this.handleCheckAuthStatus().subscribe();
  }

  /* aquí se hará esta función ya que se estaba repitiendo código y se hará de forma privada ya que esta función no saldrá de este servicio. Aquí se implementará el principio de DRY (Don't Repeat Your self) para evitar la duplicidad de código */
  private setUserAndAuthStatus(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('userToken', token);

    return true;
  }

  handleLogin(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password }; // el body que se mandará en el método Post al backend

    /* esta petición será de tipo LoginResponse que es lo que nos devuelve el backend al hacer la petición */
    /* si todo sale bien entonces primero se hará un tap() que es un efecto secundario que ahora lo usaremos para actualizar algunas propiedades. Luego usaremos un map() para cambiar el valor ya que el handleLogin nos pide retornar un observable que emita un boolean, entonces se puede colocar map(() => true) o map((httpResponse) => true) por si se quiere conocer o usar el httpResponse */
    return this.httpClient.post<LoginResponse>(url, body).pipe(
      /* aquí se está haciendo primero un tap() para asignar la data de la respuesta HTTP y luego un map() para retornar un true que es lo que pide la función handleLogin */
      // tap((httpResponse) => {
      //   // console.log({ httpResponse });
      //   this._currentUser.set(httpResponse.user);
      //   this._authStatus.set(AuthStatus.authenticated);
      //   localStorage.setItem('userToken', httpResponse.token);
      // }),
      // map(() => true),
      /* aquí se está usando un map() para poder retornar algo. Se está usando la función setUserAndAuthStatus que recibirá el usuario y el token y ahí se hará la asignación de la data de la respuesta HTTP y también retornará un valor boolean */
      map((httpResponse) => {
        return this.setUserAndAuthStatus(httpResponse.user, httpResponse.token);
      }),
      catchError((httpError) => {
        // console.log({ httpError });
        /* aquí se podría devolver un "return of(false)" ya que la función handleLogin nos pide que retornemos un observable que emite un boolean pero nosotros no queremos regresar solo un false sino que queremos regresar el error con su información para que al momento de suscribirnos podamos hacer un error controlado. Se pensaría que se puede colocar Observable<boolean | string> para que si todo sale bien entonces retorne un boolean pero si hay algún error entonces podamos devolver un string pero no lo haremos así porque lo que usaremos será el throwError() que es una función que tiene una función la cual nos retorna lo que salió mal al hacer la petición */
        return throwError(() => httpError.error.statusCode);
      })
    );
  }

  handleRegister(
    name: string,
    email: string,
    password: string
  ): Observable<boolean> {
    const url = `${this.baseUrl}/auth/register`;
    const body = { name, email, password }; // el body que se mandará en el método Post al backend

    /* esta petición será de tipo RegisterResponse que es lo que nos devuelve el backend al hacer la petición */
    /* si todo sale bien entonces primero se hará un tap() que es un efecto secundario que ahora lo usaremos para actualizar algunas propiedades. Luego usaremos un map() para cambiar el valor ya que el handleRegister nos pide retornar un observable que emita un boolean, entonces se puede colocar map(() => true) o map((httpResponse) => true) por si se quiere conocer o usar el httpResponse */
    return this.httpClient.post<RegisterResponse>(url, body).pipe(
      /* aquí se está haciendo primero un tap() para asignar la data de la respuesta HTTP y luego un map() para retornar un true que es lo que pide la función RegisterResponse */
      // tap((httpResponse) => {
      //   // console.log({ httpResponse });
      //   this._currentUser.set(httpResponse.user);
      //   this._authStatus.set(AuthStatus.authenticated);
      //   localStorage.setItem('userToken', httpResponse.token);
      // }),
      // map(() => true),
      /* aquí se está usando un map() para poder retornar algo. Se está usando la función setUserAndAuthStatus que recibirá el usuario y el token y ahí se hará la asignación de la data de la respuesta HTTP y también retornará un valor boolean */
      map((httpResponse) => {
        return this.setUserAndAuthStatus(httpResponse.user, httpResponse.token);
      }),
      catchError((httpError) => {
        console.log({ httpError });
        /* aquí se podría devolver un "return of(false)" ya que la función RegisterResponse nos pide que retornemos un observable que emite un boolean pero nosotros no queremos regresar solo un false sino que queremos regresar el error con su información para que al momento de suscribirnos podamos hacer un error controlado. Se pensaría que se puede colocar Observable<boolean | string> para que si todo sale bien entonces retorne un boolean pero si hay algún error entonces podamos devolver un string pero no lo haremos así porque lo que usaremos será el throwError() que es una función que tiene una función la cual nos retorna lo que salió mal al hacer la petición */
        return throwError(() => httpError.error.statusCode);
      })
    );
  }

  handleLogout() {
    localStorage.removeItem('userToken');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }

  handleCheckAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('userToken');

    if (!token) {
      /* FORMA 1: se puede cambiar el estado directamente a no autenticado */
      // this._authStatus.set(AuthStatus.notAuthenticated);

      /* FORMA 2: al tener el método handleLogout entonces se podría llamar directamente a ese método para reutilizar lógica que ya hay y hacer una mejor limpieza de los datos */
      this.handleLogout();
      return of(false);
    }

    /* si hay token entonces agregar el token en los headers para que el backend lo verifique */
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<CheckTokenResponse>(url, { headers }).pipe(
      /* aquí es otra forma de hacerlo donde se está usando de forma directa el map() para asignar la data de la respuesta HTTP y también para retornar un valor boolean */
      // map((httpResponse) => {
      //   // console.log({ httpResponse });
      //   this._currentUser.set(httpResponse.user);
      //   this._authStatus.set(AuthStatus.authenticated);
      //   localStorage.setItem('userToken', httpResponse.token);
      //   return true;
      // }),
      /* aquí se está usando un map() para poder retornar algo. Se está usando la función setUserAndAuthStatus que recibirá el usuario y el token y ahí se hará la asignación de la data de la respuesta HTTP y también retornará un valor boolean */
      map((httpResponse) => {
        return this.setUserAndAuthStatus(httpResponse.user, httpResponse.token);
      }),
      catchError((httpError) => {
        // console.log({ httpError });
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
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

/*
PREGUNTA: ¿Cómo funciona el pipe map()?

RESPUESTA: El pipe map() de RxJs es parecido a cómo funciona el .map() en un array en JavaScript, como por dar un ejemplo de similitud. Realmente el pipe map() nos devuelve un parámetro que es el valor que tenemos en ese momento, y que podemos usar para modificarlo/transformarlo. En el código, realmente la propia data que tenemos nos es indiferente a la hora de devolverla, ya que toda la lógica que necesitamos la realizamos en el tap y ahí ya guardamos y asignamos la información. En este caso usamos el map para que la respuesta que devolvamos del método handleLogin, una vez se resuelva, sea el valor true para indicar que todo funcionó correctamente, ya que es la lógica que estamos implementando.

Ahora, el map como lo usamos aquí, se puede usar para devolver simplemente lo que uno quiera sin tener en cuenta el valor que tenemos en ese momento como estamos haciendo ahora que si pasó el tap y no obtuvo ningún error, simplemente estamos indicando que handleLogin() devuelva un valor true.

En resumen, el operador map() nos devuelve un parámetro con el valor actual en ese momento, que podemos usar o no, y eso será lo que retornará nuestro observable. Realmente si no usamos el parámetro que nos proporciona el map, se puede devolver cualquier otra data, pero tiene que tener sentido para la lógica que estamos implementando.
*/
