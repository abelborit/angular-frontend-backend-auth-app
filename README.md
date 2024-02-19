# Angular Frontend Backend Auth App

---

### - Tecnologías usadas:

- #### Angular (Frontend)
- #### Nest (Backend)

---

### - Algunas explicaciones sobre nuestro backend con Nest

- https://nestjs.com/

- Nest es un framework muy similar a Angular, está fuertemente inspirado en Angular pero para el lado de backend. Se trabaja de una forma similar que con Angular en cuanto a servicios y la parte modular, es básicamente lo mismo, algunos dicen que Nest es el Angular del backend ya que comparten similitudes a la hora de trabajar.

- Se puede instalar de manera global para poder ejecutar comandos desde la terminal y para eso hay que abrir la terminal como administrador y colocar `npm i -g @nestjs/cli` y luego crear el proyecto usando `nest new project-name` en la ruta que queremos usar nest.

- Al hacer una app con el MEAN Stack es usando MongoDB y Nest se acopla bien a MongoDb pero lo más probable es que no tengamos ninguna base de datos MongoDb instalada en nuestra laptop, PC, etc, hay muchas formas de poder instalarla, ir a la documentación y seguir los pasos, etc. pero en esta oportunidad usaremos Docker y para eso es necesario tener Docker Desktop instalado y para usuarios de Windows es necesario tener instalado también WSL 2 (es la forma de poder ejecutar sistemas Linux dentro de Windows de ahí su nombre de Windows Subsystem for Linux)

  - Docker es una plataforma de software de código abierto para automatizar despliegues de aplicaciones dentro de contenedores, y proporciona una forma eficaz de controlar versiones, agilizar el desarrollo y es una pieza fundamental para Kubernetes. Poder crear, usar, y desplegar imágenes es una habilidad necesaria para cualquier desarrollador o administrador de hoy en día, ahorra mucho tiempo en la preparación de diferentes ambientes de desarrollo, testing, staging y production.

  - Docker Hub: https://hub.docker.com/

    - En Docker Hub tenemos una gran variedad de "repositorios" entre comillas porque en Docker en este caso se usa el término de imágenes donde ya tiene todo lo necesario para poder correr ya sean bases de datos, aplicaciones completas, etc. Si buscamos Mongo (https://hub.docker.com/search?q=mongo) veremos una gran cantidad de imágenes donde tendremos que revisar el que necesitaemos pero en este caso veremos que hay muchos. Otra forma es colocar en el buscador y seleccionar la primera opción de mongo, que debería ser el oficial, y si no entonces entrar a https://hub.docker.com/_/mongo veremos que son Imágenes Docker Oficiales la cual esa etiqueta o tag se lo colocó la gente de Docker Hub porque esa imagen sigue los lineamientos y buenas prácticas de la gente de Docker.

    - El beneficio de usar Docker es que según sea la versión que necesite de algo por ejemplo en este caso de MongoDB entonces puedo seleccionar una versión que necesite y ya instantáneamente tengo en mi laptop o pc funcionando para evitar hacer los pasos de instalarla manualmente (instalación manual de MongoDB y Mongo Compass: https://www.youtube.com/watch?v=eKXIxSZrJfw&ab_channel=UskoKruM2010), o borrar todo y montar todo de nuevo lo cual con Docker me facilita ese proceso y el evitar impactar mi laptop o pc físicamente.

    - Pasos a seguir:

      - Es necesario tener instalado MongoDB Compass que es un gestor visual para poder conectarnos a la base de datos de MongoDB para poder ver la base de datos, manipularla, etc.

      - Es necesario tener Docker Desktop corriendo y que nos aparezca algo similar a `Engine running` en la esquina inferior izquierda para saber que todo está bien y Docker está ejecutándose correctamente.

- Ahora, en el proyecto `mean-auth-nest-backend` idealmente necesitamos un comando para poder subir la base de datos, bajar la base de datos, reiniciar la base de datos y mantener en mi file system mi base de datos y para eso vamos a usar Docker Compose que es una herramienta instalada en Docker que nos facilita mucho la ejecución de comandos para que no todo lo hagamos manualmente desde la terminal. Para eso entonces crearemos un archivo `docker-compose.yml`

  - Luego de realizar toda la configuración y montar la imagen de Docker como se ven en los screenshots, veremos que en el directorio `mean-auth-nest-backend` se creó la carpeta `mongo` ya que se montó el contenedor y vió que no existía el directorio mongo entonces lo creó para hacer el mapeo como se configuró en el `docker-compose.yml`. Entonces `./mongo:/data/db` lo que hará es mapear esa carpeta mongo (./mongo) con el contenedor (/data/db) y con eso la información va a ser persistente así se borre o destruya el contenedor ya que la base de datos ya está en la carpeta mongo y usualmente a esa carpeta de mongo no se querrá dar un seguimiento o que se suba a algún repositorio por eso en el `.gitignore` se coloca `mongo/`

  - Ahora, para corroborar que todo está funcionando (muy aparte de ver el color verde en Docker Desktop) hay que ir a Mongo Compass y en la URI colocar `mongodb://localhost:27017` (puede ser que ya está colocado al momento de abrir Mongo Compass) y luego hay que conectar y con eso ya estaríamos conectados a la base de datos.

- Para conectar Nest con nuestra base de datos que en este caso sería MongoDB seguiremos esta documentación https://docs.nestjs.com/techniques/mongodb

  - `npm i @nestjs/mongoose mongoose` donde mongoose es la url para poder trabajar con Mongo fácilmente, es decir, no vamos a usar querys sino vamos a utilizar métodos por ejemplo de traer todos los usuarios que coincidan con un correo electrónico X. En pocas palabras es un forma fácil de poder trabajar con la base de datos sin escribir querys (aunque también si deseamos lo podemos hacer con querys)
  - NOTA: estamos usando variables de entorno entonces para usarlas debemos instalar `npm i @nestjs/config` y una vez que coloquemos `ConfigModule.forRoot(),` en los imports de app.module.ts ya tenemos la configuración para colocar variables de entorno. (puede que sea necesario bajar la terminal y volverla a levantar para que tome los últimos cambios de las variables de entorno)

- Formas para crear la base de datos: https://docs.nestjs.com/techniques/mongodb

  - Una forma podría ser la manual e ir a Mongo Compass y en Databases crearemos una nueva base de datos la cual el nombre tiene que ir en la variable de entorno `MONGO_URI=mongodb://localhost:27017/my-app-database` para poder conectarla donde en este caso el nombre de la base de datos será `mean-mongo-database` quedando todo como `MONGO_URI=mongodb://localhost:27017/mean-mongo-database`.

  - Otra forma sería crearlo bajo demanda y con nuestro código, es decir, tener seleccionado un nombre para la base de datos como `mean-mongo-database` y luego colocarlo en la variable de entorno como en el paso anterior para que quede exactamente igual a `MONGO_URI=mongodb://localhost:27017/mean-mongo-database` pero de esta forma al ir a Mongo Compass veremos que todo sigue igual sin esa base de datos creada pero lo importante que tiene la instalación hecha del ORM de `Mongoose`, que ya lo tenemos conectado, es que irá creando todo bajo demanda, es decir, mientras nosotros lo vayamos necesitando lo irá creando (lo que a diferencia de las bases de datos relacionales tradicionales es que nosotros podemos ir creando objetos que van a ir almacenándose en un elemento llamado colección que sería como una tabla que son similares pero no iguales, y dentro de estas colecciones tenemos documentos los cuales son objetos JSON como los que trabajamos usualmente)

    - ORM: Sus siglas significan Object Relational Mappig (mapeo relacional de objetos) y su función es abstraer la base de datos, de modo que nosotros como programadores puedamos hacer consultas sin conocer SQL, y en su lugar, seguir usando el lenguaje de programación que ya conocemos. Lo que hace un ORM es mapear las bases de datos a objetos (por eso su nombre) y estos objetos tendrán métodos para interactuar con ellos y hacer el CRUD sin comunicarnos directamente a la base de datos.

- Ahora tenemos que empezar a trabajar la estructura de cómo queremos grabar nuestra data y para eso lo haremos mediante `entidades` o `entities`. El concepto de una entidad está bien relacionado al nombre de la tabla donde nosotros vamos a grabar e insertar registros. En la entidad de auth.entity.ts la re-nombraremos a user.entity.ts y su clase en vez de Auth ahora será User, luego crearemos el esquema/schema y sus propiedades que usaremos en la base de datos y al finalizar todo iremos a Mongo Compass y recargaremos la interfaz gráfica y técnicamente tendría que aparecer la nueva base de datos que creamos (puede ser que no aparezca nada aún ni al refrescar la interfaz gráfica pero al momento de ya insertar datos en base de datos ya tendría que sí o sí aparecer)

- Dentro de Nest hay un concepto que ya forma de él hace mucho tiempo, casi desde sus raíces, que son los DTO (Data Transfer Object) Los DTO son, por ejemplo, al estar haciendo una petición POST y enviar data desde el frontend al backend, esa data viene a ser atrapado en Nest mediante los DTO. Entonces la idea de los DTO es decirle a Nest o que Nest tenga una manera de saber qué data esperar. Si se estuviera trabajando con Express directamente se tendrían que hacer todas las validaciones manualmente, las configuraciones manualmente y los middleware necesarios para saber qué data esperar.

  - NOTA:

    - Middleware: es todo software que se sitúa entre el sistema operativo y las aplicaciones que corren sobre él. Este funciona como una capa de traducción que posibilita la comunicación y la administración de datos en aplicaciones distribuidas.

    - Aplicaciones distribuidas: aplicaciones con distintos componentes que se ejecutan en entornos separados que normalmente en diferentes plataformas conectadas a través de una red.

  - Ahora hay que configurar los DTO para recibir la data correcta desde mi frontend al backend pero para eso hay que hacer validaciones y es necesario instalar `npm i class-validator class-transformer` y también hay que hacer una configuración global main.ts:

  ```ts
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  ```

- Ahora toca crear un registro de la base de datos y para eso tenemos que hacer la inyección de nuestro modelo en el servicio, en este caso será en auth.service.ts, para poder trabajar con la base de datos y hacer su registro correspondiente. Darse cuenta que si se manda un usuario y luego se quiere volver a mandar el mismo usuario nos dará un error similar a `[Nest] 21364  - 13/02/2024, 10:50:03   ERROR [ExceptionsHandler] E11000 duplicate key error collection: mean-mongo-database.users index: email_1 dup key: { email: "correo@correo.com" }` ya que hicimos validaciones de que el correo sea único pero ese es un error mandado por defecto desde nuestro backend porque todavía al crear el usuario hay que hacer varias cosas como encriptar la contraseña, guardar el usuario, generar el JWT, manejar los errores, etc. y si hay algún error entonces poderlo manejar y que sea un error controlado.

- Para encriptar contraseñas será usando un hash de una sola vía para hacer imposible la reconstrucción del valor que se tiene al encriptar al valor plano de la contraseña como tal entonces tenemos que instalar un paquete `npm i bcryptjs` el cual no está escrito en TypeScript pero nos da la posibilidad de instalar su archivo de denifición `npm i --save-dev @types/bcryptjs`. Cada que se grabe en la base de datos, así sea la misma contraseña y datos, el hash es diferente.

- Para hacer el login hay que crear un nuevo método en el auth.controller.ts para manejar esa petición que será una petición Post ya que se le enviará una data al backend pero también hay que crear un nuevo DTO para usarlo en el controller creado para saber cómo será esa data que fluirá a través de esa petición y saber qué se tiene que enviar desde el frontend. También hay que crear un nuevo método en el auth.service.ts para también hacer uso de ese DTO creado y poder usar ese nuevo servicio en el controller creado anteriormente.

- Para el login, hay que generar un JWT (JSON Web Tokens) (https://jwt.io/) que es un standard hoy en día para poder mantener autenticados a nuestros usuarios de forma pasiva, es decir, cada vez que los usuarios se autentiquen entonces el backend les mandará un JWT y ese JWT es el que vamos a tener que proporcionar desde el frontend cuando queramos usar un endpoint que pide autenticación, es decir, mi backend va a recibir de nuevo ese JWT y verificará si ese JWT fue firmado por el mismo backend, si es válido, etc. y si todo pasa entonces confiamos en que la persona que quiere realizar la acción está verificada en la base de datos.

  - El JWT consta de 3 partes:

    - HEADER: dice cómo fue construido y qué tipo de Token es
    - PAYLOAD: tiene toda la información que nosotros queremos colocar (usualmente se aconseja que se mande información que no sea sencible, no mandar tarjetas de crédito, contraseñas, etc. porque el payload está encripado de una manera que se puede desencriptar de dos vías, es decir, si tenemos el JWT entonces podemos saber qué información se guardó en el JWT)
    - VERIFY SIGNATURE: consta del HEADER encriptado + el PAYLOAD encriptado + una llave que se usó para verificar si efectivamente fue encriptado con la misma llave que utilizamos

  - El usar JWT en un backend es una tarea muy común entonces Nest ya viene con todo lo necesario para trabajar con JWT y podemos buscarlo en su documentación o sino ir al link `https://docs.nestjs.com/security/authentication#jwt-token` y nos pedirá que instalemos `npm install --save @nestjs/jwt` y luego inyectar el servicio `private jwtService: JwtService` en el auth.service.ts y al guardar el archivo nos daremos cuenta que en la terminal nos bota errores y eso es normal porque todavía falta proporcionar un módulo. Ahora hay que crear un nuevo método en el servicio auth.service.ts para obtener el JWT y poder hacer la firma con el payload que recibe el cual ese método será utilizado en la respuesta que nos da el servicio al hacer el login pero todavía no funcionará todo correctamente porque hay que proporcionar el módulo mencionado anteriormente. Según la documentación nos pide que creemos un archivo constants.ts y que tenga una llave secreta (secret key) pero hacerlo de esa forma tiene un inconveniente que, por ejemplo, si algún día mis llaves o tokens están comprometidas entonces tenemos que cambiarlas y al cambiarlas entonces hay que volver a compilar toda la aplicación y por eso ahora lo haremos de otra forma que es mediante variables de entorno creando el JWT_SEED y si alguien sabe esa secret key entonces podrá firmar tokens como si realmente hubieran sido generados por mi backend y por eso los .env no se suben a los repositorios y esas claves solo las conoce un administrador del servidor. Ahora sí hay que ir a auth.module.ts y colocar la configuración del módulo que hacía falta usando la variable de entorno creada.

    - PREGUNTA: En relación a los archivos environemt (.env) estos se agregan al .gitignore para que no se suban al repositorio de github pero al hacer el build de la aplicación estos si se incluyen dentro de la misma para que cuando se suba/despliegue la aplicación en algún servidor esta pueda generar los token con la llave o clave secreta.

      - RESPUESTA: Efectivamente, nosotros no queremos que se suba nuestro archivo .env a GitHub ya que contiene información sensible, pero nuestro backend sí lo necesita para poder leer esa información y funcionar correctamente. Ahora, esa información estará alojada en nuestro servidor, donde se supone que únicamente nosotros y personas autorizadas tendrán acceso, mientras que en GitHub al final cualquiera podrá leerlo.

    - PREGUNTA: ¿Porque se prefirió este método en lugar de Passport strategies jwt? Porque según la documentación de Nest habla sobre otro método el cual es implementar Passport strategies jwt pero ¿Cuándo se debe usar una forma y cuando la otra?

      - RESPUESTA: Aunque ambos enfoques pueden lograr autenticación basada en JWT, el enfoque que estamos aplicando en este proyecto tiende a ser más ligero y eficiente en términos de recursos ya que no requiere la configuración adicional y la complejidad que conlleva el uso de Passport con sus diversas estrategias. Al evitar la abstracción adicional de Passport, se puede tener un control más granular sobre cómo se gestionan y verifican los tokens. Sin embargo, en casos de aplicaciones más grandes y complejas, donde la modularidad y la variedad de estrategias sean esenciales, podrías llegar a considerar usar Passport. Como comentario personal de un instructor de las clases de Udemy, en los proyectos y trabajos, suele utilizar JWT sin Passport justamente por lo simple que es implementarlo y toda la seguridad que nos ofrece, pero al final depende de las necesidades de cada aplicación.

  - NOTA: Hasta lo anterior ya tenemos todo lo necesario para hacer el login y también todo el mecanismo necesario para crear los JWT, pero al crear un usuario usualmente también queremos que inicie la sesión en la aplicación (suponiendo que es una creación de usuario pública, es decir, por ejemplo una red social donde cualquier usuario puede crear una cuenta) o sino también hay flujos donde primero se crea el usuario y luego se tiene que autenticar, depende cómo se quiera manejar la aplicación.

- Ahora haremos el registro de un usuario que eventualmente terminará llamando al método de creación de un usuario. Este método de registro terminará retornando el usuario y el token JWT. Hay que crear el controlador que se encargará de las peticiones HTTP y de llamar al método que está en el servicio auth.service.ts, también crear el DTO para usar en el controlador y en el servicio para manejar la data que fluirá en las peticiones y crear el servicio necesario con toda la lógica.

- Haremos la protección de rutas con autenticación y para esto veremos que en auth.controller.ts hay un método findAll que es un @Get() entonces iremos al servicio que utiliza que está en auth.service.ts y el nombre es findAll que en este caso regresará todos los usuarios al hacer una petición Get a localhost:3000/auth como se hizo en Postman y nos damos cuenta que nos regresa todos los usuario pero darse cuenta que no estamos autenticados, tampoco estamos mandando el token en ningún lugar, entonces para poder leer la información de todos los usuarios deberíamos estar autenticados en la aplicación. Los conceptos de autenticación de endpoints (saber qué usuario es) y autorización de endpoints (saber qué usuario es y tener el acceso a revisarlo) en Nest se hace muy facil ya que tenemos el JWT y lo que faltaría es añadir Guards (rutas protectoras) similares a los de Angular para evitar que si no tenemos un token no muestra una determinada información donde obviamente el token tendría que ser válido. Nos podemos basar de la documentación de Nest https://docs.nestjs.com/security/authentication#implementing-the-authentication-guard

  - Crear guards en Nest es una tarea habitual entonces ya nos ofrece herramientas para trabajar como en su CLI ya nos ofrece un comando para crearlo `nest generate gu path/nombre` donde en este caso será `nest generate gu auth/guards/auth --flat` donde el --flat es para que cree el archivo del auth.guard.ts directamente en el directorio guards, es decir auth/guards/auth.guard.ts porque sino se coloca el --flat entonces crearía auth/guards/auth/auth.guard.ts y con eso haremos la configuración en el auth.guard.ts para poder usarlo en el controller o los controllers necesarios.

  - Ahora que ya creamos el guard para la protección de rutas con autenticación y pudimos obtener el token, tenemos que validarlo contra el backend para saber que sí es válido y seguro y poder re-construir al usuario que lo está pidiendo basado en ese id.

---

### - Despliegues a producción

- Veremos como podemos hacer un despligue de nuestra aplicación a producción para nuestro Backend (Nest) + Frontend (Angular) + Base de Datos (MongoDB) en la nube el cual usaremos un servicio llamado Railway que nos permitirá tomar nuestra aplicación de Nest, también podemos aprovisionar nuestra base de datos ahí. Hay otras alternativas como por ejemplo Mongo Atlas para la base de datos, etc.

- Puntualmente veremos:

  - Aprovisionamiento de base de datos MongoDB
  - Railway (https://railway.app/)
  - MongoAltas (https://www.mongodb.com/atlas/database)
  - Variables de entorno para producción
  - Hash Strategy
  - Publicar aplicación de Node (Nest)
  - Publicar aplicación de Angular
  - Seleccionar bases de datos
  - Pruebas reales.

- Vamos a aprovisionar nuestra base de datos MongoDB en Railway pero recordar que hay varios servicios gratuitos hasta cierto punto que nos permiten aprovisionar la base de datos MongoDB como MongoAltas pero en este caso lo haremos con Railway que también es gratuito hasta cierto punto.

  - Mongo Atlas: (https://www.youtube.com/watch?v=P1G2YRPczh4&ab_channel=MongoDB) (https://www.youtube.com/watch?v=RcxdF3Lzoac&t=118s&ab_channel=CalebCurry)

    - Iniciar sesión o crear cuenta
    - Hacer click en Build a Database
    - Hacer la configuración para deployar la base de datos (forma gratuita), colocar el nombre de nuestra base de datos y crear la base de datos
    - Una vez que la base de datos se haya creado y esté todo cargado correctamente nos aparecerá una opción para conectar, entonces haremos click y nos dará una url similar a la que colocamos en el .env de nuestro backend en MONGO_URI y lo tendremos que reemplazar y ya tendríamos nuestra base de datos desplegada.

  - Railway:
    - (imagen 2) Click en la forma gratuita y nos pedirá que iniciemos sesión (recomendable hacerlo con cuenta de GitHub para tener una comunicación fácil con los repositorios) y luego nos llevará a un dashboard para crear un nuevo proyecto (imagen 3)
    - (imagen 4) Crear un nuevo proyecto -> Provision MongoDB
    - (imagen 5) Luego se creará una base de datos MongoDB pero con las configuraciones por defecto y eso es lo que necesitaremos en este caso
    - (imagen 6) Hacer click en el elemento que nos aparece de MongoDB y nos mostrará una interfaz gráfica y en la pestaña Data vemos que nos creó una base de datos de prueba llamada test pero nosotros crearemos una nueva base de datos con un mejor nombre y luego presionamos en Add database (imagen 7) y veremos nuestra base de datos creada (imagen 8)
    - (imagen 9) Luego en la pestaña Connect veremos que tenemos algunas formas de conectarnos a la base de datos donde ahí está la cadena de conexión que usaremos para conectarnos a nuestra base de datos. Abajo también podemos ver que nos da variables de entorno privadas como MONGO_URL, MONGOHOST, MONGOPASSWORD, MONGOPORT (puerto personalizado, no es el puerto por defecto de Mongo), MONGOUSER (imagen 10)
    - (imagen 11) Podemos ir a Mongo Compass en nuestro equipo y conectarnos usando esa cadena de conexión y luego nos conectamos y con eso ya estaríamos conectados a Railway (imagen 12)
    - (imagen 13) Luego hacer click en settings y cambiaremos el nombre del proyecto como tal (imagen 14) porque ahí también podemos agregar más servicios y funcionalidades al dashboard que tenemos ahí. Podemos ver el nuevo nombre si vamos al dashboard administrativo global (imagen 15)
    - Luego de cambiar las variables de entorno para que se pueda conectar a Railway, entonces podemos hacer una petición en postman (imagen 16) y veremos que se creó el registro solicitado (se creó un usuario) en la base de datos de test de Railway (imagen 17) y también podemos ir a mongo compass y veremos la base de datos test y el registro creado (imagen 18)
    - Con lo anterior nos damos cuenta que se están grabando los registros en la base de datos llamada test pero queremos grabar los registros en la base de datos que nosotros creamos, entonces crearemos una nueva variable de entorno llamada MONGO_DB_NAME para colocar el nombre de la base de datos que queremos usar para que podamos hacer una configuración en el app.module.ts para usar la base de datos que queremos. Luego tenemos que bajar el servidor y volverlo a levantar. Luego podemos hacer la misma petición (imagen 16) y veremos que ahora graba en la base de datos que nosotros queremos (imagen 19). Ahora toca hacer otro cambio porque cuando desplegamos una aplicación hecha en express, fastify, nest, etc., nosotros usamos un puerto como en este caso que es el 3000 como se puede ver en el main.ts pero usualmente cuando nosotros desplegamos algún servicio en la nube, el puerto a usar me lo dará ese propio servicio en la nube (Railway, AWS, etc.) entonces nosotros no necesitamos especificar el puerto en las URL, pero cuando despleguemos la aplicación estará escuchando un puerto en particular que es el puerto que me asignará ese servicio en la nube y para eso es un estandar que hagamos esta configuración `process.env.PORT ?? 3000`
    - Para desplegar nuestro backend a Railway hay varias formas, por ejemplo, usar el Railway CLI, añadirlo a la App, hacer un push, etc. pero de la forma en como lo haremos ahora, que es un poco más cómoda trabajarlo, será a través de GitHub mediante la creación de un nuevo repositorio pero primero tenemos que hacer una configuración en el package.json porque como sabemos cuando se hace el build de nuestra aplicación nos crea la carpeta dist y tenemos un script para poder correrlo `"start:prod": "node dist/main",` pero Railway luego de hacer el build llamará al start, que es un proceso estandar en aplicaciones de node, pero nosotros lo tenemos de otra forma `"start": "nest start",` por lo cual para solucionarlo lo pasaremos a `"start": "node dist/main",` y al hacer que ejecute directamente el start nos evitamos hacer cualquier otro cambio para que pueda usar el `"start:prod": "node dist/main",` (imagen 24) Entonces luego de crear el repositorio para el backend nos vamos a la página de Railway para crear un nuevo proyecto usando Deploy from GitHub repo (imagen 20) y colocamos el nombre de nuestro repositorio y antes de hacer el Deploy Now vamos a añadir algunas variables con Add variables (imagen 21) las cuales estas variables son las variables de entorno que usamos (por eso es que da igual si subimos el .env porque al final igual las configuraremos en Railway) (imagen 22) después vamos a la pestaña de Deployments y veremos que va a re-desplegarlo (imagen 23). Luego si vamos a la pestaña de Settings y si bajamos un poco veremos la opción de Automatic Deployments lo cual al momento de hacer un push a nuestro repositorio y este estar conectado con Railway, entonces tomará esos últimos cambios y hará de nuevo la reconstrucción y el despliegue, NO hay que poner Disabled trigger ya que deshabilitaría esta opción automática. Con todo esto ya tenemos nuestro backend desplegado pero si vamos al dashboard principal veremos que tiene un nombre raro entonces nos faltaría cambiar ese nombre a uno más descriptivo (imagen 25)
