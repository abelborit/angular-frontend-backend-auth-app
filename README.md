# Angular Frontend Backend Auth App

---

### - Nest (Backend)

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

### - Angular (Frontend)
