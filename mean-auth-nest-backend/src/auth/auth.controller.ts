import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

/* los controladores que son los responsables de escuchar las peticiones que tenemos como GET, POST, PUT, PATCH, DELETE y emitir una respuesta */
/* la url a utilizar aquí sería localhost:3000/auth */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* aquí está la petición Post y lo que venga en el Body de la petición se encargará automáticamente de transformarlo para que luzca como se haya configurado el CreateUserDto */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    /* con este console.log(createUserDto); veremos lo que le estamos mandando en Postman mediante la petición Post una vez que se hace click en Send que en este caso se vería en la terminal { nombre: 'Nombre', propiedad2: 'Propiedad' } y con esto vemos que es sumamente poderoso y no tuvimos que hacer mayor configuración porque ya venía todo configurado por Nest para nosotros poder recibir ese objeto facilmente */
    console.log(createUserDto);
    // console.log(createUserDto.name); // usando la configuración en CreateUserDto ya se puede acceder a sus propiedades

    /* una vez configurado CreateUserDto pero sin validaciones entonces sería lo mismo que nada porque si mediante la petición Post yo le mando 2 propiedades pero según mi configuración de CreateUserDto tengo que recibir 3 propiedades entonces aquí y en el servicio auth.service.ts o donde se esté usando CreateUserDto se seguirían mostrando las 2 propiedades que le mandé por la petición entonces es importante hacer las validaciones correspondientes como el pipe que se añadió en el main.ts para que si se manda algo mediante la petición Post que no está dentro de CreateUserDto nos de un error como por ejemplo ``{"message": ["property nombre should not exist", "property propiedad2 should not exist"], "error": "Bad Request", "statusCode": 400}`` y el error según Postman es un 400 Bad Request y también hacer las validaciones correspondientes en create-user.dto.ts y con eso nos darán más errores ``{"message": ["property nombre should not exist", "property propiedad2 should not exist", "email must be an email", "name must be a string", "password must be longer than or equal to 6 characters"], "error": "Bad Request", "statusCode": 400}`` Y si no se manda nada entonces el backend no hace nada, ni si quiera imprime en consola algo */
    /* cuando se mande de forma correcta como por ejemplo { name: 'Nombre', email: 'correo@correo.com', password: '123456' } entonces el backend nos dará como respuesta lo que haya en el servicio en el método create que es en este caso ``This action adds a new auth`` */

    return this.authService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
