# Nest - Angular Frontend Backend Auth App

---

### \* PASOS A REALIZAR:

1. Colocar en la terminal `npm run start:dev` para levantar la aplicación del backend de Nest
2. Abrir Docker Desktop
3. Colocar en la terminal `docker compose up -d` para correr la configuración del archivo docker-compose.yml

### \* NOTAS:

- ¿Cuál es el motivo de los interceptores?

  - Los interceptores son utilizados para realizar tareas comunes y genéricas en las solicitudes HTTP, como añadir encabezados, manejar errores o realizar transformaciones en los datos de la respuesta. Aunque la solicitud pueda estar inicialmente configurada como se desea, los interceptores permiten agregar funcionalidades adicionales en todas las solicitudes o respuestas de manera centralizada, lo que mejora la modularidad y mantenibilidad del código al evitar la repetición de lógica en varios lugares.

  - Un ejemplo de uso de interceptores sería el de agregar un encabezado de autenticación a todas las solicitudes HTTP salientes. Supongamos que tienes un token de autenticación que debe ser enviado en cada solicitud. En lugar de añadir manualmente ese encabezado en cada solicitud, puedes crear un interceptor que lo haga automáticamente por ti. Esto simplifica tu código y garantiza que todas las solicitudes tengan el encabezado de autenticación adecuado, sin importar en qué parte de tu aplicación se realicen las llamadas HTTP.

- Diferencias entre mandar form-data vs x-www-form-urlencoded: se hicieron en ambos formatos en el body en Postman y la validación de los parametros que no existen no se aplica en el formato form-data, pero en x-www-form-urlencoded si dice que X parámetro no debe existir. ¿No debería aplicar las validaciones para todos los formatos como FormData, raw, etc?

  - La diferencia entre enviar datos en formato form-data y x-www-form-urlencoded radica en cómo se estructuran y envían los datos al servidor. Cuando se usa form-data, los datos se envían en un formato similar a un objeto FormData, lo que puede no activar ciertas validaciones de parámetros no existentes en el servidor. Por otro lado al usar x-www-form-urlencoded serializa los datos como una cadena codificada, lo que puede permitir al servidor aplicar las validaciones de parámetros de manera más efectiva. Las diferencias en la estructura de datos pueden llevar a que ciertas validaciones no se apliquen de la misma manera en ambos formatos, lo que podría explicar la disparidad y diferencia en la detección de parámetros no existentes.

---

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
