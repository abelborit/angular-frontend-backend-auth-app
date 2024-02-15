# Angular & TypeScript - Mean Auth Angular Frontend

---

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

Aquí conectaremos el Frontend (Angular) con el backend (Node + Nest) que hicimos anteriormente. También veremos:

- Functional Guards
  - Inyecciones de functional guards
- Manejo de autenticación
- Señales (signals) para tener una reactividad más controlada en la aplicación
  - Señales en el servicio
  - Señales de solo lectura (señales computadas)
- Efectos + Señales (signals)
- Manejo de errores
- SweetAlert
- Determinar estado de autenticación
- Manejo de JWTs
- Headers de petición Http

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- dotenv: https://www.npmjs.com/package/dotenv
  - `npm i -D dotenv`
- sweetalert2: https://sweetalert2.github.io/
  - Usando npm: `npm install sweetalert2`
  - Usando CDN:
    ```html
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    ```
- ejemplo

### \* NOTAS:

- Variables de entorno en Angular:

  - Angular maneja las variables de entorno con una carpeta `src/environments/environments.ts` donde se pueden crear diferentes archivos como `environments.ts` o `environments.prod.ts` o `environments.dev.ts` o etc. Al trabajarlo de esa forma se tendría que ir al archivo `angular.json` y configurar cuando estemos en producción y cuando estemos en desarrollo, etc.
  - Angular por defecto no trabaja o no hace uso de `.env` aunque hay formas o paquetes de terceros para poder usar el `.env` de forma directa en donde se necesitaría esa variable de entorno. En este caso al hacerlo de una forma personalizada, es decir, creando el `.env` y al colocarlo en el `.gitignore` para que no se suban esos archivos al repositorio (`.env` y `src/environments/environments.ts`), entonces se creará un nuevo script para que apartir de las varaibles del `.env` se cree un archivo `environments.ts` para poder utilizarlo en el proyecto.

    - Se creó `scripts/set-env.js` donde está el código de node que vamos a utilizar para crear la carpeta y archivo.
    - Se creó el script en package.json `"create-env": "node ./scripts/set-env.js",` para leer ese archivo creado el cual se correrá en la terminal como `npm run create-env`
    - Se actualizarán algunos scripts para no hacerlo de forma manual sino de forma automática:

      ### - Antes

      ```json
        "scripts": {
          "create-env": "node ./scripts/set-env.js",
          "start": "ng serve -o",
          "build": "ng build",
        },
      ```

      ### - Ahora

      ```json
        "scripts": {
          "create-env": "node ./scripts/set-env.js",
          "start": "npm run create-env & ng serve -o", // para desarrollo
          "build": "npm run create-env & ng build", // para producción
        },
      ```

---

# MeanAuthAngularFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
